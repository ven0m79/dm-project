import type { Metadata } from "next";
import { ClientPage } from "./client-page";
import parse from "html-react-parser";
import { getCategoryBySlugCached, buildBreadcrumbTrail } from "../../../../utils/woo.server";
import DesktopBreadcrumbs from "./product/[productId]/DesktopBreadcrumbs";
import MobileBreadcrumbs from "./product/[productId]/MobileBreadcrumbs";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

export const revalidate = 300;

export async function generateMetadata(
  { params, searchParams }: PageProps
): Promise<Metadata> {
  const { locale } = await params;
  const { category: slug } = await searchParams;

  const category = slug ? await getCategoryBySlugCached(locale, slug) : null;

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

  const [category, breadcrumbs] = await Promise.all([
    slug ? getCategoryBySlugCached(locale, slug) : Promise.resolve(null),
    buildBreadcrumbTrail(locale, slug),
  ]);

  const schemaJson = category?.schema_json
    ? typeof category.schema_json === "string"
      ? category.schema_json
      : JSON.stringify(category.schema_json)
    : null;

  return (
    <>
      {schemaJson && <>{parse(schemaJson)}</>}

      <div className="hidden sm:block ml-4 mt-2">
        <DesktopBreadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className="sm:hidden ml-2 mt-2">
        <MobileBreadcrumbs
          breadcrumbs={breadcrumbs}
          detailsName={breadcrumbs.at(-1)?.name}
        />
      </div>

      <ClientPage locale={locale} />
    </>
  );
}
