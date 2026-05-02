import "server-only";

import { unstable_cache } from "next/cache";
import { eq, and, inArray } from "drizzle-orm";
import { db } from "./client";
import {
  wc_categories,
  wc_products,
  wc_product_images,
  wc_product_categories,
} from "./schema";
import type { WCCategory, BreadcrumbItem } from "../../utils/woo.server";
import type { SingleProductDetails } from "../../utils/woocomerce.types";

// ─── Internal mappers ───────────────────────────────────────────────────────

type ProductRow = typeof wc_products.$inferSelect;
type ImageRow = typeof wc_product_images.$inferSelect;
type ProductCatRow = typeof wc_product_categories.$inferSelect;

function mapProductRow(
  p: ProductRow,
  images: ImageRow[],
  cats: ProductCatRow[],
): SingleProductDetails {
  const sortedImages = images
    .sort((a, b) => a.position - b.position)
    .map((img) => ({ id: 0, name: "", alt: img.alt ?? "", src: img.src }));

  return {
    id: p.id,
    name: p.name,
    slug: p.slug ?? "",
    permalink: "",
    type: "simple",
    status: "publish",
    average_rating: "0",
    images: sortedImages.length > 0 ? sortedImages : [{ id: 0, name: "", alt: "", src: "" }],
    featured: p.featured ?? false,
    catalog_visibility: "visible",
    description: p.description ?? "",
    short_description: p.short_description ?? "",
    tags: (p.tags as any[]) ?? [],
    sku: p.sku ?? "",
    price: p.price ?? "",
    regular_price: p.regular_price ?? "",
    downloadable: false,
    downloads: (p.downloads as any[]) ?? [],
    dimensions: [],
    parent_id: 0,
    categories: cats.map((c) => ({
      id: c.category_id,
      name: c.category_name ?? "",
      slug: c.category_slug ?? "",
    })),
    attributes: (p.attributes as any[]) ?? [],
    lang: p.locale,
    stock_status: p.stock_status ?? "instock",
    brands: (p.brands as any[]) ?? [],
    translations: {
      ua: p.translation_ua_id ?? p.id,
      en: p.translation_en_id ?? p.id,
    },
    cross_sell_ids: (p.cross_sell_ids as number[]) ?? [],
    related_ids: (p.related_ids as number[]) ?? [],
    parentCategory: "",
    meta_data: (p.meta_data as any[]) ?? [],
    variations: (p.variations as any[]) ?? [],
    menu_order: p.menu_order ?? 0,
  };
}

function mapCategoryRow(row: typeof wc_categories.$inferSelect): WCCategory {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? undefined,
    parent: row.parent_id,
    image: row.image_url ? { src: row.image_url, alt: row.image_alt ?? "" } : null,
    yoast_head_json: row.yoast_head_json ?? undefined,
    schema_json: row.schema_json ?? undefined,
  };
}

// ─── Categories ──────────────────────────────────────────────────────────────

export const getCategoriesFromDb = unstable_cache(
  async (locale: string): Promise<WCCategory[]> => {
    const rows = await db()
      .select()
      .from(wc_categories)
      .where(eq(wc_categories.locale, locale));
    return rows.map(mapCategoryRow);
  },
  ["categories-from-db"],
  { tags: ["catalog"], revalidate: false },
);

export const getCategoryBySlugFromDb = unstable_cache(
  async (locale: string, slug: string): Promise<WCCategory | null> => {
    const rows = await db()
      .select()
      .from(wc_categories)
      .where(and(eq(wc_categories.locale, locale), eq(wc_categories.slug, slug)))
      .limit(1);
    return rows[0] ? mapCategoryRow(rows[0]) : null;
  },
  ["category-by-slug-from-db"],
  { tags: ["catalog"], revalidate: false },
);

// ─── Products ────────────────────────────────────────────────────────────────

async function fetchProductsWithImages(
  locale: string,
  productIds: number[],
): Promise<SingleProductDetails[]> {
  if (!productIds.length) return [];

  const [products, images, cats] = await Promise.all([
    db()
      .select()
      .from(wc_products)
      .where(and(eq(wc_products.locale, locale), inArray(wc_products.id, productIds))),
    db()
      .select()
      .from(wc_product_images)
      .where(
        and(eq(wc_product_images.locale, locale), inArray(wc_product_images.product_id, productIds)),
      ),
    db()
      .select()
      .from(wc_product_categories)
      .where(
        and(
          eq(wc_product_categories.locale, locale),
          inArray(wc_product_categories.product_id, productIds),
        ),
      ),
  ]);

  const imagesByProduct = new Map<number, ImageRow[]>();
  for (const img of images) {
    const list = imagesByProduct.get(img.product_id) ?? [];
    list.push(img);
    imagesByProduct.set(img.product_id, list);
  }

  const catsByProduct = new Map<number, ProductCatRow[]>();
  for (const c of cats) {
    const list = catsByProduct.get(c.product_id) ?? [];
    list.push(c);
    catsByProduct.set(c.product_id, list);
  }

  return products.map((p) =>
    mapProductRow(
      p,
      imagesByProduct.get(p.id) ?? [],
      catsByProduct.get(p.id) ?? [],
    ),
  );
}

