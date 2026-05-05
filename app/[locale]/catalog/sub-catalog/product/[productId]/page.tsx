import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAlternates } from "../../../../components/atoms/hreflang/hreflang";

import ClientPage from "./client-page";
import DesktopBreadcrumbs from "./DesktopBreadcrumbs";
import MobileBreadcrumbs from "./MobileBreadcrumbs";
import {
  getProductByIdFromDb,
  getRelatedProductsFromDb,
  buildBreadcrumbTrailFromDb,
  getAllProductIdsByLocale,
} from "../../../../../../lib/db/queries";

type Props = {
  params: Promise<{ locale: string; productId: string }>;
  searchParams: Promise<{ category?: string }>;
};

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const [ua, en] = await Promise.all([
    getAllProductIdsByLocale("ua"),
    getAllProductIdsByLocale("en"),
  ]);
  return [
    ...ua.map((id) => ({ locale: "ua", productId: String(id) })),
    ...en.map((id) => ({ locale: "en", productId: String(id) })),
  ];
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { productId, locale } = await params;
  const { category } = await searchParams;
  const id = Number(productId);

  const product = await getProductByIdFromDb(locale, id);

  if (!product) {
    return { title: "Product", description: "" };
  }

  const strip = product.short_description?.replace(/<[^>]*>/g, "").trim() ?? "";
  const uaId = product.translations?.ua ?? id;
  const enId = product.translations?.en ?? id;
  const categoryQuery = category ? `?category=${category}` : "";

  return {
    metadataBase: new URL("https://dm-project.com.ua"),
    alternates: getAlternates(
      `/catalog/sub-catalog/product/${uaId}${categoryQuery}`,
      locale,
      `/catalog/sub-catalog/product/${enId}${categoryQuery}`,
    ),
    title: product.name || "Product",
    description: strip,
  };
}

export default async function Page({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const { productId, locale } = resolvedParams;
  const { category: categorySlug } = await searchParams;
  const id = Number(productId);

  const product = await getProductByIdFromDb(locale, id);

  if (!product) {
    notFound();
  }

  const effectiveCategorySlug = categorySlug ?? product.categories?.[0]?.slug;

  const crossSellIds = product.cross_sell_ids?.map((v: any) =>
    typeof v === "object" ? v.id : v
  ) ?? [];
  const relatedIds = product.related_ids?.map((v: any) =>
    typeof v === "object" ? v.id : v
  ) ?? [];

  const [crossSellProducts, relatedProducts, breadcrumbs] = await Promise.all([
    crossSellIds.length > 0 ? getRelatedProductsFromDb(locale, crossSellIds) : Promise.resolve([]),
    relatedIds.length > 0 ? getRelatedProductsFromDb(locale, relatedIds) : Promise.resolve([]),
    buildBreadcrumbTrailFromDb(locale, effectiveCategorySlug, product.name, product.id),
  ]);

  return (
    <>
      <div className="hidden sm:block ml-4 mt-2">
        <DesktopBreadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className="sm:hidden ml-2 mt-2">
        <MobileBreadcrumbs breadcrumbs={breadcrumbs} detailsName={product.name} />
      </div>

      <ClientPage
        params={resolvedParams}
        categorySlug={effectiveCategorySlug}
        serverData={{
          details: product,
          crossSellProducts,
          relatedProducts,
        }}
      />
    </>
  );
}
