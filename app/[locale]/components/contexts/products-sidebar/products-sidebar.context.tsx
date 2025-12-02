"use client";

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  categoriesCreation,
  TransformedCategoriesType,
} from "@app/[locale]/catalog/sub-catalog/helpers";
import {
  SingleProductDetails,
  WoocomerceCategoryType,
} from "../../../../../utils/woocomerce.types";
import { useSearchParams } from "next/navigation";
import { getCategoriesIds } from "@app/[locale]/components/constants";

export type SidebarContextProps = {
  selectedCategory?: string | null;
  setSelectedCategory: (val: string | null | undefined) => void;
  categories: TransformedCategoriesType[];
  setCategories: (val: TransformedCategoriesType[]) => void;
  selectedProducts: SingleProductDetails[];
  setSelectedProducts: (val: SingleProductDetails[]) => void;
  getData: (locale: string) => Promise<void>;
  getCategoryDetails: (id: number, locale: string) => Promise<void>;

  selectedCategoryId: number | null;
  setSelectedCategoryId: (val: number | null) => void;

  openedCategoryIds: number[];
  setOpenedCategoryIds: Dispatch<SetStateAction<number[]>>;

  activeProduct: SingleProductDetails | null;
  setActiveProduct: (val: SingleProductDetails | null) => void;
};

export const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined,
);

// 🔹 Simple client-side caches so we don't refetch within one browser session
const categoriesCache = new Map<string, TransformedCategoriesType[]>();
const productsCache = new Map<string, SingleProductDetails[]>();

type SidebarProviderProps = {
  children: ReactNode;
  locale: string;
};

export const SidebarProvider = ({ children, locale }: SidebarProviderProps) => {
  const searchParams = useSearchParams();
  const selectedCategoryFromParams = searchParams?.get("category");

  const [selectedCategoryItem, setSelectedCategoryItem] = useState<
    string | null | undefined
  >(selectedCategoryFromParams);
  const [categories, setCategories] = useState<TransformedCategoriesType[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<
    SingleProductDetails[]
  >([]);
  const [activeProduct, setActiveProduct] =
    useState<SingleProductDetails | null>(null);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [openedCategoryIds, setOpenedCategoryIds] = useState<number[]>([]);

  // ✅ Load categories with client-side + server-side caching (via API route)
  const getCategoriesData = useCallback(async (localeParam: string) => {
    const cacheKey = localeParam;

    // 1) Client-side cache
    if (categoriesCache.has(cacheKey)) {
      setCategories(categoriesCache.get(cacheKey)!);
      return;
    }

    try {
      const res = await fetch(
        `/api/woocommerce/categories?locale=${encodeURIComponent(localeParam)}`,
      );

      if (!res.ok) {
        console.warn("Failed to fetch categories", res.status);
        return;
      }

      const raw = (await res.json()) as WoocomerceCategoryType[];
      const transformed = categoriesCreation(
        raw as unknown as TransformedCategoriesType[],
      );

      categoriesCache.set(cacheKey, transformed);
      setCategories(transformed);
    } catch (e) {
      console.warn("Error while fetching categories:", e);
    }
  }, []);

  // ✅ Load products for a category (using server-cached data via API route)
  const getCategoryDetails = useCallback(
    async (id: number, localeParam: string) => {
      const cacheKey = `${localeParam}:${id}`;

      if (productsCache.has(cacheKey)) {
        setSelectedProducts(productsCache.get(cacheKey)!);
        return;
      }

      try {
        const res = await fetch(
          `/api/woocommerce/category-products?locale=${encodeURIComponent(
            localeParam,
          )}&categoryId=${encodeURIComponent(String(id))}`,
        );

        if (!res.ok) {
          console.warn("Failed to fetch category products", res.status);
          return;
        }

        const data = (await res.json()) as SingleProductDetails[];

        productsCache.set(cacheKey, data);
        setSelectedProducts(data);
      } catch (e) {
        console.warn("Error while fetching category products:", e);
      }
    },
    [],
  );

  // 🔁 Sync selectedCategoryId + products with URL search param
  useEffect(() => {
    const idsMap = getCategoriesIds(locale) as
      | Record<string, number>
      | undefined;

    const categoryId = selectedCategoryFromParams
      ? idsMap?.[selectedCategoryFromParams]
      : null;

    setSelectedCategoryId(categoryId || null);

    if (categoryId) {
      getCategoryDetails(categoryId, locale);
    }
  }, [selectedCategoryFromParams, getCategoryDetails, locale]);

  // 🔁 Fetch categories on mount (once per locale thanks to cache)
  useEffect(() => {
    getCategoriesData(locale);
  }, [getCategoriesData, locale]);

  return (
    <SidebarContext.Provider
      value={{
        setSelectedProducts,
        selectedProducts,
        setSelectedCategory: setSelectedCategoryItem,
        selectedCategory: selectedCategoryItem,
        setCategories,
        categories,
        getData: getCategoriesData,
        getCategoryDetails,
        selectedCategoryId,
        setSelectedCategoryId,
        openedCategoryIds,
        setOpenedCategoryIds,
        activeProduct,
        setActiveProduct,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
