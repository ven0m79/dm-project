const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_RITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
});

export default async function handler(req: any, res: any) {
  const responseData = {
    success: false,
    categories: [],
    totalCategories: 0,
  };

  try {
    const response = await api.get("products?per_page=100"); // /categories

    const totalCategories = parseInt(response.headers["x-wp-total"], 10); // Получаем общее количество категорий

    responseData.success = true;
    responseData.categories = response.data;
    responseData.totalCategories = totalCategories; // Сохраняем общее количество категорий

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json(responseData);
  }
}
