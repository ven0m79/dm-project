import { NextResponse } from "next/server";
import { getWooApi } from "../../../../utils/woocommerce.setup";

type ProductWithBrands = {
  brands?: { id: number }[];
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedLang = searchParams.get("lang");
  const lang = requestedLang === "en" || requestedLang === "ua" ? requestedLang : "ua";
  const page = Number(searchParams.get("page") || "1");
  const perPage = Number(searchParams.get("per_page") || "20");
  const category = searchParams.get("category");
  const brandId = searchParams.get("brandId");

  if (!Number.isFinite(page) || page < 1) {
    return NextResponse.json({ error: "Invalid page" }, { status: 400 });
  }

  if (!Number.isFinite(perPage) || perPage < 1 || perPage > 100) {
    return NextResponse.json({ error: "Invalid per_page" }, { status: 400 });
  }

  try {
    const api = getWooApi();

    const params = new URLSearchParams({
      lang,
      page: String(page),
      per_page: String(perPage),
    });

    if (category) {
      params.set("category", category);
    }

    const response = await api.get(`products?${params.toString()}`);
    const totalPages = Number(response.headers?.["x-wp-totalpages"] || "1");

    let items = Array.isArray(response.data) ? response.data : [];
    if (brandId) {
      const parsedBrandId = Number(brandId);
      if (Number.isFinite(parsedBrandId)) {
        items = items.filter((product: ProductWithBrands) =>
          product.brands?.some((brand) => brand.id === parsedBrandId),
        );
      }
    }

    return NextResponse.json({
      items,
      totalPages: Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 1,
    });
  } catch (error: any) {
    const status = Number(error?.response?.status) || 500;
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to load products";
    console.error("API /woo/products error:", status, message);
    return NextResponse.json(
      { error: "Failed to load products", details: String(message) },
      { status },
    );
  }
}
