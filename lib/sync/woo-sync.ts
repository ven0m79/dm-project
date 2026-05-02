import { eq, and, sql } from "drizzle-orm";
import { db } from "../db/client";
import {
  wc_categories,
  wc_products,
  wc_product_images,
  wc_product_categories,
  wc_product_relations,
  wc_sync_runs,
} from "../db/schema";
import { getWooApi } from "../../utils/woocommerce.setup";

const LOCALES = ["ua", "en"] as const;

// ─── Fetch helpers (use existing axios-based WooCommerce client) ──────────────

async function fetchAllCategories(locale: string): Promise<any[]> {
  const api = getWooApi();
  let page = 1;
  let totalPages = 1;
  const all: any[] = [];

  do {
    const response = await api.get(
      `products/categories?per_page=100&page=${page}&lang=${locale}`,
    );
    if (response.status !== 200)
      throw new Error(`Categories fetch failed: ${response.status}`);
    totalPages = parseInt(response.headers["x-wp-totalpages"] ?? "1", 10);
    all.push(...(response.data as any[]));
    page++;
  } while (page <= totalPages);

  return all;
}

async function fetchAllProducts(locale: string): Promise<any[]> {
  const api = getWooApi();
  let page = 1;
  let totalPages = 1;
  const allProducts: any[] = [];

  do {
    const response = await api.get(
      `products?per_page=100&page=${page}&lang=${locale}`,
    );
    if (response.status !== 200)
      throw new Error(`Products fetch failed: ${response.status}`);
    totalPages = parseInt(response.headers["x-wp-totalpages"] ?? "1", 10);
    allProducts.push(...(response.data as any[]));
    page++;
  } while (page <= totalPages);

  // Fetch full variation objects for variable products (batched 10 at a time)
  const variableProducts = allProducts.filter(
    (p) => Array.isArray(p.variations) && p.variations.length > 0,
  );

  const VAR_BATCH = 10;
  for (let start = 0; start < variableProducts.length; start += VAR_BATCH) {
    const batch = variableProducts.slice(start, start + VAR_BATCH);
    const varResults = await Promise.all(
      batch.map(async (p) => {
        try {
          const res = await api.get(
            `products/${p.id}/variations?per_page=100&lang=${locale}`,
          );
          return { id: p.id, variations: res.status === 200 ? res.data : [] };
        } catch {
          return { id: p.id, variations: [] };
        }
      }),
    );
    for (const result of varResults) {
      const product = allProducts.find((p) => p.id === result.id);
      if (product) product._fullVariations = result.variations;
    }
  }

  return allProducts;
}

// ─── Upsert helpers ───────────────────────────────────────────────────────────

async function upsertCategories(categories: any[], locale: string) {
  if (!categories.length) return;

  const rows = categories.map((c) => ({
    id: c.id,
    locale,
    slug: c.slug,
    name: c.name,
    parent_id: c.parent ?? 0,
    description: c.description ?? null,
    image_url: c.image?.src ?? null,
    image_alt: c.image?.alt ?? null,
    count: c.count ?? 0,
    menu_order: c.menu_order ?? 0,
    yoast_head_json: c.yoast_head_json ?? null,
    schema_json: c.schema_json
      ? typeof c.schema_json === "string"
        ? JSON.parse(c.schema_json)
        : c.schema_json
      : null,
    synced_at: new Date(),
  }));

  const CHUNK = 100;
  for (let i = 0; i < rows.length; i += CHUNK) {
    await db()
      .insert(wc_categories)
      .values(rows.slice(i, i + CHUNK))
      .onConflictDoUpdate({
        target: [wc_categories.id, wc_categories.locale],
        set: {
          slug: sql`excluded.slug`,
          name: sql`excluded.name`,
          parent_id: sql`excluded.parent_id`,
          description: sql`excluded.description`,
          image_url: sql`excluded.image_url`,
          image_alt: sql`excluded.image_alt`,
          count: sql`excluded.count`,
          menu_order: sql`excluded.menu_order`,
          yoast_head_json: sql`excluded.yoast_head_json`,
          schema_json: sql`excluded.schema_json`,
          synced_at: sql`excluded.synced_at`,
        },
      });
  }
}

