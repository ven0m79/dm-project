import "server-only";

import { cache } from "react";
import { getWooEnv } from "./woo-env";

function getWooConfig() {
  return getWooEnv();
}

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
  const { consumerKey, consumerSecret } = getWooConfig();
  const u = new URL(url);
  u.searchParams.set("consumer_key", consumerKey);
  u.searchParams.set("consumer_secret", consumerSecret);
  return u.toString();
}

export const getCategoriesCached = cache(
  async (locale: string): Promise<WCCategory[]> => {
    const { baseUrl } = getWooConfig();
    const all: WCCategory[] = [];
    let page = 1;

    while (true) {
      const base = `${baseUrl}/wp-json/wc/v3/products/categories?per_page=100&lang=${locale}&page=${page}`;
      const url = withAuth(base);
      const res = await fetch(url, { next: { revalidate: 300 } });
      if (!res.ok) break;
      const batch: WCCategory[] = await res.json();
      if (!batch.length) break;
      all.push(...batch);
      if (batch.length < 100) break; // last page
      page++;
    }

    return all;
  },
);

export const getProductsByCategoryCached = cache(
  async (locale: string, categoryId: number): Promise<WCProduct[]> => {
    const { baseUrl } = getWooConfig();
    const base = `${baseUrl}/wp-json/wc/v3/products?per_page=100&lang=${locale}&category=${categoryId}`;
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
    const { baseUrl } = getWooConfig();
    const responses = await Promise.all(
      categoryIds.map(async (categoryId) => {
        const base = `${baseUrl}/wp-json/wc/v3/products?per_page=20&lang=${locale}&category=${categoryId}`;
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
    const { baseUrl } = getWooConfig();
    const base = `${baseUrl}/wp-json/wc/v3/products/categories?lang=${locale}&slug=${encodeURIComponent(slug)}`;
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
