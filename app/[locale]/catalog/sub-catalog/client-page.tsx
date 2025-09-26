"use client";

import classNames from "classnames";
import Link from "next/link";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";

import { fetchWooCommerceCategories } from "../../../../utils/woocommerce.setup";
import styles from "./Sub-catalog.module.css";
import { categoriesCreation, TransformedCategoriesType } from "./helpers";

import { useSidebar } from "@app/[locale]/components/contexts/products-sidebar/products-sidebar.context";
import { getCategoriesIds } from "@app/[locale]/components/constants";
import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";
import { useRouter, useSearchParams } from "next/navigation";
import { useBreadcrumbs } from "@app/[locale]/components/atoms/breadcrumbs/breadcrumbs";

type BreadcrumbItem = { id: number | string; name: string; url: string };

export const ClientPage: FC<{ locale: string }> = ({ locale }) => {
  const {
    selectedProducts,
    setCategories,
    selectedCategory,
    setSelectedCategoryId,
    getCategoryDetails,
    setOpenedCategoryIds,
  } = useSidebar();

  const { breadcrumbs, buildCategoryTrail } = useBreadcrumbs();

  const currentIdsData = useMemo(() => getCategoriesIds(locale), [locale]);
  const isMobile = useIsMobile();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isIOS = typeof window !== "undefined" && /iPhone|iPad|iPod/i.test(navigator.userAgent);

  const sortedProducts = [...selectedProducts].sort((a, b) => a.name.localeCompare(b.name));
  const [visibleCount, setVisibleCount] = useState(15);
  const productsToRender = useMemo(
    () => sortedProducts.slice(0, visibleCount),
    [sortedProducts, visibleCount]
  );

  const isAccessories = sortedProducts?.map((el) =>
    el.tags.map((el) => el.name).includes("accessories"),
  );
  const categoryFromUrl = searchParams?.get("category") ?? "";

  // підозра!!! - довбаний юз ефект з рекурсієй  
  const categoryId = useMemo(() => {
    return (currentIdsData as Record<string, number>)[categoryFromUrl];
  }, [categoryFromUrl, currentIdsData]);

  useEffect(() => {
    if (!categoryId) return;

    // виконуємо фетч товарів та оновлюємо контекст/крихти
    getCategoryDetails(categoryId, locale);
    setSelectedCategoryId(categoryId);
    setOpenedCategoryIds([categoryId]);
    buildCategoryTrail([{ id: categoryId } as any], locale);
  }, [categoryId, locale, getCategoryDetails, setOpenedCategoryIds, setSelectedCategoryId, buildCategoryTrail]);

  return (
    <>
      {typeof window !== "undefined" && isMobile ? (
        <div className={classNames("flex flex-1 flex-row justify-between self-center mb-5", styles.subCatalog)}>
          <div className="flex flex-wrap justify-start self-start mt-4 mb-4 mx-1 w-full items-start">
            {productsToRender?.length ? (
              productsToRender.map((el) => {
                // ... UI без змін
                return (
                  <div
                    key={el.id}
                    className={classNames(
                      "mx-1 mb-5 flex flex-col justify-center items-center",
                      isAccessories[0] ? styles.headSubCatalogBlockMini : styles.headSubCatalogBlock
                    )}
                  >
                    <div className="w-full">
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          const url = `/catalog/sub-catalog/product/${el.translations[locale as any]}?category=${encodeURIComponent(selectedCategory || "")}`;
                          if (isIOS) router.push(url);
                          else window.location.href = url;
                        }}
                      >
                        <div className="cursor-pointer flex justify-center">
                          <img src={el.images[0].src} alt={el.images[0].alt} width={isMobile ? 150 : 200} height={isMobile ? 150 : 200} className="w-full h-auto" />
                        </div>
                        <div className="h-px bg-emerald-900 mb-1 mx-1 flex self-center"></div>
                        <div className="flex justify-center">
                          <h3 className="flex justify-center h-16">{el.name}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2 className="text-amber-700"></h2>
            )}
          </div>
        </div>
      ) : (
        <div className={classNames("flex flex-1 flex-col justify-between self-center mb-5", styles.subCatalog)}>
          <div className="mt-5 ml-4">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
              <ol className="flex flex-wrap gap-1">
                {breadcrumbs.map((el, idx) => {
                  const isLast = idx === breadcrumbs.length - 1;
                  return (
                    <li key={el.id} className="flex items-center gap-1">
                      {idx > 0 && <span>/</span>}
                      {isLast ? (
                        <span className={styles.breadcrumbs}>{el.name}</span>
                      ) : (
                        <Link href={el.url} className="hover:underline">
                          {el.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>

          <div className="flex flex-wrap justify-start self-start mt-4 mb-4 mx-5 w-full max-w-[800px] items-start">
            {productsToRender?.length ? (
              productsToRender.map((el) => (
                <div
                  key={el.id}
                  className={classNames(
                    "mb-5 flex flex-col justify-center items-center",
                    isAccessories[0]
                      ? `mx-1 ${styles.headSubCatalogBlockMini}`
                      : `mx-5 ${styles.headSubCatalogBlock}`
                  )}
                >
                  <div className="w-full text-center">
                    <Link locale={locale} href={{ pathname: `/catalog/sub-catalog/product/${el.translations[locale as any]}`, query: `category=${selectedCategory}` }}>
                      <div className="cursor-pointer flex justify-center">
                        <img src={el.images[0].src} alt={el.images[0].alt} width={200} height={250} className="w-full h-auto" />
                      </div>
                      <div className="h-px bg-emerald-900 mb-1 mx-1 flex self-center"></div>
                      <div className="flex justify-center">
                        <h3 className="flex justify-center h-20 w-full px-2">{el.name}</h3>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <h2 className="text-amber-700"></h2>
            )}
          </div>
        </div>
      )}
      {sortedProducts.length > visibleCount && (
        <div className="flex flex-1 w-full self-center items-center justify-center">
          <button className={classNames("justify-center", styles.downloadable)} onClick={() => setVisibleCount(visibleCount + 15)}>
            Завантажити ще
          </button>
        </div>
      )}
    </>
  );
};
