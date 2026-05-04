import { NextResponse } from "next/server";
import { getProductsByBrandFromDb } from "../../../../lib/db/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedLang = searchParams.get("lang");
  const locale = requestedLang === "en" || requestedLang === "ua" ? requestedLang : "ua";
  const category = searchParams.get("category");
  const brandId = searchParams.get("brandId");

  if (!brandId) {
    return NextResponse.json({ error: "Missing brandId" }, { status: 400 });
  }

  const parsedBrandId = Number(brandId);
  if (!Number.isFinite(parsedBrandId) || parsedBrandId < 1) {
    return NextResponse.json({ error: "Invalid brandId" }, { status: 400 });
  }

  const categoryIds = category ? [Number(category)] : [];

  try {
    const items = await getProductsByBrandFromDb(locale, parsedBrandId, categoryIds);
    return NextResponse.json({ items, totalPages: 1 });
  } catch (e) {
    console.error("API /woo/products error:", e);
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}
