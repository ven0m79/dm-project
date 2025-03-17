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
    products: [],
    totalProducts: 0, // Добавляем свойство для общего количества записей
  };

  try {
    const response = await api.get("products?per_page=100");

    const totalProducts = parseInt(response.headers["x-wp-total"], 10); // Получаем общее количество записей

    responseData.success = true;
    responseData.products = response.data;
    responseData.totalProducts = totalProducts; // Сохраняем общее количество записей

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching products:");
    res.status(500).json(responseData);
  }
}
