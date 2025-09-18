import type { Metadata } from "next";
import { ClientPage } from "./client-page";

type Props = {
  params: { locale: string };
  searchParams: { category?: string };
};

// Cache metadata fetch for a bit; page content can still be no-store
export const revalidate = 300;

async function fetchCategory(categorySlug: string, locale: string) {
  const res = await fetch(
    `https://api.dm-project.com.ua/wp-json/wc/v3/products/categories?slug=${categorySlug}&lang=${locale}&consumer_key=...&consumer_secret=...`,
    { next: { revalidate } },
  );
  return res.json();
}

// export async function generateMetadata({
//   params,
//   searchParams,
// }: Props): Promise<Metadata> {
//   const categorySlug = searchParams.category;
//   if (!categorySlug) return { title: "DM-PROJECT" };
//
//   try {
//     const categories = await fetchCategory(categorySlug, params.locale);
//     const category = categories?.[0];
//     const yoast = category?.yoast_head_json;
//
//     const title = yoast?.title || category?.name || categorySlug;
//     const description =
//       yoast?.description || category?.description?.trim() || "";
//
//     return {
//       metadataBase: new URL("https://dm-project.com.ua"),
//       title,
//       description,
//       openGraph: {
//         title: yoast?.og_title || title,
//         description: yoast?.og_description || description,
//       },
//       twitter: {
//         title: yoast?.twitter_title || title,
//         description: yoast?.twitter_description || description,
//       },
//     };
//   } catch {
//     return {
//       title: `DM-PROJECT: ${categorySlug}`,
//       description: "Error fetching category",
//     };
//   }
// }

export default async function Page({ params, searchParams }: Props) {
  let schemaJson: string | null = null;

  if (searchParams.category) {
    const res = await fetch(
      `https://api.dm-project.com.ua/wp-json/wc/v3/products/categories?slug=${searchParams.category}&lang=${params.locale}&consumer_key=...&consumer_secret=...`,
      { cache: "no-store" }, // keep page data fresh if you need
    );
    const categories = await res.json();

    const activeCategory = categories?.[0];
    if (activeCategory?.schema_json) {
      schemaJson =
        typeof activeCategory.schema_json === "string"
          ? activeCategory.schema_json
          : JSON.stringify(activeCategory.schema_json);
    }
  }

  return (
    <>
      {schemaJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaJson }}
        />
      )}
      <ClientPage locale={params.locale} />
    </>
  );
}
