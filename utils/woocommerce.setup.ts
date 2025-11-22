import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import {
  SingleProductTitles,
  SingleProductDetails,
  WoocomerceCategoryType,
} from "./woocomerce.types";
import { title } from "process";
import { unstable_cache } from "next/cache";

export const api = new WooCommerceRestApi({
  url: "https://api.dm-project.com.ua",
  consumerKey: "ck_8dee30956004b4c7f467a46247004a2f4cd650e5",
  consumerSecret: "cs_1cf0a573275e5cafe5af6bddbb01f29b9592be20",
  version: "wc/v3",
  queryStringAuth: true,
});

export async function fetchWooCommerceProducts(id: number, locale: string) {
  try {
    const response = await api.get(
      `products/categories/${id}?per_page=100&lang=${locale}`,
    );

    if (response.status === 200) {
      return response.data;
    }
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
}

const getCategoriesInternal = async (locale: string): Promise<WoocomerceCategoryType[]> => {
  try {
    let page = 1;
    let totalPages = 1;
    const result: WoocomerceCategoryType[] = [];

    do {
      const response = await api.get(`products/categories?per_page=100&page=${page}&lang=${locale}`);
      if (response.status === 200) {
        const totalHeader = response.headers["x-wp-totalpages"];
        totalPages = totalHeader ? parseInt(totalHeader, 10) : 1;

        result.push(...response.data);
        page++;
      } else break;
    } while (page <= totalPages);

    return result;
  } catch (error) {
    console.error("Fetch Categories Error:", error);
    return [];
  }
};

// Серверний кеш, дані кешуються до білду
export const fetchWooCommerceCategories = unstable_cache(
  getCategoriesInternal,
  ["woocommerce-categories-list"], // унікальний ключ
  {
    revalidate: false, // false = кеш до нового білду
    tags: ["categories"], // для ISR ревалідації (опціонально)
  }
);

export async function fetchWooCommerceCategoryDetails(
  categoryId: number,
  locale: string
): Promise<WoocomerceCategoryType | null> {
  try {
    const { data } = await api.get(`products/categories/${categoryId}`, {
      lang: locale,
    });
    return data as WoocomerceCategoryType;
  } catch (error) {
    console.error("Помилка при завантаженні категорії:", error);
    return null;
  }
}

export async function fetchWooCommerceProductsBasedOnCategory(
  id: number,
  locale: string,
) {
  try {
    let page = 1;
    let totalPages = 1;
    const result: SingleProductDetails[] = [];
     do {
    const response = await api.get(
      `products?category=${id}&per_page=100&page=${page}&lang=${locale}`,
    );

      if (response.status === 200) {
        totalPages = parseInt(response.headers["x-wp-totalpages"], 10);
        const data = await response.data;
        result.push(...data);

        page++;
      }
    } while (page <= totalPages);

    return result;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function fetchWooCommerceProductDetails(
  id: number,
  locale: string,
) {
  try {
    const response = await api.get(
      `products/${id}?per_page=100&lang=${locale}`,
    );

    if (response.status === 200) {
      return (await response.data) as SingleProductDetails;
    }
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function fetchWooCommerceCrossProductsDetails(
  ids: any,
  locale: string,
) {
  // Fetch product details for each ID in the array
  try {
    // Fetch product details for each ID in the array
    const productPromises = ids.map(async (id: number) => {
      // Use the `api.get` method to fetch product details by ID
      const response = await api.get(`products/${id}`, { lang: locale });
      return response.data;
    });

    // Resolve all promises and return product data
    return await Promise.all(productPromises);
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function fetchWooCommerceProductsTitles(
  searchTerm: string,
  locale: string,
) {
  try {
    const response = await api.get(
      `products?search=${searchTerm}&locale=${locale}`,
    );

    if (response.status === 200) {
      return (await response.data) as SingleProductTitles;
    }
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function fetchWooCommerceProductVariations(
  productId: number,
  locale: string
) {
  try {
    const response = await api.get(`products/${productId}/variations${locale ? `?lang=${locale}` : ""}`);
    if (response.status === 200) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error("Помилка при завантаженні варіацій:", error);
    return [];
  }
}