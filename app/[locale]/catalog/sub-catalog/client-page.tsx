"use client";

import classNames from "classnames";
import Link from "next/link";
import React, { FC, useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { useSidebar } from "@app/[locale]/components/contexts/products-sidebar/products-sidebar.context";
import { useBreadcrumbs } from "@app/[locale]/components/atoms/breadcrumbs/breadcrumbs";
import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";

import { fetchWooCommerceCategories } from "../../../../utils/woocommerce.setup";
import styles from "./Sub-catalog.module.css";
import { TransformedCategoriesType } from "./helpers";
import { getCategoriesIds } from "@app/[locale]/components/constants";
import { SingleProductDetails } from "../../../../utils/woocomerce.types";

import MobileBreadcrumbs from "./product/[productId]/MobileBreadcrumbs";
import DesktopBreadcrumbs from "./product/[productId]/DesktopBreadcrumbs";

export const ClientPage: FC<{ locale: string }> = ({ locale }) => {
  const {
    selectedProducts,
    setSelectedCategoryId,
    getCategoryDetails,
    setOpenedCategoryIds,
    selectedCategory,
    categories,
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

  const categoryFromUrl = searchParams?.get("category") ?? "";
  const categoryId = useMemo(() => (currentIdsData as Record<string, number>)[categoryFromUrl], [categoryFromUrl, currentIdsData]);

  useEffect(() => {
    if (!categoryId) return;
    getCategoryDetails(categoryId, locale);
    setSelectedCategoryId(categoryId);
    setOpenedCategoryIds([categoryId]);
    buildCategoryTrail([{ id: categoryId } as any], locale);
  }, [categoryId, locale, getCategoryDetails, setOpenedCategoryIds, setSelectedCategoryId, buildCategoryTrail]);

  const categoriesDescriptionMap = useMemo(() => {
    const map = new Map<number, string>();
    const traverse = (cats: TransformedCategoriesType[]) => {
      cats.forEach(cat => {
        map.set(cat.id, cat.description || "");
        if (cat.childrens?.length) traverse(cat.childrens);
      });
    };
    if (categories?.length) traverse(categories);
    return map;
  }, [categories]);

  const categoryDescription = useMemo(() => {
    if (!categoryId) return "";
    return categoriesDescriptionMap.get(categoryId) || "";
  }, [categoryId, categoriesDescriptionMap]);

  const [isOpen, setIsOpen] = useState(false);
  const isAccessories = sortedProducts?.map((el) => el.tags.map((t) => t.name).includes("accessories"));

  return (
    <>
      {/* Breadcrumbs */}
      <h1 className="text-[22px] font-bold text-[#002766] mb-2 ml-2">{breadcrumbs[breadcrumbs.length - 1]?.name}</h1>
      <div className={classNames("mt-5", { "ml-2": isMobile, "ml-4": !isMobile })}>
        {isMobile ? (
          <MobileBreadcrumbs breadcrumbs={breadcrumbs} isIOS={isIOS} router={router} detailsName={breadcrumbs[breadcrumbs.length - 1]?.name} />
        ) : (
          <DesktopBreadcrumbs breadcrumbs={breadcrumbs} isIOS={isIOS} router={router} />
        )}
      </div>

      {/* Products */}
      <div className="flex flex-wrap justify-start self-start mt-4 mb-4 mx-1 w-full items-start">
        {productsToRender?.length ? (
          productsToRender.map((el) => (
            <div
              key={el.id}
              className={classNames(
                "mb-5 flex flex-col justify-center items-center",
                isAccessories[0] ? `mx-1 ${styles.headSubCatalogBlockMini}` : `mx-5 ${styles.headSubCatalogBlock}`
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

      {/* Load more */}
      {sortedProducts.length > visibleCount && (
        <div className="flex flex-1 w-full self-center items-center justify-center">
          <button className={classNames("justify-center", styles.downloadable)} onClick={() => setVisibleCount(visibleCount + 15)}>
            Завантажити ще
          </button>
        </div>
      )}

      {/* Category description */}
      <p
        className="content text-[#0077d2] text-[15px] leading-[1.5] p-2 text-justify"
        suppressHydrationWarning
        style={{ textIndent: "15px" }}
        dangerouslySetInnerHTML={{ __html: categoryDescription || "" }}
      />
    </>
  );
};
