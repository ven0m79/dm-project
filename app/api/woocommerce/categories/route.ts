import { NextResponse } from "next/server";
import { fetchWooCommerceCategories } from "../../../../utils/woocommerce.setup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "ua";

  try {
    const data = await fetchWooCommerceCategories(locale);
    return NextResponse.json(data);
  } catch (e) {
    console.error("API /woocommerce/categories error:", e);
    return NextResponse.json(
      { error: "Failed to load categories" },
      { status: 500 },
    );
  }
}
