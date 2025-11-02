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

  // ✅ Завантажуємо головний товар
  const product = (await fetchWooCommerceProductDetails(Number(productId), locale)) ?? null;

  // ✅ Крос-продажі
  const crossSellProducts =
  Array.isArray(product?.cross_sell_ids) && product.cross_sell_ids.length > 0
    ? await fetchWooCommerceCrossProductsDetails(
        product.cross_sell_ids.map((id: any) => (typeof id === "object" ? id.id : id)),
        locale
      )
    : [];


  // ✅ Пов'язані товари
  const relatedProducts =
  Array.isArray(product?.related_ids) && product.related_ids.length > 0
    ? await fetchWooCommerceCrossProductsDetails(
        product.related_ids.map((id: any) => (typeof id === "object" ? id.id : id)),
        locale
      )
    : [];

  // 🔹 Повертаємо все у ClientPage
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
