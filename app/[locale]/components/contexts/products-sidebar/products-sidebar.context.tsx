import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
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

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
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
    null,
  );
  const [openedCategoryIds, setOpenedCategoryIds] = useState<number[]>([]);

  const getData = useCallback(async (locale: string) => {
    try {
      const data = await fetchWooCommerceCategories(locale);

      if (data) {
        setCategories(
          categoriesCreation(data as unknown as TransformedCategoriesType[]),
        );
      }
    } catch (e) {
      console.warn({ e });
    }
  }, []);

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
    [setSelectedProducts],
  );

  return (
    <SidebarContext.Provider
      value={{
        setSelectedProducts,
        selectedProducts,
        setSelectedCategory: setSelectedCategoryItem,
        selectedCategory: selectedCategoryItem,
        setCategories,
        categories,
        getData,
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
