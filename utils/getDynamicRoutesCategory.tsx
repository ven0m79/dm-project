import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_RITE_URL || "",
  consumerKey: process.env.WC_CONSUMER_KEY || "",
  consumerSecret: process.env.WC_CONSUMER_SECRET || "",
  version: "wc/v3",
});

// === Кешування категорій у пам’яті ===
let cache: {
  data: string[] | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0,
};

const CACHE_TTL = 1000 * 60 * 60 * 24; // 1 година

export default async function getDynamicRoutesCategory() {
  const now = Date.now();

  // Перевірка кешу
  if (cache.data && now - cache.timestamp < CACHE_TTL) {
    return {
      success: true,
      categories: cache.data,
      error: null,
    };
  }

  const responseData = {
    success: false,
    categories: [] as string[],
    error: null as string | null,
  };

  try {
    const categoriesWithDetails: string[] = [];
    let page = 1;
    let totalPages = 1;

    do {
      const response = await api.get("products/categories?per_page=100", {
        params: { page },
      });

      const categories = response.data;
      totalPages = parseInt(response.headers["x-wp-totalpages"], 10);

      const categoriesLinks = categories.map((category: any) => {
        const tagSlug = category.slug || "no-tag";
        const lang = category.lang || "en";

        return `/${lang}/catalog/sub-catalog?category=${tagSlug}`;
      });

      categoriesWithDetails.push(...categoriesLinks);
      page++;
    } while (page <= totalPages);

    responseData.success = true;
    responseData.categories = categoriesWithDetails;

    // Зберігаємо в кеш
    cache.data = categoriesWithDetails;
    cache.timestamp = Date.now();

    return responseData;
  } catch (error: any) {
    console.error("Error fetching categories:", error.message, error.response?.data);
    responseData.error = error.message || "An unknown error occurred.";
    return responseData;
  }
}
