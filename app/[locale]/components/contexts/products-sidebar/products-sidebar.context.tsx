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
} from "../../../catalog/sub-catalog/helpers";
import {
  SingleProductDetails,
  WoocomerceCategoryType,
} from "../../../../../utils/woocomerce.types";
import { useSearchParams } from "next/navigation";
import { getCategoriesIds } from "../../constants";

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

// Client-side cache
const categoriesCache = new Map<string, TransformedCategoriesType[]>();
const productsCache = new Map<string, SingleProductDetails[]>();

type SidebarProviderProps = {
  children: ReactNode;
  locale?: string;
  initialCategories?: TransformedCategoriesType[];
};

export const SidebarProvider = ({ children, locale, initialCategories }: SidebarProviderProps) => {
  const searchParams = useSearchParams();
  const selectedCategoryFromParams = searchParams?.get("category") ?? null;

  const defaultLocale = locale ?? "ua";

  const [selectedCategoryItem, setSelectedCategoryItem] = useState<string | null | undefined>(selectedCategoryFromParams);
  const [categories, setCategories] = useState<TransformedCategoriesType[]>(initialCategories ?? []);
  const [selectedProducts, setSelectedProducts] = useState<SingleProductDetails[]>([]);
  const [activeProduct, setActiveProduct] = useState<SingleProductDetails | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [openedCategoryIds, setOpenedCategoryIds] = useState<number[]>([]);

  const getCategoriesData = useCallback(async (localeParam: string = defaultLocale) => {
    const cacheKey = localeParam;

    if (categoriesCache.has(cacheKey)) {
      setCategories(categoriesCache.get(cacheKey)!);
      return;
    }

    // Skip fetch if initial categories were provided from server
    if (categories.length > 0) {
      categoriesCache.set(cacheKey, categories);
      return;
    }

    try {
      const res = await fetch(`/api/woocommerce/categories?locale=${encodeURIComponent(localeParam)}`);
      if (!res.ok) return;
      const raw = (await res.json()) as WoocomerceCategoryType[];
      const transformed = categoriesCreation(raw as unknown as TransformedCategoriesType[]);
      categoriesCache.set(cacheKey, transformed);
      setCategories(transformed);
    } catch {
      // categories fetch failed silently
    }
  }, [defaultLocale, categories]);

  const getCategoryDetails = useCallback(
    async (id: number, localeParam: string = defaultLocale) => {
      const cacheKey = `${localeParam}:${id}`;

      if (productsCache.has(cacheKey)) {
        setSelectedProducts(productsCache.get(cacheKey)!);
        return;
      }

      try {
        const res = await fetch(`/api/woocommerce/category-products?locale=${encodeURIComponent(localeParam)}&categoryId=${id}`);
        if (!res.ok) return;
        const data = (await res.json()) as SingleProductDetails[];
        productsCache.set(cacheKey, data);
        setSelectedProducts(data);
      } catch {
        // category products fetch failed silently
      }
    },
    [defaultLocale]
  );

  useEffect(() => {
    const idsMap = getCategoriesIds(defaultLocale) ?? {};
    const categoryId = selectedCategoryFromParams ? idsMap[selectedCategoryFromParams as keyof typeof idsMap] : null;
    setSelectedCategoryId(categoryId || null);

    if (categoryId) {
      getCategoryDetails(categoryId, defaultLocale);
    }
  }, [selectedCategoryFromParams, getCategoryDetails, defaultLocale]);

  useEffect(() => {
    getCategoriesData(defaultLocale);
  }, [getCategoriesData, defaultLocale]);

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
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider");
  return context;
};
