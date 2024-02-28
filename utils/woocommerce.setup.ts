import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export const api = new WooCommerceRestApi({
  url: "https://dm-project.com.ua",
  consumerKey: "ck_8dee30956004b4c7f467a46247004a2f4cd650e5",
  consumerSecret: "cs_1cf0a573275e5cafe5af6bddbb01f29b9592be20",
  version: "wc/v3",
  queryStringAuth: true,
});

export async function fetchWooCommerceProducts() {
  try {
    const response = await api.get("products");
    console.log({ response });
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
}
