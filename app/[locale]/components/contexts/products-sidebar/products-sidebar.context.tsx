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

// Client-side cache
const categoriesCache = new Map<string, TransformedCategoriesType[]>();
const productsCache = new Map<string, SingleProductDetails[]>();

type SidebarProviderProps = {
  children: ReactNode;
  locale?: string;
};

export const SidebarProvider = ({ children, locale }: SidebarProviderProps) => {
  const searchParams = useSearchParams();
  const selectedCategoryFromParams = searchParams?.get("category") ?? null;

  const defaultLocale = locale ?? "ua"; // дефолт

 const [selectedCategoryItem, setSelectedCategoryItem] = useState<string | null | undefined>(null);(
    selectedCategoryFromParams
  );
  const [categories, setCategories] = useState<TransformedCategoriesType[]>([]);
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

    try {
      const res = await fetch(`/api/woocommerce/categories?locale=${encodeURIComponent(localeParam)}`);
      if (!res.ok) {
        console.warn("Failed to fetch categories", res.status);
        return;
      }
      const raw = (await res.json()) as WoocomerceCategoryType[];
      const transformed = categoriesCreation(raw as unknown as TransformedCategoriesType[]);
      categoriesCache.set(cacheKey, transformed);
      setCategories(transformed);
    } catch (e) {
      console.warn("Error while fetching categories:", e);
    }
  }, [defaultLocale]);

  const getCategoryDetails = useCallback(
    async (id: number, localeParam: string = defaultLocale) => {
      const cacheKey = `${localeParam}:${id}`;

      if (productsCache.has(cacheKey)) {
        setSelectedProducts(productsCache.get(cacheKey)!);
        return;
      }

      try {
        const res = await fetch(`/api/woocommerce/category-products?locale=${encodeURIComponent(localeParam)}&categoryId=${id}`);
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
