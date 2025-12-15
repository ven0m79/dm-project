"use client";

import classNames from "classnames";
import { CustomFlowbiteTheme, Sidebar as FBSidebar } from "flowbite-react";
import React, { FC, memo, useCallback, useMemo } from "react";
import styles from "../../../catalog/sub-catalog/Sub-catalog.module.css";
import { TransformedCategoriesType } from "@app/[locale]/catalog/sub-catalog/helpers";
import { usePathname, useRouter } from "../../../../../i18n/navigation";
import { useSidebar } from "@app/[locale]/components/contexts/products-sidebar/products-sidebar.context";
import {
  RIGHT_BAR_PARENT_ID,
  RIGHT_BAR_PARENT_ID_EN,
} from "@app/[locale]/components/constants";

const customTheme: CustomFlowbiteTheme = {
  sidebar: {
    root: {
      base: "h-full",
      inner:
        "h-fit w-[300px] overflow-y-auto overflow-x-hidden py-3 rounded-xl bg-white/30 dark:bg-white/30 pt-14 -mt-10",
    },
    collapse: {
      button:
        "group flex w-full items-center rounded-lg p-1 text-base font-normal text-[#0061AA] transition duration-75 hover:bg-[#0061aa10] dark:text-[#0061AA] dark:hover:bg-gray-700",
      icon: {
        base: "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
        open: {
          off: "",
          on: "text-gray-900",
        },
      },
      label: {
        base: "ml-3 flex-1 whitespace-normal text-left",
        icon: {
          base: "h-6 w-6 transition delay-0 ease-in-out",
          open: {
            on: "rotate-180",
            off: "",
          },
        },
      },
      list: "space-y-2 py-2",
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
        warning: "bg-yellow-50 dark:bg-yellow-900",
      },
    },
    item: {
      base: "flex items-center justify-center rounded-lg text-base font-normal text-[#0061AA] hover:bg-gray-100",
      active: "text-red-500 bg-gray-100 dark:bg-gray-700",
      collapsed: {
        insideCollapse: "group w-full pl-8 transition duration-75",
        noIcon: "font-bold",
      },
      content: {
        base: "flex-1 whitespace-normal px-3",
      },
      icon: {
        base: "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
        active: "text-gray-700 dark:text-gray-100",
      },
      label: "",
      listItem: "",
    },
    items: {
      base: "",
    },
    itemGroup: {
      base: "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700",
    },
    logo: {
      base: "mb-5 flex items-center pl-2.5",
      collapsed: {
        on: "hidden",
        off: "self-center whitespace-nowrap text-xl font-semibold dark:text-white",
      },
      img: "mr-3 h-6 sm:h-7",
    },
  },
};

type SidebarProps = {
  locale: string;
  changeURLParams?: boolean;
  fromProductPage?: boolean;
};

