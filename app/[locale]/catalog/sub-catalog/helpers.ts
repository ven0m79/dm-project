import { WoocomerceCategoryType } from "../../../../utils/woocomerce.types";

const SKIPPED_CATEGORIES_ID = [16];

export type TransformedCategoriesType = WoocomerceCategoryType & {
  childrens: TransformedCategoriesType[];
};

// оця хуйня робить всю магію з трансформацією твоїх категорій
export function categoriesCreation(
  categories: TransformedCategoriesType[] = [],
) {
  const categoriesInternal = categories.filter(
    (el) => !SKIPPED_CATEGORIES_ID.includes(el.id),
  );
  const categoryMap = {} as any;

  categoriesInternal.forEach((category) => {
    category.childrens = [];
    categoryMap[category.id] = category;
  });

  categoriesInternal.forEach((category) => {
    if (category._links && category._links.up) {
      const parentId = category.parent;
      if (categoryMap[parentId]) {
        categoryMap[parentId].childrens.push(category);
      }
    } else if (category.parent !== 0 && categoryMap[category.parent]) {
      categoryMap[category.parent].childrens.push(category);
    }
  });

  return categoriesInternal.filter(
    (category) =>
      category.parent === 0 && (!category._links || !category._links.up),
  );
}
