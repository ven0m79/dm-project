import type { Metadata } from "next";
import { ClientPage } from "./client-page";

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

    // ✅ Формуємо schema.org
    let schemaJson: string | undefined;
    if (category?.schema_json) {
      schemaJson =
        typeof category.schema_json === "string"
          ? category.schema_json
          : JSON.stringify(category.schema_json);
    }

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
      other: schemaJson
        ? {
            "script:ld+json": schemaJson, // ⚡ JSON-LD піде в <head>
          }
        : undefined,
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

export default function Page({ params }: Props) {
  return <ClientPage locale={params.locale} />;
}
