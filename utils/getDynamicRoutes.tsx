import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_RITE_URL || "",
  consumerKey: process.env.WC_CONSUMER_KEY || "",
  consumerSecret: process.env.WC_CONSUMER_SECRET || "",
  version: "wc/v3",
});

// === Кешування у пам’яті ===
let cache: {
  data: { url: string; date_modified: string }[] | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0,
};

const CACHE_TTL = 1000 * 60 * 60; // 1 година

export default async function getDynamicRoutes() {
  // Перевіряємо кеш
  const now = Date.now();
  if (cache.data && now - cache.timestamp < CACHE_TTL) {
    return {
      success: true,
      products: cache.data,
      error: null,
    };
  }

  const responseData = {
    success: false,
    products: [] as { url: string; date_modified: string }[],
    error: null as string | null,
  };

  try {
    const productsWithDetails: { url: string; date_modified: string }[] = [];
    let page = 1;
    let totalPages = 1;

    do {
      const response = await api.get(`products?per_page=100&page=${page}`);
      const products = response.data;
      totalPages = parseInt(response.headers["x-wp-totalpages"], 10);

      const productsLinks = products.map((product: any) => {
        const tagSlug = product.tags?.[0]?.slug || "no-tag";
        const lang = product.lang || "en";

        return {
          url: `/${lang}/catalog/sub-catalog/product/${product.id}?category=${tagSlug}`,
          date_modified: product.date_modified || product.date_created,
        };
      });

      productsWithDetails.push(...productsLinks);
      page++;
    } while (page <= totalPages);

    responseData.success = true;
    responseData.products = productsWithDetails;

    // Зберігаємо в кеш
    cache.data = productsWithDetails;
    cache.timestamp = Date.now();

    return responseData;
  } catch (error: any) {
    console.error("Error fetching products:", error.message, error.response?.data);
    responseData.error = error.message || "An unknown error occurred.";
    return responseData;
  }
}