async function upsertProduct(product: any, locale: string) {
  const translations = product.translations ?? {};
  const uaId = translations.ua ?? product.id;
  const enId = translations.en ?? product.id;

  const productRow = {
    id: product.id,
    locale,
    slug: product.slug ?? null,
    name: product.name,
    short_description: product.short_description ?? null,
    description: product.description ?? null,
    price: product.price ?? null,
    regular_price: product.regular_price ?? null,
    sale_price: product.sale_price ?? null,
    stock_status: product.stock_status ?? null,
    sku: product.sku ?? null,
    featured: product.featured ?? false,
    menu_order: product.menu_order ?? 0,
    attributes: product.attributes ?? null,
    tags: product.tags ?? null,
    brands: product.brands ?? null,
    meta_data: product.meta_data ?? null,
    yoast_head_json: product.yoast_head_json ?? null,
    translation_ua_id: uaId,
    translation_en_id: enId,
    variations: product._fullVariations ?? [],
    cross_sell_ids: product.cross_sell_ids ?? [],
    related_ids: product.related_ids ?? [],
    downloads: product.downloads ?? null,
    synced_at: new Date(),
  };

  await db()
    .insert(wc_products)
    .values(productRow)
    .onConflictDoUpdate({
      target: [wc_products.id, wc_products.locale],
      set: {
        slug: sql`excluded.slug`,
        name: sql`excluded.name`,
        short_description: sql`excluded.short_description`,
        description: sql`excluded.description`,
        price: sql`excluded.price`,
        regular_price: sql`excluded.regular_price`,
        sale_price: sql`excluded.sale_price`,
        stock_status: sql`excluded.stock_status`,
        sku: sql`excluded.sku`,
        featured: sql`excluded.featured`,
        menu_order: sql`excluded.menu_order`,
        attributes: sql`excluded.attributes`,
        tags: sql`excluded.tags`,
        brands: sql`excluded.brands`,
        meta_data: sql`excluded.meta_data`,
        yoast_head_json: sql`excluded.yoast_head_json`,
        translation_ua_id: sql`excluded.translation_ua_id`,
        translation_en_id: sql`excluded.translation_en_id`,
        variations: sql`excluded.variations`,
        cross_sell_ids: sql`excluded.cross_sell_ids`,
        related_ids: sql`excluded.related_ids`,
        downloads: sql`excluded.downloads`,
        synced_at: sql`excluded.synced_at`,
      },
    });

  // Images: delete then re-insert
  await db()
    .delete(wc_product_images)
    .where(
      and(
        eq(wc_product_images.product_id, product.id),
        eq(wc_product_images.locale, locale),
      ),
    );

  const images: any[] = product.images ?? [];
  if (images.length) {
    await db().insert(wc_product_images).values(
      images.map((img: any, position: number) => ({
        product_id: product.id,
        locale,
        position,
        src: img.src,
        alt: img.alt ?? null,
      })),
    );
  }

  // Categories junction: delete then re-insert
  await db()
    .delete(wc_product_categories)
    .where(
      and(
        eq(wc_product_categories.product_id, product.id),
        eq(wc_product_categories.locale, locale),
      ),
    );

  const cats: any[] = product.categories ?? [];
  if (cats.length) {
    await db().insert(wc_product_categories).values(
      cats.map((cat: any) => ({
        product_id: product.id,
        locale,
        category_id: cat.id,
        category_name: cat.name ?? null,
        category_slug: cat.slug ?? null,
      })),
    );
  }

  // Relations: delete then re-insert
  await db()
    .delete(wc_product_relations)
    .where(
      and(
        eq(wc_product_relations.product_id, product.id),
        eq(wc_product_relations.locale, locale),
      ),
    );

  const relations: { related_id: number; kind: string }[] = [];
  for (const id of product.cross_sell_ids ?? []) {
    relations.push({ related_id: id, kind: "cross_sell" });
  }
  for (const id of product.related_ids ?? []) {
    relations.push({ related_id: id, kind: "related" });
  }

  if (relations.length) {
    await db().insert(wc_product_relations).values(
      relations.map((r) => ({
        product_id: product.id,
        locale,
        related_id: r.related_id,
        kind: r.kind,
      })),
    );
  }
}

// ─── Public sync entry point ──────────────────────────────────────────────────

export type SyncResult = {
  categoriesCount: number;
  productsCount: number;
};

export async function runFullSync(): Promise<SyncResult> {
  let categoriesCount = 0;
  let productsCount = 0;

  for (const locale of LOCALES) {
    const categories = await fetchAllCategories(locale);
    await upsertCategories(categories, locale);
    categoriesCount += categories.length;

    const products = await fetchAllProducts(locale);
    productsCount += products.length;

    const PRODUCT_BATCH = 20;
    for (let i = 0; i < products.length; i += PRODUCT_BATCH) {
      await Promise.all(
        products.slice(i, i + PRODUCT_BATCH).map((p) => upsertProduct(p, locale)),
      );
    }
  }

  return { categoriesCount, productsCount };
}

export async function createSyncRun(): Promise<number> {
  const rows = await db()
    .insert(wc_sync_runs)
    .values({ status: "running", started_at: new Date() })
    .returning({ id: wc_sync_runs.id });
  return rows[0].id;
}

export async function finishSyncRun(
  id: number,
  status: "success" | "error",
  counts?: { categoriesCount: number; productsCount: number },
  error?: string,
) {
  await db()
    .update(wc_sync_runs)
    .set({
      status,
      finished_at: new Date(),
      categories_count: counts?.categoriesCount ?? null,
      products_count: counts?.productsCount ?? null,
      error: error ?? null,
    })
    .where(eq(wc_sync_runs.id, id));
}