const Content: FC<SidebarProps> = ({
  locale,
  changeURLParams,
  fromProductPage,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    categories,
    openedCategoryIds,
    selectedCategoryId,
    setSelectedCategoryId,
    setSelectedCategory,
    setOpenedCategoryIds,
  } = useSidebar();

  const items = useMemo(
    () => (locale === "ua" ? [categories?.[0] || []] : [categories?.[1] || []]),
    [categories, locale],
  );

  // ✅ Перевірка на iOS (щоб вирішити як робити навігацію)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);


  // ✅ Створюємо швидкий lookup Map для категорій
  const categoriesMap = useMemo(() => {
    const map = new Map<number, TransformedCategoriesType>();

    const traverse = (cats: TransformedCategoriesType[]) => {
      cats.forEach((cat) => {
        map.set(cat.id, cat);
        if (cat.childrens?.length) {
          traverse(cat.childrens);
        }
      });
    };

    if (items?.length) traverse(items);

    return map;
  }, [items]);

  // ✅ Оновлений toggle (без findCategoryById, тільки через categoriesMap)
  const handleCollapseToggle = (category: TransformedCategoriesType) => {
    // Встановлюємо id для виділення
    setSelectedCategoryId(category.id);
    // Встановлюємо slug або name як поточну категорію
    setSelectedCategory(category.slug); // або category.name, якщо потрібна назва

    // Тогл відкриття / закриття
    setOpenedCategoryIds((prevOpenedIds) =>
      prevOpenedIds.includes(category.id)
        ? prevOpenedIds.filter((id) => id !== category.id)
        : [...prevOpenedIds, category.id],
    );
    // НЕ викликаємо getCategoryDetails і НЕ змінюємо URL тут
    // Навігацію робимо тільки в місці, де потрібно (нижче — у клику по leaf)
  };

  const findParentCategories = useCallback(
    (
      categories: TransformedCategoriesType[],
      targetCategoryId: number,
      parents: TransformedCategoriesType[] = [],
    ): TransformedCategoriesType[] | null => {
      for (const category of categories) {
        if (category.id === targetCategoryId) {
          return parents; // Знайшли — повертаємо список батьків
        }

        if (category.childrens && category.childrens.length > 0) {
          const foundParents = findParentCategories(
            category.childrens,
            targetCategoryId,
            [...parents, category],
          );

          if (foundParents) {
            return foundParents.filter(
              (el) =>
                el.id !== RIGHT_BAR_PARENT_ID && el.id !== RIGHT_BAR_PARENT_ID_EN,
            );
          }
        }
      }

      return null;
    },
    [],
  );

  // ✅ Список id усіх parent-ів для розкриття потрібних Collapse
  const selectedItemsNestedData = useMemo(() => {
    return findParentCategories(items, Number(selectedCategoryId))?.map(
      (el) => el.id,
    );
  }, [findParentCategories, items, selectedCategoryId]);

  // ✅ Рекурсивний рендер категорій
  const renderNestedCategories = (
    category: TransformedCategoriesType,
    level = 0, // Level starts at 0 for root
    topLevelKey?: number,
  ) => {
    // Apply padding starting from level 2
    const key = topLevelKey ?? category.id;
    const paddingLeft = level > 1 ? level * 7 : 0; // No padding for level 0 and level 1

    // 🔹 Якщо категорія без дітей → Item
    if (!category.childrens?.length) {
      return (
        <FBSidebar.Item
          as="div"
          key={category.id}
          className={classNames("cursor-pointer", {
            "bg-sky-200": selectedCategoryId === category.id,
          })}
          style={{ paddingLeft: `${paddingLeft}px` }}
        >
          <div
            onClick={() => {
              handleCollapseToggle(category);

              // 🔹 Використовуємо slug вибраної категорії
              if (changeURLParams) {
                router.push(`${pathname.replace(/\/product\/\d+/, "")}?category=${category.slug}`);
              }

              if (fromProductPage) {
                router.push(`/catalog/sub-catalog?category=${category.slug}`);
              }
            }}
          >
            {category.name}
          </div>

        </FBSidebar.Item>
      );
    }

    // 🔹 Якщо є діти → Collapse
    return (
      <FBSidebar.Collapse
        open={
          category.id === RIGHT_BAR_PARENT_ID ||
          category.id === RIGHT_BAR_PARENT_ID_EN ||
          openedCategoryIds.includes(category.id) ||
          selectedItemsNestedData?.includes(Number(category.id))
        }
        label={category.name}
        key={category.id}
        className={classNames({
          "opacity-0 pointer-events-none mt-[-40px]":
            category.id === RIGHT_BAR_PARENT_ID ||
            category.id === RIGHT_BAR_PARENT_ID_EN,
          "bg-sky-200": selectedCategoryId === category.id,
        })}
        style={{ paddingLeft: `${paddingLeft}px` }}
        onClick={() => {
          handleCollapseToggle(category);

          // 🔹 Додаємо зміну URL для категорій з підкатегоріями
          if (changeURLParams) {
            router.push(`${pathname.replace(/\/product\/\d+/, "")}?category=${category.slug}`);
          }

          if (fromProductPage) {
            router.push(`/catalog/sub-catalog?category=${category.slug}`);
          }
        }}
      >{/* Recursively render children */}
        {category?.childrens?.length
          ? category.childrens.map(
            (child) => renderNestedCategories(child, level + 1), // Increase level for deeper nesting
          )
          : null}
      </FBSidebar.Collapse>
    );
  };

  return (
    <div
      className={classNames(
        "flex flex-1 flex-row justify-between",
        styles.subMenu,
      )}
    >
      <div className="">
        {/* 🔹 Заголовок (назва кореневого елементу) */}
        <h3 className="text-blue-950 ml-5 font-bold mt-5">
          {items?.[0]?.name}
        </h3>

        <FBSidebar aria-label="Catalog" theme={customTheme.sidebar}>
          <FBSidebar.ItemGroup>
            {items?.map((el) => renderNestedCategories(el, 0, el.id))}
          </FBSidebar.ItemGroup>
        </FBSidebar>
      </div>
    </div>
  );
};

const Sidebar: FC<SidebarProps> = (props) => <Content {...props} />;

export default memo(Sidebar);
