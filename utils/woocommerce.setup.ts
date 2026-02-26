import "server-only";

import { cache } from "react";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { getWooEnv } from "./woo-env";
import type {
  SingleProductTitles,
  SingleProductDetails,
  WoocomerceCategoryType,
} from "./woocomerce.types";

let api: WooCommerceRestApi | null = null;

export function getWooApi(): WooCommerceRestApi {
  if (api) return api;

  const { baseUrl, consumerKey, consumerSecret } = getWooEnv();

  api = new WooCommerceRestApi({
    url: baseUrl,
    consumerKey,
    consumerSecret,
    version: "wc/v3",
    queryStringAuth: true,
  });

  return api;
}

export const fetchWooCommerceProducts = cache(
  async function fetchWooCommerceProducts(id: number, locale: string) {
    const api = getWooApi();

    try {
      const response = await api.get(
        `products/categories/${id}?per_page=100&lang=${locale}`,
      );

      if (response.status === 200) return response.data;
      throw new Error(`Bad response: ${response.status}`);
    } catch (error) {
      throw new Error(String(error));
    }
  },
);

export const fetchWooCommerceCategories = cache(
  async function fetchWooCommerceCategories(locale: string) {
    const api = getWooApi();

    try {
      let page = 1;
      let totalPages = 1;
      const result: WoocomerceCategoryType[] = [];

      do {
        const response = await api.get(
          `products/categories?per_page=100&page=${page}&lang=${locale}`,
        );

        if (response.status !== 200) {
          throw new Error("Bad response: " + response.status);
        }

        totalPages = parseInt(response.headers["x-wp-totalpages"] || "1", 10);

        const data = response.data as WoocomerceCategoryType[];
        result.push(...data);

        page++;
      } while (page <= totalPages);

      return result;
    } catch (error) {
      console.error("WooCommerce fetch error:", error);
      throw new Error(String(error));
    }
  },
);

export const fetchWooCommerceCategoryDetails = cache(
  async function fetchWooCommerceCategoryDetails(
    categoryId: number,
    locale: string,
  ): Promise<WoocomerceCategoryType | null> {
    const api = getWooApi();

    try {
      const response = await api.get(
        `products/categories/${categoryId}?lang=${locale}`,
      );
      return response.data as WoocomerceCategoryType;
    } catch (error) {
      console.error("Помилка при завантаженні категорії:", error);
      return null;
    }
  },
);

export const fetchWooCommerceProductsBasedOnCategory = cache(
  async function fetchWooCommerceProductsBasedOnCategory(
    id: number,
    locale: string,
  ) {
    const api = getWooApi();

    try {
      let page = 1;
      let totalPages = 1;
      const result: SingleProductDetails[] = [];

      do {
        const response = await api.get(
          `products?category=${id}&per_page=100&page=${page}&lang=${locale}`,
        );

        if (response.status !== 200) {
          throw new Error(`Bad response: ${response.status}`);
        }

        totalPages = parseInt(response.headers["x-wp-totalpages"] || "1", 10);

        const data = response.data as SingleProductDetails[];
        result.push(...data);

        page++;
      } while (page <= totalPages);

      return result;
    } catch (error) {
      throw new Error(String(error));
    }
  },
);

export const fetchWooCommerceProductDetails = cache(
  async function fetchWooCommerceProductDetails(id: number, locale: string) {
    const api = getWooApi();

    try {
      const response = await api.get(
        `products/${id}?per_page=100&lang=${locale}`,
      );

      if (response.status !== 200) {
        throw new Error(`Bad response: ${response.status}`);
      }

      let updatedData: any = response.data;

      const variationsResponse = await api.get(
        `products/${response.data.id}/variations${locale ? `?lang=${locale}` : ""}`,
      );

      if (variationsResponse.status === 200) {
        updatedData = {
          ...response.data,
          variations: variationsResponse.data,
        };
      }

      return updatedData as SingleProductDetails;
    } catch (error) {
      throw new Error(String(error));
    }
  },
);

export const fetchWooCommerceCrossProductsDetails = cache(
  async function fetchWooCommerceCrossProductsDetails(
    ids: number[],
    locale: string,
  ) {
    const api = getWooApi();

    try {
      const productPromises = ids.map(async (id: number) => {
        const response = await api.get(`products/${id}?lang=${locale}`);
        return response.data;
      });

      return await Promise.all(productPromises);
    } catch (error) {
      throw new Error(String(error));
    }
  },
);

export const fetchWooCommerceProductsTitles = cache(
  async function fetchWooCommerceProductsTitles(
    searchTerm: string,
    locale: string,
  ) {
    const api = getWooApi();

    try {
      const response = await api.get(
        `products?search=${encodeURIComponent(searchTerm)}&lang=${locale}`,
      );

      if (response.status === 200) {
        return response.data as SingleProductTitles;
      }

      throw new Error(`Bad response: ${response.status}`);
    } catch (error) {
      throw new Error(String(error));
    }
  },
);
