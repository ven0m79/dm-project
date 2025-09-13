// app/[locale]/components/hooks/useBreadcrumbs.ts
import { useState, useCallback } from "react";
import { fetchWooCommerceCategoryDetails } from "../../../../../utils/woocommerce.setup";

export type BreadcrumbItem = { id: number | string; name: string; url: string };

export function useBreadcrumbs(locale: string) {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  const getCategoryPath = useCallback(
    async (categoryId: number, visited = new Set<number>()): Promise<BreadcrumbItem[]> => {
      const category = await fetchWooCommerceCategoryDetails(categoryId, locale);
      if (!category || category.parent === 0 || visited.has(category.id)) return [];

      visited.add(category.id);
      const path: BreadcrumbItem[] = category.parent
        ? [...await getCategoryPath(category.parent, visited)]
        : [];

      path.push({
        id: category.id,
        name: category.name,
        url: `/${locale}/catalog/sub-catalog?category=${encodeURIComponent(category.slug)}`,
      });

      return path;
    },
    [locale]
  );

  const buildCategoryTrail = useCallback(
    async (categories: any[], productName?: string, productId?: number) => {
      const trail: BreadcrumbItem[] = [];
      const homeUrl = locale === "ua" ? `/` : `/${locale}`;
      trail.push({ id: "home", name: "Головна", url: homeUrl });

      if (categories && categories.length) {
        const deepestCategory = categories[0];
        const categoryPath = await getCategoryPath(deepestCategory.id);
        trail.push(...categoryPath);

        if (productName && productId) {
          trail.push({
            id: productId,
            name: productName,
            url: `/${locale}/catalog/sub-catalog/product/${productId}?category=${encodeURIComponent(deepestCategory.slug)}`,
          });
        }
      }

      setBreadcrumbs(trail);
      return trail;
    },
    [locale, getCategoryPath]
  );

  return { breadcrumbs, setBreadcrumbs, buildCategoryTrail };
}
