import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";

import ClientPage from "./client-page";
import DesktopBreadcrumbs from "./DesktopBreadcrumbs";
import MobileBreadcrumbs from "./MobileBreadcrumbs";
import {
  fetchWooCommerceProductDetails,
  fetchWooCommerceCrossProductsDetails,
} from "../../../../../../utils/woocommerce.setup";
import { buildBreadcrumbTrail } from "../../../../../../utils/woo.server";

type Props = {
  params: Promise<{ locale: string; productId: string }>;
  searchParams: Promise<{ category?: string }>;
};

export const revalidate = 3600; // кеш на 1 годину

// Shared, memoized data loader for this route
const getProduct = cache(async (id: number, locale: string) => {
  const product = await fetchWooCommerceProductDetails(id, locale);
  return product ?? null;
});

// SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params; // розпаковуємо Promise
  const { productId, locale } = resolvedParams;
  const id = Number(productId);

  const product = await getProduct(id, locale);

  if (!product) {
    return { title: "Product", description: "" };
  }

  const strip = product.short_description?.replace(/<[^>]*>/g, "").trim() ?? "";

  return {
    title: product.name || "Product",
    description: strip,
  };
}

// Main SSR page
export default async function Page({ params, searchParams }: Props) {
  const resolvedParams = await params; // обов'язково unwrap
  const { productId, locale } = resolvedParams;
  const { category: categorySlug } = await searchParams;
  const id = Number(productId);

  const product = await getProduct(id, locale);

  if (!product) {
    notFound(); // Next.js 16 404
  }

  // Use the URL category if present; fall back to the product's first assigned category
  const effectiveCategorySlug = categorySlug ?? product.categories?.[0]?.slug;

  const [crossSellProducts, relatedProducts, breadcrumbs] = await Promise.all([
    product.cross_sell_ids?.length > 0
      ? fetchWooCommerceCrossProductsDetails(
          product.cross_sell_ids.map((id: any) => (typeof id === "object" ? id.id : id)),
          locale
        )
      : Promise.resolve([]),
    product.related_ids?.length > 0
      ? fetchWooCommerceCrossProductsDetails(
          product.related_ids.map((id: any) => (typeof id === "object" ? id.id : id)),
          locale
        )
      : Promise.resolve([]),
    buildBreadcrumbTrail(locale, effectiveCategorySlug, product.name, product.id),
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
        serverData={{
          details: product,
          crossSellProducts,
          relatedProducts,
        }}
      />
    </>
  );
}
