"use client";
import React, { FC, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { TransformedCategoriesType } from "@app/[locale]/catalog/sub-catalog/helpers";
import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";

type BreadcrumbsProps = {
  locale: string;
  categories: TransformedCategoriesType[];
  activeCategoryId?: number;
  activeProduct?: { name: string; slug: string };
};

const findCategoryPath = (
  categories: TransformedCategoriesType[],
  targetCategoryId?: number,
  parents: TransformedCategoriesType[] = []
): TransformedCategoriesType[] => {
  for (const cat of categories) {
    const newParents = [...parents, cat];

    if (cat.id === targetCategoryId) return newParents;

    if (cat.childrens?.length) {
      const path = findCategoryPath(cat.childrens, targetCategoryId, newParents);
      if (path.length > 0) return path;
    }
  }
  return [];
};

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  locale,
  categories,
  activeCategoryId,
  activeProduct,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();

  const categoryPath = useMemo(
    () => findCategoryPath(categories, activeCategoryId),
    [categories, activeCategoryId]
  );

  // Додаємо продукт, якщо ми на сторінці товару
  const fullPath =
    activeProduct && pathname?.startsWith("/catalog/sub-catalog/product")
      ? [...categoryPath, { name: activeProduct.name, slug: activeProduct.slug }]
      : categoryPath;

  if (!fullPath || fullPath.length <= 1) return null;

  // Відкидаємо перший елемент ("Каталог по призначенню")
  const trimmedPath = fullPath.slice(1);

  // --- Мобільний рендер ---
  if (isMobile) {
    const mobileItem =
      trimmedPath.length > 1
        ? trimmedPath[trimmedPath.length - 2] // остання клікабельна категорія перед товаром
        : trimmedPath[0];

    return (
      <nav className="text-sm breadcrumbs mb-1 mt-2 ml-2">
        <button
          className="underline text-blue-600 hover:text-blue-800"
          onClick={() =>
            router.push(`/catalog/sub-catalog?category=${(mobileItem as any).slug}`)
          }
        >
          {(mobileItem as any).name}
        </button>
      </nav>
    );
  }

  // --- Десктопний рендер ---
  return (
    <nav className="text-sm breadcrumbs mb-4 ml-6">
      {trimmedPath.map((item, idx) => {
        const isLast = idx === trimmedPath.length - 1;
        const slug = (item as any).slug;

        return (
          <span key={idx} className="text-blue-600">
            {!isLast ? (
              <button
                className="underline hover:text-blue-800"
                onClick={() => router.push(`/catalog/sub-catalog?category=${slug}`)}
              >
                {(item as any).name}
              </button>
            ) : (
              <span>{(item as any).name}</span>
            )}
            {!isLast && " / "}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
