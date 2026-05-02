import type { Metadata } from "next";
import { getAlternates } from "../../components/atoms/hreflang/hreflang";
import { ClientPage } from "./client-page";
import { getCategoryBySlugFromDb, getProductsByCategoryIdFromDb, buildBreadcrumbTrailFromDb } from "../../../../lib/db/queries";
import DesktopBreadcrumbs from "./product/[productId]/DesktopBreadcrumbs";
import MobileBreadcrumbs from "./product/[productId]/MobileBreadcrumbs";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata(
  { params, searchParams }: PageProps
): Promise<Metadata> {
  const { locale } = await params;
  const { category: slug } = await searchParams;

  const category = slug ? await getCategoryBySlugFromDb(locale, slug) : null;

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
  const categoryPath = `/catalog/sub-catalog${slug ? `?category=${slug}` : ""}`;

  return {
    metadataBase: new URL("https://dm-project.com.ua"),
    alternates: getAlternates(categoryPath, locale),
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
    slug ? getCategoryBySlugFromDb(locale, slug) : Promise.resolve(null),
    buildBreadcrumbTrailFromDb(locale, slug),
  ]);

  const initialProducts = category
    ? await getProductsByCategoryIdFromDb(locale, category.id)
    : [];

  const schemaJson = category?.schema_json
    ? typeof category.schema_json === "string"
      ? category.schema_json
      : JSON.stringify(category.schema_json)
    : null;

  const lcpImageSrc = initialProducts[0]?.images?.[0]?.src;

  return (
    <>
      {lcpImageSrc && (
        // eslint-disable-next-line @next/next/no-head-element
        <link rel="preload" as="image" href={lcpImageSrc} fetchPriority="high" />
      )}
      {schemaJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaJson }}
        />
      )}

      <div className="hidden sm:block ml-4 mt-2">
        <DesktopBreadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className="sm:hidden ml-2 mt-2">
        <MobileBreadcrumbs
          breadcrumbs={breadcrumbs}
          detailsName={breadcrumbs.at(-1)?.name}
        />
      </div>

      <ClientPage
        locale={locale}
        initialProducts={initialProducts}
        initialCategorySlug={slug}
      />
    </>
  );
}
