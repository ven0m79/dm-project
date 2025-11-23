import { NextResponse } from "next/server";
import { fetchWooCommerceProductsBasedOnCategory } from "../../../../utils/woocommerce.setup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "ua";
  const categoryIdParam = searchParams.get("categoryId");

  if (!categoryIdParam) {
    return NextResponse.json({ error: "Missing categoryId" }, { status: 400 });
  }

  const categoryId = Number(categoryIdParam);

  try {
    const data = await fetchWooCommerceProductsBasedOnCategory(
      categoryId,
      locale,
    );
    return NextResponse.json(data);
  } catch (e) {
    console.error("API /woocommerce/category-products error:", e);
    return NextResponse.json(
      { error: "Failed to load category products" },
      { status: 500 },
    );
  }
}
