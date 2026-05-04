"use client";

import { FC, useMemo, useState, useEffect } from "react";
import CatalogSkeleton from "./CatalogSkeleton";
import classNames from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import { useSidebar } from "../../components/contexts/products-sidebar/products-sidebar.context";
import styles from "./Sub-catalog.module.css";
import { getCategoriesIds } from "../../components/constants";
import Image from "next/image";
import { TransformedCategoriesType } from "./helpers";
import { isIOS } from "../../../../utils/constants";
import type { SingleProductDetails } from "../../../../utils/woocomerce.types";

type SortMode = "order" | "az" | "za";

type Props = {
  locale: string;
  initialProducts?: SingleProductDetails[];
  initialCategorySlug?: string;
};

export const ClientPage: FC<Props> = ({ locale, initialProducts, initialCategorySlug }) => {
  const {
    selectedProducts,
    setSelectedCategoryId,
    setOpenedCategoryIds,
    getCategoryDetails,
    categories,
    selectedCategory,
  } = useSidebar();

  const currentIdsData = useMemo(() => getCategoriesIds(locale), [locale]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryFromUrl = searchParams?.get("category") ?? initialCategorySlug ?? "";
  const categoryId = useMemo(
    () => (currentIdsData as Record<string, number>)[categoryFromUrl],
    [categoryFromUrl, currentIdsData],
  );

  useEffect(() => {
    if (!categoryId) return;
    setSelectedCategoryId(categoryId);
    setOpenedCategoryIds([categoryId]);
    getCategoryDetails(categoryId, locale);
  }, [categoryId, locale, getCategoryDetails, setOpenedCategoryIds, setSelectedCategoryId]);

  // Use sidebar products once loaded; fall back to SSR-provided initialProducts
  const effectiveProducts = selectedProducts.length > 0 ? selectedProducts : (initialProducts ?? []);

  const [sortMode, setSortMode] = useState<SortMode>("order");

  const normalizeOrder = (order?: number) =>
    !order || order === 0 ? Number.MAX_SAFE_INTEGER : order;

  const sortedProducts = useMemo(() => {
    return [...effectiveProducts].sort((a, b) => {
      const aIsAccessories = a.tags?.some((t) => t.name === "accessories");
      const bIsAccessories = b.tags?.some((t) => t.name === "accessories");

      if (aIsAccessories !== bIsAccessories) return aIsAccessories ? 1 : -1;

      if (sortMode === "order") return normalizeOrder(a.menu_order) - normalizeOrder(b.menu_order);
      if (sortMode === "za") return b.name.localeCompare(a.name);
      return a.name.localeCompare(b.name);
    });
  }, [effectiveProducts, sortMode]);

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

  const categoriesNameMap = useMemo(() => {
    const map = new Map<number, string>();
    const traverse = (cats: TransformedCategoriesType[]) => {
      cats.forEach((cat) => {
        map.set(cat.id, cat.name || "");
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

  const selectedCategoryName = useMemo(() => {
    if (!categoryId) return selectedCategory ?? "";
    return categoriesNameMap.get(categoryId) || selectedCategory;
  }, [categoryId, categoriesNameMap, selectedCategory]);

  if (!effectiveProducts.length) {
    return <CatalogSkeleton />;
  }

  const SORT_OPTIONS: { value: SortMode; label: string }[] = [
    { value: "order", label: "По порядку" },
    { value: "az",    label: "А → Я" },
    { value: "za",    label: "Я → А" },
  ];

  return (
    <>
      <h1 className="flex flex-wrap justify-center self-start mt-4 mb-4 ml-2 text-[#002766]">{selectedCategoryName}</h1>

      <div className="flex items-center gap-2 ml-2 mb-3">
        <select
          value={sortMode}
          onChange={(e) => { setSortMode(e.target.value as SortMode); setVisibleCount(15); }}
          className="text-sm text-[#0061AA] border border-[#0061AA] rounded px-2 py-1 bg-white cursor-pointer outline-none focus:ring-1 focus:ring-[#0061AA]"
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap justify-start self-start mt-4 mb-4 ml-2 items-start">
        {productsToRender.map((el, index) => {
          const isAccessories = el.tags?.some((t) => t.name === "accessories");
          const cardClass = isAccessories
            ? `mx-1 sm:mx-2 ${styles.headSubCatalogBlockMini}`
            : `mx-1 sm:mx-6 ${styles.headSubCatalogBlock}`;

          const prefix = locale === "en" ? "/en" : "";
          const url = `${prefix}/catalog/sub-catalog/product/${el.translations[locale as any]}?category=${encodeURIComponent(
            selectedCategory || categoryFromUrl || "",
          )}`;

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
                      fetchPriority={index < 6 ? "high" : "auto"}
                      className="w-full h-auto object-contain"
                      sizes="(max-width: 640px) calc(50vw - 20px), 200px"
                      priority={index < 6}
                    />
                  </div>
                  <div className="h-px bg-emerald-900 mb-1 mx-1 flex self-center" />
                  <div className="p-1 grow flex items-center justify-center">
                    <p className="text-center text-sm font-normal text-[#0061AA] line-clamp-2 hover:text-[#004a80] transition-colors h-10">
                      {el.name}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    {el.price && (
                      <span className="font-bold text-[#002766] text-sm text-center">
                        {el.sku && /\s|,|;/.test(el.sku) ? "Від " : " "} {String(el.price).replace(".", ",")} грн
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

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
      <p
        className="content text-[#0077d2] text-[15px] leading-relaxed p-2 text-justify"
        suppressHydrationWarning
        style={{ textIndent: "15px" }}
        dangerouslySetInnerHTML={{ __html: categoryDescription || "" }}
      />
    </>
  );
};
