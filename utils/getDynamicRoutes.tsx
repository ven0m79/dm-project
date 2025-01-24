import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { SingleProductDetails } from "utils/woocomerce.types";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_RITE_URL || "",
  consumerKey: process.env.WC_CONSUMER_KEY || "",
  consumerSecret: process.env.WC_CONSUMER_SECRET || "",
  version: "wc/v3",
});

export default async function getDynamicRoutes(req: any, res: any) {
  const responseData = {
    success: false,
    products: [] as SingleProductDetails[],
    error: null as string | null,
  };

  try {
    const productsWithDetails: SingleProductDetails[] = [];
    let page = 1;

    let totalPages = 1;

    do {
      const response = await api.get("products?per_page=100");

      const products = response.data;
      totalPages = parseInt(response.headers['x-wp-totalpages'], 10);

      const productsLinks = products.map((product: any) => {
        const tagSlug = product.tags?.[0]?.slug || "no-tag";
        const lang = product.lang || "en";

        return `/${lang}/catalog/sub-catalog/product/${product.id}?category=${tagSlug}`
          ;
      });

      productsWithDetails.push(...productsLinks);
      page++;
    } while (page <= totalPages);

    responseData.success = true;
    responseData.products = productsWithDetails; 

    return responseData;
  } catch (error: any) {
    console.error("Error fetching products:", error.message, error.response?.data);

    responseData.error = error.message || "An unknown error occurred.";
    return responseData;
  }
}