// app/[locale]/components/hooks/useBreadcrumbs.ts
import { useCallback, useRef, useState } from "react";
import { fetchWooCommerceCategoryDetails } from "../../../../../utils/woocommerce.setup";

export type BreadcrumbItem = { id: number | string; name: string; url: string };

/*побудова breadcrumbs.  */

export function useBreadcrumbs() {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const cacheRef = useRef<Map<number, any>>(new Map());

  const fetchCategoryCached = useCallback(async (id: number, locale: string) => {
    const cache = cacheRef.current;
    if (cache.has(id)) return cache.get(id);
    const cat = await fetchWooCommerceCategoryDetails(id, locale);
    cache.set(id, cat);
    return cat;
  }, []);

  const getCategoryPath = useCallback(
    async (categoryId: number, locale: string): Promise<BreadcrumbItem[]> => {
      const visited = new Set<number>();
      const stack: { id: number; name: string; slug: string }[] = [];

      let currentId: number | null = categoryId;
      while (currentId && !visited.has(currentId)) {
        visited.add(currentId);
        const cat = await fetchCategoryCached(currentId, locale);
        if (!cat) break;

        // Якщо верхній (root) — не додаємо його і зупиняємось
        if (cat.parent === 0) break;

        stack.push({ id: cat.id, name: cat.name, slug: cat.slug });
        currentId = cat.parent && cat.parent !== 0 ? cat.parent : null;
      }

      // stack = [leaf, parent, ...] -> треба перевернути, щоб з кореня до листка
      return stack
        .reverse()
        .map((c) => ({
          id: c.id,
          name: c.name,
          url: `/${locale}/catalog/sub-catalog?category=${encodeURIComponent(c.slug)}`,
        }));
    },
    [fetchCategoryCached]
  );

  /*   Побудувати trail   */
  const buildCategoryTrail = useCallback(
    async (categories: any[] | undefined, locale: string, productName?: string, productId?: number) => {
      const trail: BreadcrumbItem[] = [];
      const homeUrl = locale === "ua" ? `/` : `/${locale}`;
      trail.push({ id: "home", name: "Головна", url: homeUrl });

      if (!categories || categories.length === 0) {
        setBreadcrumbs(trail);
        return trail;
      }

      // 1) Спробуємо знайти категорію з custom_seo_description === '555444'
      let chosenCategoryId: number | null = null;

      if (categories.length === 1) {
        chosenCategoryId = categories[0].id;
      } else {
        // фетчимо деталі усіх категорій паралельно (але використовуємо кеш)
        const details = await Promise.all(
          categories.map((c) => fetchCategoryCached(Number(c.id), locale))
        );

        const special = details.find(
          (d) =>
            d &&
            Array.isArray(d.meta_data) &&
            d.meta_data.some((m: any) => String(m.key) === "custom_seo_description" && String(m.value).includes("555444"))
        );

        chosenCategoryId = special ? special.id : categories[0].id;
      }

      // 2) Отримуємо шлях від кореня до chosenCategory (skip top parent)
      if (chosenCategoryId) {
        const categoryPath = await getCategoryPath(Number(chosenCategoryId), locale);

        // Дедуплікація (щоб уникнути дублювань)
        const seen = new Set<number | string>();
        const uniquePath: BreadcrumbItem[] = [];
        for (const p of categoryPath) {
          if (!seen.has(p.id)) {
            uniquePath.push(p);
            seen.add(p.id);
          }
        }

        trail.push(...uniquePath);

        // 3) Додаємо сам продукт (як останній елемент, без посилання — це в компоненті вирішуємо)
        if (productName && productId) {
          trail.push({
            id: productId,
            name: productName,
            url: `/${locale}/catalog/sub-catalog/product/${productId}?category=${encodeURIComponent(
              (categories.find((c) => c.id === chosenCategoryId)?.slug || "")
            )}`,
          });
        }
      }

      setBreadcrumbs(trail);
      return trail;
    },
    [fetchCategoryCached, getCategoryPath]
  );

  const clearBreadcrumbs = useCallback(() => setBreadcrumbs([]), []);

  return { breadcrumbs, setBreadcrumbs, buildCategoryTrail, clearBreadcrumbs };
}
