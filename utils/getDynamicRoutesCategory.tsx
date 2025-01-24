import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_RITE_URL || "",
  consumerKey: process.env.WC_CONSUMER_KEY || "",
  consumerSecret: process.env.WC_CONSUMER_SECRET || "",
  version: "wc/v3",
});

export default async function getDynamicRoutesCategory(req: any, res: any) {
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
        params: {
          page: page,
        },
      });

      const categories = response.data;
      totalPages = parseInt(response.headers['x-wp-totalpages'], 10);

      const categoriesLinks = categories.map((categories: any) => {
        const tagSlug = categories.slug || "no-tag";
        const lang = categories.lang || "en";

        return `/${lang}/catalog/sub-catalog?category=${tagSlug}`
          ;
      });

      categoriesWithDetails.push(...categoriesLinks);
      page++;
    } while (page <= totalPages);

    responseData.success = true;
    responseData.categories = categoriesWithDetails; 

    return responseData;
  } catch (error: any) {
    console.error("Error fetching products:", error.message, error.response?.data);

    responseData.error = error.message || "An unknown error occurred.";
    return responseData;
  }
}