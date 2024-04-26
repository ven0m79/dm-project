"use client";

import classNames from "classnames";
import { CustomFlowbiteTheme, Sidebar as FBSidebar } from "flowbite-react";
import { HiArrowSmRight, HiArrowDown, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import React, { FC, useCallback, useEffect } from "react";

import styles from "../../../catalog/sub-catalog/Sub-catalog.module.css";

import { fetchWooCommerceProductsBasedOnCategory } from "../../../../../utils/woocommerce.setup";
import { TransformedCategoriesType } from "@app/[locale]/catalog/sub-catalog/helpers";

const customTheme: CustomFlowbiteTheme = {
  root: {
    base: "h-full",
    collapsed: {
      on: "w-16",
      off: "w-64"
    },
    inner: "h-full overflow-y-auto overflow-x-hidden rounded bg-gray-50 px-2 py-1 dark:bg-gray-800"
  },
  collapse: {
    button: "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    icon: {
      base: "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
      open: {
        off: "",
        on: "text-gray-900"
      }
    },
    label: {
      base: "ml-3 flex-1 whitespace-nowrap text-left",
      icon: {
        base: "h-6 w-6 transition delay-0 ease-in-out",
        open: {
          on: "rotate-180",
          off: ""
        }
      }
    },
    list: "space-y-2 py-2"
  },
  cta: {
    base: "mt-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-700",
    color: {
      blue: "bg-cyan-50 dark:bg-cyan-900",
      dark: "bg-dark-50 dark:bg-dark-900",
      failure: "bg-red-50 dark:bg-red-900",
      gray: "bg-alternative-50 dark:bg-alternative-900",
      green: "bg-green-50 dark:bg-green-900",
      light: "bg-light-50 dark:bg-light-900",
      red: "bg-red-50 dark:bg-red-900",
      purple: "bg-purple-50 dark:bg-purple-900",
      success: "bg-green-50 dark:bg-green-900",
      yellow: "bg-yellow-50 dark:bg-yellow-900",
      warning: "bg-yellow-50 dark:bg-yellow-900"
    }
  },
  item: {
    base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    active: "bg-gray-100 dark:bg-gray-700",
    collapsed: {
      insideCollapse: "group w-full pl-8 transition duration-75",
      noIcon: "font-bold"
    },
    content: {
      base: "flex-1 whitespace-nowrap px-3"
    },
    icon: {
      base: "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
      active: "text-gray-700 dark:text-gray-100"
    },
    label: "",
    listItem: ""
  },
  items: {
    base: ""
  },
  itemGroup: {
    base: "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700"
  },
  logo: {
    base: "mb-5 flex items-center pl-2.5",
    collapsed: {
      on: "hidden",
      off: "self-center whitespace-nowrap text-xl font-semibold dark:text-white"
    },
    img: "mr-3 h-6 sm:h-7"
  }
};

const LEFT_BAR_PARENT_ID = 50;
const RIGHT_BAR_PARENT_ID = 55;

const categoriesIdData = {
  operations: 19,
  "intensive-therapy": 75,
  neonathal: 79,
  sterilization: 83,
  gaz: 87,
  furniture: 91,
  accessories: 95,
};

type LeftSidebarProps = {
  locale: string;
  items: TransformedCategoriesType[];
  categoryTag?: string | null | keyof typeof categoriesIdData;
  setSelectedProducts?: (v: any[]) => void;
};

const Sidebar: FC<LeftSidebarProps> = ({
  items,
  categoryTag,
  locale,
  setSelectedProducts,
}) => {
  const getCategoryDetails = useCallback(
    async (id: number) => {
      try {
        const data = await fetchWooCommerceProductsBasedOnCategory(id, locale);

        if (data) {
          setSelectedProducts?.(data);
        }
      } catch (e) {
        console.warn({ e });
      }
    },
    [locale, setSelectedProducts],
  );

  const renderNestedCategories = (
    category: TransformedCategoriesType,
    level = 0,
  ) => {
    const marginLeft = level === 0 || level === 1 ? 0 : level * 5;

    return category?.childrens?.length === 0 ? (
      <FBSidebar.Item
        as="div"
        key={category.id}
        className={classNames("cursor-pointer")}
        onClick={() => getCategoryDetails(category.id)}
      >
        <div style={{ marginLeft: marginLeft }}>{category.name}</div>
      </FBSidebar.Item>
    ) : (
      <FBSidebar.Collapse
        open={
          category.id === LEFT_BAR_PARENT_ID ||
          category.id === RIGHT_BAR_PARENT_ID ||
          category.id ===
          categoriesIdData[categoryTag as keyof typeof categoriesIdData]
        }
        label={category.name}
        key={category.id}
        className={classNames("", {
          "opacity-0 pointer-events-none mt-[-40px]":
            category.id === LEFT_BAR_PARENT_ID ||
            category.id === RIGHT_BAR_PARENT_ID,
        })}
      >
        {category?.childrens?.length
          ? category.childrens.map((child) =>
            renderNestedCategories(child, level + 1),
          )
          : null}
      </FBSidebar.Collapse>
    );
  };

  useEffect(() => {
    if (
      categoriesIdData?.[
      categoryTag as unknown as keyof typeof categoriesIdData
      ]
    ) {
      getCategoryDetails(
        categoriesIdData?.[
        categoryTag as unknown as keyof typeof categoriesIdData
        ],
      );
    }
  }, [categoryTag, getCategoryDetails]);

  return (
    <div
      className={classNames(
        "flex flex-1 flex-row justify-between",
        styles.subCatalog,
      )}
    >
      <div>
        {/*Оцю стилізувати*/}
        <h3 className="text-blue-950 ml-5 font-bold mt-5">{items?.[0]?.name}</h3>

        <FBSidebar aria-label="Catalog" className="" theme={customTheme.sidebar}>
          <FBSidebar.ItemGroup>
            {items?.map((el) => renderNestedCategories(el))}
          </FBSidebar.ItemGroup>
        </FBSidebar>
      </div>
    </div>
  );
};

export default Sidebar;
