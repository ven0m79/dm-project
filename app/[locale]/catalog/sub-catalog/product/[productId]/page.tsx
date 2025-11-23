import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";

import ClientPage from "./client-page";
import {
    fetchWooCommerceProductDetails,
    fetchWooCommerceCrossProductsDetails,
} from "../../../../../../utils/woocommerce.setup";

type Props = {
    params: { locale: string; productId: string };
};

export const revalidate = 3600; // cache page & data for 1 hour

// Shared, memoized data loader for this route (used by both page + metadata)
const getProduct = cache(
    async (id: number, locale: string) =>
        (await fetchWooCommerceProductDetails(id, locale)) ?? null,
);

// SEO metadata (SSR, re-uses the same cached product fetch)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = Number(params.productId);
    const { locale } = params;

    const product = await getProduct(id, locale);

    if (!product) {
        return {
            title: "Product",
            description: "",
        };
    }

    const strip =
        product?.short_description
            ?.replace(/<[^>]*>/g, "")
            .trim() || "";

    return {
        title: product.name || "Product",
        description: strip,
    };
}

// Main SSR page
export default async function Page({ params }: Props) {
    const { productId, locale } = params;
    const id = Number(productId);

    const product = await getProduct(id, locale);

    if (!product) {
        notFound();
    }

    // Cross-sell products
    const crossSellIds = product?.cross_sell_ids ?? [];
    const crossSellProducts =
        crossSellIds.length > 0
            ? await fetchWooCommerceCrossProductsDetails(
                crossSellIds.map((id: any) => (typeof id === "object" ? id.id : id)),
                locale,
            )
            : [];

    // Related products
    const relatedIds = product?.related_ids ?? [];
    const relatedProducts =
        relatedIds.length > 0
            ? await fetchWooCommerceCrossProductsDetails(
                relatedIds.map((id: any) => (typeof id === "object" ? id.id : id)),
                locale,
            )
            : [];

    return (
        <ClientPage
            params={params}
            serverData={{
                details: product,
                crossSellProducts,
                relatedProducts,
            }}
        />
    );
}
