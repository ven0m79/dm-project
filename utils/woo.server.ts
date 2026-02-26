import "server-only";

import { cache } from "react";

const WC_BASE_URL = process.env.WC_BASE_URL;
const CK = process.env.WC_CONSUMER_KEY;
const CS = process.env.WC_CONSUMER_SECRET;

if (!WC_BASE_URL) throw new Error("WC_BASE_URL is required");
if (!CK) throw new Error("WC_CONSUMER_KEY is required");
if (!CS) throw new Error("WC_CONSUMER_SECRET is required");

export type WCCategory = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  yoast_head_json?: any;
  schema_json?: any;
  parent?: number;
  image?: { src: string; alt?: string } | null;
};

export type WCProduct = {
  id: number;
  name: string;
  tags: { name: string }[];
  images: { src: string; alt?: string }[];
  translations: Record<string, string | number>;
  brands?: { id: number; name: string; slug: string }[];
  categories?: { id: number; name: string; slug: string }[];
  menu_order?: number;
};

function withAuth(url: string) {
  const u = new URL(url);
  u.searchParams.set("consumer_key", CK!);
  u.searchParams.set("consumer_secret", CS!);
  return u.toString();
}

export const getCategoriesCached = cache(
  async (locale: string): Promise<WCCategory[]> => {
    const base = `${WC_BASE_URL}/wp-json/wc/v3/products/categories?per_page=100&lang=${locale}`;
    const url = withAuth(base);

    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
    return res.json();
  },
);

export const getProductsByCategoryCached = cache(
  async (locale: string, categoryId: number): Promise<WCProduct[]> => {
    const base = `${WC_BASE_URL}/wp-json/wc/v3/products?per_page=100&lang=${locale}&category=${categoryId}`;
    const url = withAuth(base);

    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
    return res.json();
  },
);

export const getProductsByBrandCached = cache(
  async (
    locale: string,
    categoryIds: number[],
    brandId: number,
  ): Promise<WCProduct[]> => {
    const responses = await Promise.all(
      categoryIds.map(async (categoryId) => {
        const base = `${WC_BASE_URL}/wp-json/wc/v3/products?per_page=20&lang=${locale}&category=${categoryId}`;
        const url = withAuth(base);

        const res = await fetch(url, { next: { revalidate: 300 } });
        if (!res.ok) return [];
        return res.json() as Promise<WCProduct[]>;
      }),
    );

    return responses
      .flat()
      .filter((p) => p.brands?.some((b) => b.id === brandId));
  },
);

export const getCategoryBySlugCached = cache(
  async (locale: string, slug: string): Promise<WCCategory | null> => {
    const base = `${WC_BASE_URL}/wp-json/wc/v3/products/categories?lang=${locale}&slug=${encodeURIComponent(slug)}`;
    const url = withAuth(base);

    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return null;

    const categories = (await res.json()) as WCCategory[];
    return categories?.[0] ?? null;
  },
);

export async function getCategoryAndProducts(
  locale: string,
  slug: string | undefined,
  categoriesRaw?: WCCategory[],
) {
  const cats = categoriesRaw ?? (await getCategoriesCached(locale));
  const category = slug ? (cats.find((c) => c.slug === slug) ?? null) : null;
  const products = category
    ? await getProductsByCategoryCached(locale, category.id)
    : [];
  return { category, products };
}
