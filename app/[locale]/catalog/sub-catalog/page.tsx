import type { Metadata } from "next";
import { ClientPage } from "./client-page";

type Props = {
  params: { locale: string };
  searchParams: { category?: string };
};

// 🔹 Спільний хелпер для завантаження категорії
async function fetchCategory(locale: string, slug?: string) {
  if (!slug) return null;

  try {
    const categories = await fetch(`https://api.dm-project.com.ua/wp-json/wc/v3/products/categories?slug=${slug}&lang=${locale}&consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}`, { next: { revalidate: 300 } }).then(res => res.json());
    return categories?.[0] || null;
  } catch (err) {
    console.error("❌ fetchCategory error:", err);
    return null;
  }
}

// 🔹 Генерація SEO метаданих
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const category = await fetchCategory(params.locale, searchParams.category);

  if (!category) {
    return {
      title: `DM-PROJECT: ${searchParams.category}`,
      description: "Error fetching category details. Please try again later.",
    };
  }

  const yoast = category.yoast_head_json;
  const title = yoast?.title || category.name || searchParams.category;
  const description = yoast?.description || category.description?.trim() || "";

  return {
    metadataBase: new URL("https://dm-project.com.ua"),
    title,
    description,
    openGraph: {
      title: yoast?.og_title || title,
      description: yoast?.og_description || description,
    },
    twitter: {
      title: yoast?.twitter_title || title,
      description: yoast?.twitter_description || description,
    },
  };
}

// 🔹 Сторінка
export default async function Page({ params, searchParams }: Props) {
  const category = await fetchCategory(params.locale, searchParams.category);

  const schemaJson = category?.schema_json
    ? typeof category.schema_json === "string"
      ? category.schema_json
      : JSON.stringify(category.schema_json)
    : null;

  return (
    <>
      {/* Виводимо schema.org */}
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
