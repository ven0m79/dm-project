import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_RITE_URL || "",
  consumerKey: process.env.WC_CONSUMER_KEY || "",
  consumerSecret: process.env.WC_CONSUMER_SECRET || "",
  version: "wc/v3",
});

export default async function getDynamicRoutes(req: any, res: any) {
  const responseData = {
    success: false,
    products: [] as string[],
    error: null as string | null,
  };

  try {
    const productsWithDetails: string[] = [];

    // Запрос для получения товаров
    const { data: products } = await api.get("products", {
      params: {
        per_page: 100, 
      },
    });

    // Обрабатываем товары и формируем ссылки
    const productsLinks = products.map((product: any) => {
      const tagSlug = product.tags?.[0]?.slug; 
      const lang = product.lang; 

      return `/${lang}/catalog/sub-catalog/product/${product.id}?category=${tagSlug}`;
    });

    productsWithDetails.push(...productsLinks);

    responseData.success = true;
    responseData.products = productsWithDetails; 

    return responseData;
  } catch (error: any) {
    console.error("Error fetching products:", error.message, error.response?.data);

    responseData.error = error.message || "An unknown error occurred.";
    return responseData;
  }
}
