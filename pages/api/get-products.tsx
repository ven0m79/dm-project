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
    const allCategories: Record<string, number> = {};

    // 1. Отримуємо всі категорії
    do {
      const response = await api.get(
        `products/categories?per_page=100&page=${page}&_fields=id,slug`
      );

      if (response.status === 200) {
        totalPages = parseInt(response.headers["x-wp-totalpages"], 10);

        for (const category of response.data as WoocomerceCategoryType[]) {
          allCategories[category.slug] = category.id;
        }

        page++;
      } else {
        break;
      }
    } while (page <= totalPages);

    // 2. Розділяємо на 2 об’єкти
    const enCategories: Record<string, number> = {};
    const uaCategories: Record<string, number> = {};

    for (const [slug, id] of Object.entries(allCategories)) {
      if (slug.endsWith("-en") || slug.endsWith("en2")) {
        enCategories[slug] = id;
      } else {
        uaCategories[slug] = id;
      }
    }

    // 3. Відправляємо як два масиви
    res.status(200).json({
      en: enCategories,
      ua: uaCategories
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
