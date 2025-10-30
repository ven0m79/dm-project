import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_RITE_URL!,
  consumerKey: process.env.WC_CONSUMER_KEY!,
  consumerSecret: process.env.WC_CONSUMER_SECRET!,
  version: "wc/v3",
});

/**
 * Отримати всі варіації товару
 */
async function fetchVariations(productId: number) {
  let allVariations: any[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const { data } = await api.get(`products/${productId}/variations`, {
      per_page: perPage,
      page,
    });

    allVariations.push(...data);

    if (data.length < perPage) break;
    page++;
  }

  return allVariations.map((v: any) => ({
    id: v.id,
    price: Number(v.price),
    regular_price: Number(v.regular_price),
    sale_price: v.sale_price ? Number(v.sale_price) : null,
    attributes: v.attributes,
    stock_status: v.stock_status,
  }));
}

export default async function handler(req: any, res: any) {
  try {
    const productId = 913; // Тільки цей товар

    // Отримуємо всі варіації
    const variations = await fetchVariations(productId);

    res.status(200).json({ success: true, variations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, variations: [], error });
  }
}
