"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  fetchWooCommerceCategoryDetails,
  fetchWooCommerceProductDetails,
} from "../../../../../utils/woocommerce.setup";

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

  useEffect(() => {
    const buildBreadcrumbs = async () => {
      let trail: BreadcrumbItem[] = [{ id: 0, name: "Головна", url: `/${locale}` }];

      if (type === "product") {
        const product = await fetchWooCommerceProductDetails(id, locale);
        if (product && product.categories.length > 0) {
          const cat = product.categories[0];
          const catTrail = await getCategoryTrail(cat.id, locale);
          trail = [...trail, ...catTrail];
          trail.push({
            id: product.id,
            name: product.name,
            url: `/${locale}/catalog/sub-catalog/product/${product.id}`,
          });
        }
      }

      if (type === "category") {
        const catTrail = await getCategoryTrail(id, locale);
        trail = [...trail, ...catTrail];
      }

      setBreadcrumbs(trail);
    };

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

async function getCategoryTrail(categoryId: number, locale: string): Promise<BreadcrumbItem[]> {
  const trail: BreadcrumbItem[] = [];
  const category = await fetchWooCommerceCategoryDetails(categoryId, locale);

  if (!category) return trail;

  // Перевіряємо, чи поле custom_seo_description === "555444"
  const hasSeo = category.custom_seo_description === "555444";

  if (hasSeo) {
    trail.push({
      id: category.id,
      name: category.name,
      url: `/${locale}/catalog/sub-catalog/${category.id}`,
    });
  }

  // Якщо є parent → рекурсія
  if (category.parent > 0) {
    const parentTrail = await getCategoryTrail(category.parent, locale);
    return [...parentTrail, ...trail]; // формуємо шлях знизу вверх
  }

  return trail;
}
