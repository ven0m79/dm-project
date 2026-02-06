import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";

import ClientPage from "./client-page";
import {
  fetchWooCommerceProductDetails,
  fetchWooCommerceCrossProductsDetails,
} from "../../../../../../utils/woocommerce.setup";

type Props = {
  params: Promise<{ locale: string; productId: string }>;
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
export default async function Page({ params }: Props) {
  const resolvedParams = await params; // обов'язково unwrap
  const { productId, locale } = resolvedParams;
  const id = Number(productId);

  const product = await getProduct(id, locale);

  if (!product) {
    console.warn(`Product with id ${id} not found`);
    notFound(); // Next.js 16 404
  }

  // Cross-sell products
  const crossSellIds = product.cross_sell_ids ?? [];
  const crossSellProducts =
    crossSellIds.length > 0
      ? await fetchWooCommerceCrossProductsDetails(
          crossSellIds.map((id: any) => (typeof id === "object" ? id.id : id)),
          locale
        )
      : [];

  // Related products
  const relatedIds = product.related_ids ?? [];
  const relatedProducts =
    relatedIds.length > 0
      ? await fetchWooCommerceCrossProductsDetails(
          relatedIds.map((id: any) => (typeof id === "object" ? id.id : id)),
          locale
        )
      : [];

  return (
    <ClientPage
      params={resolvedParams}
      serverData={{
        details: product,
        crossSellProducts,
        relatedProducts,
      }}
    />
  );
}
