import type { Metadata } from "next";
import { ClientPage } from "./client-page";
import parse from "html-react-parser";
import { cache } from "react";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

export const revalidate = 300;

const fetchCategory = cache(async (locale: string, slug?: string) => {
  if (!slug) return null;

  try {
    const url = new URL(
      "https://api.dm-project.com.ua/wp-json/wc/v3/products/categories"
    );

    url.searchParams.set("slug", slug);
    url.searchParams.set("lang", locale);
    url.searchParams.set("consumer_key", process.env.WC_CONSUMER_KEY!);
    url.searchParams.set("consumer_secret", process.env.WC_CONSUMER_SECRET!);

    const res = await fetch(url, { next: { revalidate } });
    const categories = await res.json();

    return categories?.[0] ?? null;
  } catch (e) {
    console.error("fetchCategory error:", e);
    return null;
  }
});

export async function generateMetadata(
  { params, searchParams }: PageProps
): Promise<Metadata> {
  const { locale } = await params;
  const { category: slug } = await searchParams;

  const category = await fetchCategory(locale, slug);

  if (!category) {
    return {
      metadataBase: new URL("https://dm-project.com.ua"),
      title: `DM-PROJECT: ${slug ?? "Catalog"}`,
      description: "Error fetching category details. Please try again later.",
    };
  }

  const yoast = category.yoast_head_json;
  const title = yoast?.title || category.name || slug;
  const description =
    yoast?.description || (category.description || "").trim();

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

export default async function Page(
  { params, searchParams }: PageProps
) {
  const { locale } = await params;
  const { category: slug } = await searchParams;

  const category = await fetchCategory(locale, slug);

  const schemaJson = category?.schema_json
    ? typeof category.schema_json === "string"
      ? category.schema_json
      : JSON.stringify(category.schema_json)
    : null;

  return (
    <>
      {schemaJson && <>{parse(schemaJson)}</>}

      <ClientPage locale={locale} />
    </>
  );
}
