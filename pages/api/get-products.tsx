import { WoocomerceCategoryType } from "utils/woocomerce.types";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_RITE_URL!,
  consumerKey: process.env.WC_CONSUMER_KEY!,
  consumerSecret: process.env.WC_CONSUMER_SECRET!,
  version: "wc/v3",
});

export default async function handler(req: any, res: any) {
  try {
    let page = 1;
    let totalPages = 1;
    const allCategories: WoocomerceCategoryType[] = [];
//
    do {
      const response = await api.get(
        `products?per_page=100&page=${page}&tag_ID=102`
      );

      if (response.status === 200) {
        totalPages = parseInt(response.headers["x-wp-totalpages"] || "1", 10);
        allCategories.push(...response.data);
        page++;
      } else {
        break;
      }
    } while (page <= totalPages);

    res.status(200).json({ success: true, categories: allCategories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, categories: [], error: error });
  }
}
