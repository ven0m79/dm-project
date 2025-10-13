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

export const ClientPage: FC<{ locale: string }> = ({ locale }) => {
  const {
    selectedProducts,
    setSelectedCategoryId,
    setOpenedCategoryIds,
    selectedCategory,
  } = useSidebar();

  const { breadcrumbs, buildCategoryTrail } = useBreadcrumbs();
  const currentIdsData = useMemo(() => getCategoriesIds(locale), [locale]);
  const isMobile = useIsMobile();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isIOS = typeof navigator !== "undefined" && /iPhone|iPad|iPod/i.test(navigator.userAgent);

  const categoryFromUrl = searchParams?.get("category") ?? "";
  const categoryId = useMemo(
    () => (currentIdsData as Record<string, number>)[categoryFromUrl],
    [categoryFromUrl, currentIdsData]
  );

  // ✅ Only UI state here (Provider fetches products by URL)
  useEffect(() => {
    if (!categoryId) return;
    setSelectedCategoryId(categoryId);
    setOpenedCategoryIds([categoryId]);
    buildCategoryTrail([{ id: categoryId } as any], locale);
  }, [categoryId, locale, setOpenedCategoryIds, setSelectedCategoryId, buildCategoryTrail]);

  // ✅ Memoize sorting
  const sortedProducts = useMemo(
    () => [...selectedProducts].sort((a, b) => a.name.localeCompare(b.name)),
    [selectedProducts]
  );

  const [visibleCount, setVisibleCount] = useState(15);
  const productsToRender = useMemo(
    () => sortedProducts.slice(0, visibleCount),
    [sortedProducts, visibleCount]
  );

  return (
    <>
      {/* Breadcrumbs */}
      <div className={classNames("mt-6 left-0 w-full", { "ml-0": isMobile, "ml-4": !isMobile })}>
        {isMobile ? (
          <MobileBreadcrumbs
            breadcrumbs={breadcrumbs}
            isIOS={isIOS}
            router={router}
            detailsName={breadcrumbs[breadcrumbs.length - 1]?.name}
          />
        ) : (
          <>
            <h1 className="text-[22px] font-bold text-[#002766] mb-2 ml-2">
              {breadcrumbs[breadcrumbs.length - 1]?.name}
            </h1>
            <DesktopBreadcrumbs breadcrumbs={breadcrumbs} isIOS={isIOS} router={router} />
          </>
        )}
      </div>

        <div className="flex flex-wrap justify-start self-start mt-4 mb-4 ml-2 items-start">
          {productsToRender?.length ? (
            productsToRender.map((el) => {
              const isAccessories = el.tags?.some((t) => t.name === "accessories");
              const cardClass = isAccessories
                ? `mx-1 sm:mx-2 ${styles.headSubCatalogBlockMini}`
                : `mx-1 sm:mx-7 ${styles.headSubCatalogBlock}`;

              const url = `/catalog/sub-catalog/product/${el.translations[locale as any]}?category=${encodeURIComponent(selectedCategory || "")}`;

              return (
                <div key={el.id} className={classNames("mb-5 flex flex-col justify-center items-center", cardClass)}>
                  <div className="w-full text-center">
                    <div className="cursor-pointer"
                      onClick={() => {
                        if (isIOS) router.push(url);
                        else window.location.href = url;
                      }}>
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
                      <div className="flex justify-center">
                        <h3 className="flex justify-center h-20 w-full px-2">{el.name}</h3>
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
    </>
  );
};