export const getProductsByCategoryIdFromDb = unstable_cache(
  async (locale: string, categoryId: number): Promise<SingleProductDetails[]> => {
    // Collect categoryId + all its descendants via BFS
    const allCats = await db()
      .select({ id: wc_categories.id, parent_id: wc_categories.parent_id })
      .from(wc_categories)
      .where(eq(wc_categories.locale, locale));

    const childMap = new Map<number, number[]>();
    for (const cat of allCats) {
      const p = cat.parent_id ?? 0;
      const list = childMap.get(p) ?? [];
      list.push(cat.id);
      childMap.set(p, list);
    }

    const allIds = new Set<number>([categoryId]);
    const queue = [categoryId];
    while (queue.length) {
      const current = queue.shift()!;
      for (const child of childMap.get(current) ?? []) {
        if (!allIds.has(child)) { allIds.add(child); queue.push(child); }
      }
    }

    const productCats = await db()
      .select({ product_id: wc_product_categories.product_id })
      .from(wc_product_categories)
      .where(
        and(
          eq(wc_product_categories.locale, locale),
          inArray(wc_product_categories.category_id, [...allIds]),
        ),
      );

    const ids = [...new Set(productCats.map((pc) => pc.product_id))];
    return fetchProductsWithImages(locale, ids);
  },
  ["products-by-category-from-db"],
  { tags: ["catalog"], revalidate: false },
);

export const getProductByIdFromDb = unstable_cache(
  async (locale: string, id: number): Promise<SingleProductDetails | null> => {
    const rows = await db()
      .select()
      .from(wc_products)
      .where(and(eq(wc_products.locale, locale), eq(wc_products.id, id)))
      .limit(1);

    if (!rows[0]) return null;

    const [images, cats] = await Promise.all([
      db()
        .select()
        .from(wc_product_images)
        .where(
          and(eq(wc_product_images.locale, locale), eq(wc_product_images.product_id, id)),
        ),
      db()
        .select()
        .from(wc_product_categories)
        .where(
          and(eq(wc_product_categories.locale, locale), eq(wc_product_categories.product_id, id)),
        ),
    ]);

    return mapProductRow(rows[0], images, cats);
  },
  ["product-by-id-from-db"],
  { tags: ["catalog"], revalidate: false },
);

export const getRelatedProductsFromDb = unstable_cache(
  async (locale: string, relatedIds: number[]): Promise<SingleProductDetails[]> => {
    return fetchProductsWithImages(locale, relatedIds);
  },
  ["related-products-from-db"],
  { tags: ["catalog"], revalidate: false },
);

// ─── Static param helpers ────────────────────────────────────────────────────

export const getAllProductIdsByLocale = unstable_cache(
  async (locale: string): Promise<number[]> => {
    const rows = await db()
      .select({ id: wc_products.id })
      .from(wc_products)
      .where(eq(wc_products.locale, locale));
    return rows.map((r) => r.id);
  },
  ["all-product-ids-by-locale"],
  { tags: ["catalog"], revalidate: false },
);

export const getAllCategorySlugsByLocale = unstable_cache(
  async (locale: string): Promise<string[]> => {
    const rows = await db()
      .select({ slug: wc_categories.slug })
      .from(wc_categories)
      .where(eq(wc_categories.locale, locale));
    return rows.map((r) => r.slug);
  },
  ["all-category-slugs-by-locale"],
  { tags: ["catalog"], revalidate: false },
);

// ─── Breadcrumbs ─────────────────────────────────────────────────────────────

const EXCLUDED_IDS = new Set([50, 52, 55, 57]);

export async function buildBreadcrumbTrailFromDb(
  locale: string,
  categorySlug: string | undefined,
  productName?: string,
  productId?: number,
): Promise<BreadcrumbItem[]> {
  const prefix = locale === "ua" ? "" : `/${locale}`;
  const trail: BreadcrumbItem[] = [
    { id: "home", name: "Головна", url: prefix || "/" },
  ];

  if (!categorySlug) return trail;

  const allCategories = await getCategoriesFromDb(locale);
  const bySlug = new Map(allCategories.map((c) => [c.slug, c]));
  const byId = new Map(allCategories.map((c) => [c.id, c]));

  const leafCat = bySlug.get(categorySlug);
  if (!leafCat) return trail;

  const ancestors: WCCategory[] = [];
  const visited = new Set<number>();
  let current: WCCategory | undefined = leafCat;

  while (current && !visited.has(current.id)) {
    visited.add(current.id);
    if (EXCLUDED_IDS.has(current.id)) break;
    ancestors.push(current);
    current = current.parent ? byId.get(current.parent) : undefined;
  }

  ancestors.reverse();

  ancestors.forEach((cat) => {
    trail.push({
      id: cat.id,
      name: cat.name,
      url: `${prefix}/catalog/sub-catalog?category=${encodeURIComponent(cat.slug)}`,
    });
  });

  if (productName && productId !== undefined) {
    trail.push({
      id: productId,
      name: productName,
      url: `${prefix}/catalog/sub-catalog/product/${productId}?category=${encodeURIComponent(categorySlug)}`,
    });
  }

  return trail;
}
