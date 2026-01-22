import { NextResponse } from "next/server";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_RITE_URL!,
  consumerKey: process.env.WC_CONSUMER_KEY!,
  consumerSecret: process.env.WC_CONSUMER_SECRET!,
  version: "wc/v3",
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") ?? "ua";

  const lang = locale === "ua" ? "ua" : "en";
  const BRAND_ID = 102;

  let page = 1;
  let totalPages = 1;
  const filteredProducts: any[] = [];

  try {
    do {
      const response = await api.get(`products?per_page=100&page=${page}&lang=${lang}`);

      if (response.status !== 200) break;

      totalPages = Number(response.headers["x-wp-totalpages"] || 1);

      // Фільтруємо кожну сторінку по бренду
      const pageProducts = response.data.filter((product: any) =>
        product.brands?.some((brand: any) => brand.id === BRAND_ID)
      );

      filteredProducts.push(...pageProducts);

      page++;
    } while (page <= totalPages);

    // 🔽 СОРТУВАННЯ
    filteredProducts.sort((a, b) => {
      const aIsAccessory = a.tags?.some(
        (tag: any) => tag.slug?.toLowerCase() === "accessories"
      );
      const bIsAccessory = b.tags?.some(
        (tag: any) => tag.slug?.toLowerCase() === "accessories"
      );

      if (aIsAccessory === bIsAccessory) {
        return a.name.localeCompare(b.name, lang === "ua" ? "uk" : "en");
      }

      return aIsAccessory ? 1 : -1;
    });

    return NextResponse.json(filteredProducts, {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("API Drager error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
