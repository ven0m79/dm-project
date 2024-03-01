import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import {SingleProductDetails, WoocomerceCategoryType} from "./woocomerce.types";

export const api = new WooCommerceRestApi({
  url: "https://dm-project.com.ua",
  consumerKey: "ck_8dee30956004b4c7f467a46247004a2f4cd650e5",
  consumerSecret: "cs_1cf0a573275e5cafe5af6bddbb01f29b9592be20",
  version: "wc/v3",
  queryStringAuth: true,
});

export async function fetchWooCommerceProducts(id: number) {
  try {
    const response = await api.get(`products/categories/${id}`);

    if (response.status === 200) {
      return response.data;
    }
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function fetchWooCommerceCategories() {
  try {
    const response = await api.get("products/categories");

    if (response.status === 200) {
      return (await response.data) as WoocomerceCategoryType[];
    }
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function fetchWooCommerceProductsBasedOnCategory(id: number) {
  try {
    const response = await api.get(`products?category=${id}`);

    if (response.status === 200) {
      return (await response.data) as SingleProductDetails[];
    }
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function fetchWooCommerceProductDetails(id: number) {
  try {
    const response = await api.get(`products/${id}`);

    if (response.status === 200) {
      return (await response.data) as SingleProductDetails;
    }
  } catch (error) {
    throw new Error(error as string);
  }
}