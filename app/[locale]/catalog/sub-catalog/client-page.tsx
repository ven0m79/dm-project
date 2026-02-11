// app/[locale]/catalog/sub-catalog/client-page.tsx
"use client";
import React, { FC, useMemo, useState, useEffect } from "react";
import classNames from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import { useSidebar } from "@app/[locale]/components/contexts/products-sidebar/products-sidebar.context";
import { useBreadcrumbs } from "@app/[locale]/components/atoms/breadcrumbs/breadcrumbs";
import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";
import styles from "./Sub-catalog.module.css";
import { getCategoriesIds } from "@app/[locale]/components/constants";
import MobileBreadcrumbs from "./product/[productId]/MobileBreadcrumbs";
import DesktopBreadcrumbs from "./product/[productId]/DesktopBreadcrumbs";
import Image from "next/image";
import { TransformedCategoriesType } from "./helpers";
import { isIOS } from "../../../../utils/constants";

export const ClientPage: FC<{ locale: string }> = ({ locale }) => {
  const {
    selectedProducts,
    setSelectedCategoryId,
    setOpenedCategoryIds,
    categories,
    selectedCategory,
  } = useSidebar();

  const currentIdsData = useMemo(() => getCategoriesIds(locale), [locale]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryFromUrl = searchParams?.get("category") ?? "";
  const categoryId = useMemo(
    () => (currentIdsData as Record<string, number>)[categoryFromUrl],
    [categoryFromUrl, currentIdsData],
  );

  // ✅ Only UI state here (Provider fetches products by URL)
  useEffect(() => {
    if (!categoryId) return;
    setSelectedCategoryId(categoryId);
    setOpenedCategoryIds([categoryId]);
  }, [categoryId, locale, setOpenedCategoryIds, setSelectedCategoryId]);

  // ✅ Memoize sorting
  const sortedProducts = useMemo(
    () => [...selectedProducts].sort((a, b) => a.name.localeCompare(b.name)),
    [selectedProducts],
  );

  const [visibleCount, setVisibleCount] = useState(15);
  const productsToRender = useMemo(
    () => sortedProducts.slice(0, visibleCount),
    [sortedProducts, visibleCount],
  );

  const categoriesDescriptionMap = useMemo(() => {
    const map = new Map<number, string>();
    const traverse = (cats: TransformedCategoriesType[]) => {
      cats.forEach((cat) => {
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

  return (

    <>
      <div className="flex flex-wrap justify-start self-start mt-4 mb-4 ml-2 items-start">
        {productsToRender?.length ? (
          productsToRender.map((el) => {
            const isAccessories = el.tags?.some(
              (t) => t.name === "accessories",
            );
            const cardClass = isAccessories
              ? `mx-1 sm:mx-2 ${styles.headSubCatalogBlockMini}`
              : `mx-1 sm:mx-6 ${styles.headSubCatalogBlock}`;

            const url = `/catalog/sub-catalog/product/${el.translations[locale as any]}?category=${encodeURIComponent(selectedCategory || "")}`;

            return (
              <div
                key={el.id}
                className={classNames(
                  "mb-5 flex flex-col justify-center items-center",
                  cardClass,
                )}
              >
                <div className="w-full text-center">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      if (isIOS) router.push(url);
                      else window.location.href = url;
                    }}
                  >
                    <div className="w-full px-2">
                      {el.sku.length > 7 ? `${el.sku.slice(0, 7)}..` : el.sku}
                    </div>
                    <div className="cursor-pointer flex justify-center">
                      <Image
                        src={el.images[0].src}
                        alt={el.images[0].alt}
                        width={200}
                        height={250}
                        fetchPriority="high"
                        className="w-full h-auto object-contain"
                        sizes="(max-width: 768px) 200px, (max-width: 1200px) 400px, 800px" // ✅ адаптивність
                        priority // тільки перше зображення для LCP
                      />
                    </div>
                    <div className="h-px bg-emerald-900 mb-1 mx-1 flex self-center" />
                    <div className="p-1 grow flex items-center justify-center">
                      <p className="text-center text-sm font-normal text-[#0061AA] line-clamp-2 hover:text-[#004a80] transition-colors">
                        {el.name}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      {el.price && (
                        <span className="font-bold text-[#002766] text-sm text-center">

                          {el.sku && /\s|,|;/.test(el.sku)
                            ? "Від "
                            : " "}
                          {" "}
                          {String(el.price).replace(".", ",")} грн
                        </span>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h2 className="text-amber-700" />
        )}
      </div>

      {/* Load more */}
      {sortedProducts.length > visibleCount && (
        <div className="flex flex-1 w-full self-center items-center justify-center">
          <button
            className={classNames("justify-center", styles.downloadable)}
            onClick={() => setVisibleCount((v) => v + 15)}
          >
            Завантажити ще
          </button>
        </div>
      )}
      {/* Category description */}
      <p
        className="content text-[#0077d2] text-[15px] leading-relaxed p-2 text-justify"
        suppressHydrationWarning
        style={{ textIndent: "15px" }}
        dangerouslySetInnerHTML={{ __html: categoryDescription || "" }}
      />
    </>
  );
};
