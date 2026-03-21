import { NextResponse } from "next/server";
import { getWooApi } from "../../../../utils/woocommerce.setup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const locale = searchParams.get("locale") || "ua";

  if (search.length < 3) {
    return NextResponse.json([]);
  }

  try {
    const api = getWooApi();
    const response = await api.get(
      `products?per_page=100&search=${encodeURIComponent(search)}&lang=${encodeURIComponent(locale)}`,
    );

    if (response.status !== 200) {
      return NextResponse.json(
        { error: "Failed to search products" },
        { status: response.status },
      );
    }

    return NextResponse.json(response.data);
  } catch (e) {
    console.error("API /woocommerce/search error:", e);
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 },
    );
  }
}