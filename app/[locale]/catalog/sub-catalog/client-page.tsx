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
import { AnimatePresence, motion } from "framer-motion";
import { SingleProductDetails } from "../../../../utils/woocomerce.types";

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

  const [details, setDetails] = useState<SingleProductDetails | null>(null);

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

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {typeof window !== "undefined" && isMobile ? (
        <>
          <div className={classNames("relative flex flex-1 flex-row justify-between self-center mb-5 ml-2", styles.subCatalog)}>
            <div className="flex-none">
              {/* Кнопка відкриття/закриття */}
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-8 h-8 flex items-center justify-center"
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="text-[#0061AA]"
                  initial={false}
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <rect
                    x="4"
                    y="4"
                    width="16"
                    height="16"
                    rx="4"
                    fill="none" // прозорий фон
                    stroke="currentColor" // колір рамки = text-gray-700
                    strokeWidth="2" // товщина контуру
                  />
                </motion.svg>

              </button>
            </div>
            <div className="flex flex-1">
              <h1 className="self-center text-[#002766] max-w-[85vw]">{breadcrumbs[breadcrumbs.length - 1]?.name}</h1>
            </div>
          </div>
          <div className="w-full h-auto">
            {/* Меню */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-1 top-[280px] w-[90vw] max-w-sm bg-white/50 text-[#0061AA] backdrop-blur-sm shadow-lg z-49 cursor-grab active:cursor-grabbing overflow-y-auto"
                >
                  <ol className="flex items-start flex-col text-sm ml-3">
                    {breadcrumbs.map((el, idx) => {
                      const isLast = idx === breadcrumbs.length - 1;
                      return (
                        <li key={el.id} className="flex flex-col items-start gap-1 p-1">

                          {isLast ? (
                            <span className="text-black"></span>
                          ) : (
                            <Link href={el.url} className="hover:underline">
                              {el.name}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ol>

                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
                          <img src={el.images[0].src} alt={el.images[0].alt} width={150} height={150} className="w-full h-auto" />
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
          </div></>

      ) : (
        <div className={classNames("flex flex-1 flex-col justify-between self-center mb-5", styles.subCatalog)}>
          <div className="mt-5 ml-4">
            <h1 className="text-[22px] font-bold text-[#002766] mb-2">{breadcrumbs[breadcrumbs.length - 1]?.name}</h1>
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
