import { NextResponse } from "next/server";
import { getCategoriesFromDb } from "../../../../lib/db/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "ua";

  try {
    const data = await getCategoriesFromDb(locale);
    return NextResponse.json(data);
  } catch (e) {
    console.error("API /woocommerce/categories error:", e);
    return NextResponse.json(
      { error: "Failed to load categories" },
      { status: 500 },
    );
  }
}
