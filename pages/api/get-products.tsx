import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { SingleProductDetails } from "utils/woocomerce.types";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_RITE_URL || "",
  consumerKey: process.env.WC_CONSUMER_KEY || "",
  consumerSecret: process.env.WC_CONSUMER_SECRET || "",
  version: "wc/v3",
});

export default async function handler(req: any, res: any) {
  const responseData = {
    success: false,
    products: [] as SingleProductDetails[],
    error: null as string | null,
  };

  try {
    const productsWithDetails = [];

    // Запрос для получения товаров
    const { data: products } = await api.get("products", {
      params: {
        per_page: 100, // Максимальное количество товаров за запрос
      },
    });

    // Обрабатываем товары и формируем ссылки
    const productsLinks = products.map((product: any) => {
      const tagSlug = product.tags?.[0]?.slug || "no-tag"; // Получаем slug первого тега или "no-tag"
      const lang = product.lang || "en"; // Получаем язык или используем "en" по умолчанию

      return {
        id: product.id,
        name: product.name,
        lang, // Язык товара
        tags: tagSlug, // Тег
        route: `https://www.dm-project.com.ua/${lang}/catalog/sub-catalog/product/${product.id}?category=${tagSlug}`,
      };
    });

    productsWithDetails.push(...productsLinks);

    responseData.success = true;
    responseData.products = productsWithDetails;

    res.json(responseData);
  } catch (error: any) {
    // Логируем ошибку для отладки
    console.error("Error fetching products:", error.message, error.response?.data);

    // Возвращаем ошибку в ответе
    responseData.error = error.message || "An unknown error occurred.";
    res.status(500).json(responseData);
  }
}
