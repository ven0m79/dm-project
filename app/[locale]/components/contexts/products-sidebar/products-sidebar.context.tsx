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
  fetchWooCommerceCategories,
  fetchWooCommerceProductsBasedOnCategory,
} from "../../../../../utils/woocommerce.setup";
import {
  categoriesCreation,
  TransformedCategoriesType,
} from "@app/[locale]/catalog/sub-catalog/helpers";
import { SingleProductDetails } from "../../../../../utils/woocomerce.types";
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
  undefined
);

export const SidebarProvider = ({ children, locale }: { children: ReactNode; locale: string }) => { // ✅ Додаємо locale
  const searchParams = useSearchParams();
  const selectedCategoryFromParams = searchParams?.get("category");

  const [selectedCategoryItem, setSelectedCategoryItem] = useState<
    string | null | undefined
  >(selectedCategoryFromParams);
  const [categories, setCategories] = useState<TransformedCategoriesType[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<
    SingleProductDetails[]
  >([]);
  const [activeProduct, setActiveProduct] = useState<SingleProductDetails | null>(null);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [openedCategoryIds, setOpenedCategoryIds] = useState<number[]>([]);

  const getCategoriesData = useCallback(async () => {
    try {
      const data = await fetchWooCommerceCategories(locale, { cache: "force-cache" });
      if (data) {
        setCategories(
          categoriesCreation(data as unknown as TransformedCategoriesType[])
        );
      }
    } catch (e) {
      console.warn({ e });
    }
  }, [locale]);
  
  const getCategoryDetails = useCallback(
    async (id: number, locale: string) => {
      try {
        const data = await fetchWooCommerceProductsBasedOnCategory(id, locale);
        if (data) {
          setSelectedProducts(data);
        }
      } catch (e) {
        console.warn({ e });
      }
    },
    [setSelectedProducts]
  );
  
  // useEffect для синхронізації activeCategoryId та завантаження продуктів
useEffect(() => {
  const categoryId = selectedCategoryFromParams
    ? getCategoriesIds(locale)?.[selectedCategoryFromParams as keyof typeof getCategoriesIds]
    : null;
  setSelectedCategoryId(categoryId || null);

  if (categoryId) {
    getCategoryDetails(categoryId, locale);
  }
}, [selectedCategoryFromParams, getCategoryDetails, locale]);

// getCategoriesData викликаємо один раз після завантаження компоненту
useEffect(() => {
  getCategoriesData();
}, [getCategoriesData]);

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