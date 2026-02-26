import { NextResponse } from "next/server";

const WC_BASE = process.env.NEXT_PUBLIC_WORDPRESS_RITE_URL!;
const CK = process.env.WC_CONSUMER_KEY!;
const CS = process.env.WC_CONSUMER_SECRET!;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const locale = searchParams.get("locale") || "ua";

  if (search.length < 3) {
    return NextResponse.json([]);
  }

  try {
    const url = `${WC_BASE}/wp-json/wc/v3/products?per_page=100&search=${encodeURIComponent(search)}&lang=${encodeURIComponent(locale)}&consumer_key=${CK}&consumer_secret=${CS}`;
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to search products" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error("API /woocommerce/search error:", e);
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 },
    );
  }
}
