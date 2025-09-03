import type { Metadata } from "next";
import { ClientPage } from "./client-page";
import Script from "next/script";

type Props = {
  params: { locale: string };
  searchParams: { category?: string };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const categorySlug = searchParams.category;

  try {
    const categories = await fetch(
      `https://api.dm-project.com.ua/wp-json/wc/v3/products/categories?slug=${categorySlug}&lang=${params.locale}&consumer_key=ck_8dee30956004b4c7f467a46247004a2f4cd650e5&consumer_secret=cs_1cf0a573275e5cafe5af6bddbb01f29b9592be20`,
      { cache: "no-store" }
    ).then((res) => res.json());

    if (!categories || categories.length === 0) {
      throw new Error("Category not found");
    }

    const category = categories[0];
    const yoast = category?.yoast_head_json;

    const title = yoast?.title || category?.name || categorySlug;
    const description =
      yoast?.description || category?.description?.trim() || "";

    return {
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
  } catch (error) {
    console.error("Error fetching category for metadata:", error);
    return {
      title: `DM-PROJECT: ${searchParams.category}`,
      description:
        "Error fetching category details. Please try again later.",
    };
  }
}

// ⚡ Тут уже дістаємо schemaJson знову
async function getSchemaJson(locale: string, categorySlug?: string) {
  if (!categorySlug) return null;

  const categories = await fetch(
    `https://api.dm-project.com.ua/wp-json/wc/v3/products/categories?slug=${categorySlug}&lang=${locale}&consumer_key=ck_8dee30956004b4c7f467a46247004a2f4cd650e5&consumer_secret=cs_1cf0a573275e5cafe5af6bddbb01f29b9592be20`,
    { cache: "no-store" }
  ).then((res) => res.json());

  if (!categories || categories.length === 0) return null;

  const category = categories[0];
  if (category?.schema_json) {
    return typeof category.schema_json === "string"
      ? category.schema_json
      : JSON.stringify(category.schema_json, null, 2);
  }

  return null;
}

export default async function Page({ params, searchParams }: Props) {
  const schemaJson = await getSchemaJson(params.locale, searchParams.category);

  return (
    <>
      {schemaJson && (
        <Script
          id="category-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaJson }}
        />
      )}
      <ClientPage locale={params.locale} />
    </>
  );
}
