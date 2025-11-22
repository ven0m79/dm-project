import { fetchWooCommerceCategories } from "../../../../../utils/woocommerce.setup";
import { categoriesCreation, TransformedCategoriesType } from "@app/[locale]/catalog/sub-catalog/helpers";

// Серверна функція для отримання категорій з кешуванням
export async function getCategories(locale: string): Promise<TransformedCategoriesType[]> {
  const data = await fetchWooCommerceCategories(locale);
  return categoriesCreation(data as TransformedCategoriesType[]);
}
