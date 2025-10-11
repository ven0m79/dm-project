// app/api/catalog/bootstrap/route.ts
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 300;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get("locale") ?? "ua";
  const categorySlug = searchParams.get("category") ?? "";

  const ck = process.env.WC_CONSUMER_KEY!;
  const cs = process.env.WC_CONSUMER_SECRET!;

  const categoriesUrl = `https://api.dm-project.com.ua/wp-json/wc/v3/products/categories?lang=${locale}&consumer_key=${ck}&consumer_secret=${cs}&per_page=100`;
  const categoryId = searchParams.get("categoryId");

  const productsUrl = categoryId
    ? `https://api.dm-project.com.ua/wp-json/wc/v3/products?lang=${locale}&category=${categoryId}&consumer_key=${ck}&consumer_secret=${cs}&per_page=100`
    : null;

  const [categoriesRes, productsRes] = await Promise.all([
    fetch(categoriesUrl, { next: { revalidate } }),
    productsUrl ? fetch(productsUrl, { next: { revalidate } }) : Promise.resolve(null),
  ]);

  const categories = await categoriesRes.json();
  const products = productsRes ? await productsRes.json() : [];

  return NextResponse.json({ categories, products });
}
