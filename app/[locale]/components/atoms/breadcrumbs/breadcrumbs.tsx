import { useCallback, useState } from "react";
import { fetchWooCommerceCategoryDetails } from "../../../../../utils/woocommerce.setup";

export type BreadcrumbItem = { id: number | string; name: string; url: string };

const categoryCache = new Map<string, any>();

export function useBreadcrumbs() {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  const fetchCategoryCached = useCallback(
    async (id: number, locale: string) => {
      const key = `${locale}:${id}`;

      if (categoryCache.has(key)) {
        return categoryCache.get(key);
      }

      const cat = await fetchWooCommerceCategoryDetails(id, locale);
      categoryCache.set(key, cat);
      return cat;
    },
    [],
  );

  const getCategoryPath = useCallback(
    async (categoryId: number, locale: string): Promise<BreadcrumbItem[]> => {
      const visited = new Set<number>();
      const stack: { id: number; name: string; slug: string }[] = [];

      let currentId: number | null = categoryId;

      while (currentId && !visited.has(currentId)) {
        visited.add(currentId);

        const cat = await fetchCategoryCached(currentId, locale);
        if (!cat) break;

        // root category → stop, but don't include it
        if (cat.parent === 0) break;

        stack.push({ id: cat.id, name: cat.name, slug: cat.slug });
        currentId = cat.parent && cat.parent !== 0 ? cat.parent : null;
      }

      // stack = [leaf, parent, ...] -> reverse to [rootChild, ..., leaf]
      return stack.reverse().map((c) => ({
        id: c.id,
        name: c.name,
        url: `/${locale}/catalog/sub-catalog?category=${encodeURIComponent(
          c.slug,
        )}`,
      }));
    },
    [fetchCategoryCached],
  );

  const buildCategoryTrail = useCallback(
    async (
      categories: any[] | undefined,
      locale: string,
      productName?: string,
      productId?: number,
    ) => {
      const trail: BreadcrumbItem[] = [];
      const homeUrl = locale === "ua" ? `/` : `/${locale}`;
      trail.push({ id: "home", name: "Головна", url: homeUrl });

      if (!categories || categories.length === 0) {
        setBreadcrumbs(trail);
        return trail;
      }

      let chosenCategoryId: number | null = null;

      if (categories.length === 1) {
        chosenCategoryId = categories[0].id;
      }

      if (chosenCategoryId) {
        const categoryPath = await getCategoryPath(
          Number(chosenCategoryId),
          locale,
        );

        const seen = new Set<number | string>();
        const uniquePath: BreadcrumbItem[] = [];

        for (const p of categoryPath) {
          if (!seen.has(p.id)) {
            uniquePath.push(p);
            seen.add(p.id);
          }
        }

        trail.push(...uniquePath);

        if (productName && productId) {
          trail.push({
            id: productId,
            name: productName,
            url: `/${locale}/catalog/sub-catalog/product/${productId}?category=${encodeURIComponent(
              categories.find((c) => c.id === chosenCategoryId)?.slug || "",
            )}`,
          });
        }
      }

      setBreadcrumbs(trail);
      return trail;
    },
    [getCategoryPath],
  );

  const clearBreadcrumbs = useCallback(() => setBreadcrumbs([]), []);

  return { breadcrumbs, setBreadcrumbs, buildCategoryTrail, clearBreadcrumbs };
}
