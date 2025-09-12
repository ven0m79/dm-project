"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchWooCommerceCategoryDetails, fetchWooCommerceProductDetails } from "../../../../../utils/woocommerce.setup";

interface BreadcrumbItem {
  id: number;
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  type: "category" | "product";
  id: number;
  locale: string;
}

export default function Breadcrumbs({ type, id, locale }: BreadcrumbsProps) {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  console.log("[Breadcrumbs] Props:", { type, id, locale }); // додаємо лог

  useEffect(() => {
    console.log("[Breadcrumbs] useEffect викликано");

    async function buildBreadcrumbs() {
      let trail: BreadcrumbItem[] = [{ id: 0, name: "Головна", url: `/${locale}` }];
      console.log("[Breadcrumbs] Початковий trail:", trail);

      if (!type || !id) {
        console.warn("[Breadcrumbs] Некоректні props, не буду будувати breadcrumbs");
        return;
      }

      if (type === "product") {
        const product = await fetchWooCommerceProductDetails(id, locale);
        console.log("[Breadcrumbs] Продукт:", product);

        if (product && product.categories.length > 0) {
          const catTrail = await getFullCategoryTrail(product.categories[0].id, locale);
          trail = [...trail, ...catTrail];
          trail.push({
            id: product.id,
            name: product.name,
            url: `/${locale}/catalog/sub-catalog/product/${product.id}`,
          });
        }
      }

      if (type === "category") {
        const catTrail = await getFullCategoryTrail(id, locale);
        trail = [...trail, ...catTrail];
      }

      console.log("[Breadcrumbs] Фінальний trail перед setBreadcrumbs:", trail);
      setBreadcrumbs(trail);
    }

    buildBreadcrumbs();
  }, [type, id, locale]);

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-4">
      <ol className="flex flex-wrap gap-2">
        {breadcrumbs.map((el, idx) => (
          <li key={el.id} className="flex items-center gap-2">
            {idx > 0 && <span>/</span>}
            <Link href={el.url} className="hover:underline">
              {el.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Формує повний шлях категорії через поле "parent" до самого верху.
 */
async function getFullCategoryTrail(categoryId: number, locale: string): Promise<BreadcrumbItem[]> {
  const trail: BreadcrumbItem[] = [];
  let currentId: number | null = categoryId;

  console.log("[getFullCategoryTrail] Старт для categoryId:", categoryId);

  while (currentId) {
    let category;
    try {
      category = await fetchWooCommerceCategoryDetails(currentId, locale);
    } catch (err) {
      console.error("[getFullCategoryTrail] Помилка fetchWooCommerceCategoryDetails:", err);
      break;
    }

    if (!category) {
      console.warn("[getFullCategoryTrail] Категорія не знайдена для id:", currentId);
      break;
    }

    console.log("[getFullCategoryTrail] Поточна категорія:", category);

    // Додаємо поточну категорію в початок масиву
    trail.unshift({
      id: category.id,
      name: category.name,
      url: `/${locale}/catalog/sub-catalog/${category.id}`,
    });

    console.log("[getFullCategoryTrail] Поточний trail:", trail);

    // Переходимо до parent
    if (category.parent && category.parent !== 0) {
      currentId = category.parent;
    } else {
      currentId = null; // дійшли до верху
      console.log("[getFullCategoryTrail] Досягли верху, currentId:", currentId);
    }
  }

  console.log("[getFullCategoryTrail] Повертаємо trail:", trail);
  return trail;
}
