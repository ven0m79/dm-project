import { cache } from "react";

const WC_BASE = "https://api.dm-project.com.ua/wp-json/wc/v3";
const CK = process.env.WC_CONSUMER_KEY!;
const CS = process.env.WC_CONSUMER_SECRET!;

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
  translations: Record<string, string | number>; // adjust to your real type
};

export const getCategoriesCached = cache(async (locale: string): Promise<WCCategory[]> => {
  const url = `${WC_BASE}/products/categories?lang=${locale}&consumer_key=${CK}&consumer_secret=${CS}&per_page=100`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
  return res.json();
});

export const getProductsByCategoryCached = cache(async (locale: string, categoryId: number): Promise<WCProduct[]> => {
  const url = `${WC_BASE}/products?lang=${locale}&category=${categoryId}&consumer_key=${CK}&consumer_secret=${CS}&per_page=100`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  return res.json();
});

export async function getCategoryAndProducts(
  locale: string,
  slug: string | undefined,
  categoriesRaw?: WCCategory[]
) {
  const cats = categoriesRaw ?? (await getCategoriesCached(locale));
  const category = slug ? cats.find((c) => c.slug === slug) ?? null : null;
  const products = category ? await getProductsByCategoryCached(locale, category.id) : [];
  return { category, products };
}
