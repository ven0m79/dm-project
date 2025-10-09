// app/[locale]/catalog/sub-catalog/product/[productId]/page.tsx
import type { Metadata } from "next";
import ClientPage from "./client-page";
import {
  fetchWooCommerceProductDetails,
  fetchWooCommerceCrossProductsDetails,
} from "../../../../../../utils/woocommerce.setup";

type Props = {
  params: { locale: string; productId: string };
};

// 🧠 Генерація метаданих (SEO)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.productId;
  const product = await fetch(
    `https://api.dm-project.com.ua/wp-json/wc/v3/products/${id}?lang=${params.locale}&consumer_key=ck_8dee30956004b4c7f467a46247004a2f4cd650e5&consumer_secret=cs_1cf0a573275e5cafe5af6bddbb01f29b9592be20`
  ).then((res) => res.json());

  const strip = product?.short_description?.replace(/<[^>]*>/g, "").trim() || "";

  return {
    title: product?.name || "Product",
    description: strip,
  };
}

// 🟢 Основний SSR-компонент
export default async function Page({ params }: Props) {
  const { productId, locale } = params;

  // ✅ Фетчимо дані одразу на сервері
 const product = (await fetchWooCommerceProductDetails(Number(productId), locale)) ?? null;

  const crossSellProducts =
    product?.cross_sell_ids?.length
      ? await fetchWooCommerceCrossProductsDetails(product.cross_sell_ids, locale)
      : [];

  return (
    <ClientPage
      params={params}
      serverData={{
        details: product,
        crossSellProducts: crossSellProducts,
      }}
    />
  );
}
