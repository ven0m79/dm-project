import { NextResponse } from "next/server";
import { fetchWooCommerceProductDetails } from "../../../../utils/woocommerce.setup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale");
  const productIdParam = searchParams.get("productId");
  const productId = Number(productIdParam);

  if ((locale !== "ua" && locale !== "en") || !Number.isFinite(productId) || productId < 1) {
    return NextResponse.json({ error: "Invalid locale or productId" }, { status: 400 });
  }

  try {
    const product = await fetchWooCommerceProductDetails(productId, locale);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("API /woo/product error:", error);
    return NextResponse.json(
      { error: "Failed to load product" },
      { status: 500 },
    );
  }
}
