import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_RITE_URL!,
  consumerKey: process.env.WC_CONSUMER_KEY!,
  consumerSecret: process.env.WC_CONSUMER_SECRET!,
  version: "wc/v3",
});

/**
 * Отримати всі варіації товару з WooCommerce
 */
export default async function fetchAllVariationPrices(productId: number) {
  let allVariations: any[] = [];
  let page = 1;
  const perPage = 100;

  try {
    while (true) {
      const { data } = await api.get(`products/${productId}/variations`, {
        per_page: perPage,
        page,
      });

      allVariations = [...allVariations, ...data];

      if (data.length < perPage) break;
      page++;
    }

    return allVariations.map((v: any) => ({
      id: v.id,
      price: Number(v.price),
      regular_price: Number(v.regular_price || 0),
      sale_price: v.sale_price ? Number(v.sale_price) : null,
      attributes: v.attributes,
      stock_status: v.stock_status,
    }));
  } catch (err) {
    console.error("Error fetching variations:", err);
    return [];
  }
}
