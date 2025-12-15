"use client";

import classNames from "classnames";
import { CustomFlowbiteTheme, Sidebar as FBSidebar } from "flowbite-react";
import React, { FC, memo, useCallback, useMemo } from "react";
import styles from "../../../catalog/sub-catalog/Sub-catalog.module.css";
import { TransformedCategoriesType } from "@app/[locale]/catalog/sub-catalog/helpers";
import { usePathname, useRouter } from "../../../../../i18n/navigation";
import { useSidebar } from "@app/[locale]/components/contexts/products-sidebar/products-sidebar.context";
import {
  LEFT_BAR_PARENT_ID,
  LEFT_BAR_PARENT_ID_EN,
} from "@app/[locale]/components/constants";

const customTheme: CustomFlowbiteTheme = {
  sidebar: {
    root: {
      base: "h-full",
      inner:
        "h-fit w-[300px] overflow-y-auto overflow-x-hidden py-3 rounded-xl bg-white/30 dark:bg-white/30",
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

  // ✅ Беремо дані з контексту Sidebar
  const {
    categories,
    openedCategoryIds,
    selectedCategoryId,
    setSelectedCategoryId,
    setSelectedCategory,
    setOpenedCategoryIds,
  } = useSidebar();

  // ✅ Вибір "кореневих" елементів залежно від мови
  const items = useMemo(
    () => (locale === "ua" ? [categories?.[1] || []] : [categories?.[0] || []]),
    [categories, locale],
  );

  // ✅ Оновлений toggle
  const handleCollapseToggle = (category: TransformedCategoriesType) => {
    setSelectedCategoryId(category.id);
    setSelectedCategory(category.slug);

    setOpenedCategoryIds((prevOpenedIds) =>
      prevOpenedIds.includes(category.id)
        ? prevOpenedIds.filter((id) => id !== category.id)
        : [...prevOpenedIds, category.id],
    );
  };

  // ✅ Рекурсивний пошук всіх "батьківських" категорій
  const findParentCategories = useCallback(
    (
      cats: TransformedCategoriesType[],
      targetCategoryId: number,
      parents: TransformedCategoriesType[] = [],
    ): TransformedCategoriesType[] | null => {
      for (const category of cats) {
        if (category.id === targetCategoryId) {
          return parents;
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
                el.id !== LEFT_BAR_PARENT_ID && el.id !== LEFT_BAR_PARENT_ID_EN,
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

  // ✅ Кастомний порядок для першого рівня категорій
  const customFirstLevelOrder = useMemo(() => {
    const uaOrder = [
      "or-equipment",
      "icu-equipment",
      "neonatal-equipment",
      "cleaning-and-desinfecting-equipment",
      "gas-management-systems",
      "furniture",
      "mri-equipment",
      "accessories",
    ];

    const enOrder = [
      "or-equipment-en",
      "icu-equipment-en",
      "neonatal-equipment-en",
      "cleaning-and-desinfecting-equipment-en",
      "gas-management-systems-en",
      "furniture-en",
      "mri-equipment-en",
      "accessories-en",
    ];

    if (locale === "ua") return uaOrder;
    if (locale === "en") return enOrder;
    return [];
  }, [locale]);

  // ✅ Рекурсивний рендер категорій
  const renderNestedCategories = (
    category: TransformedCategoriesType,
    level = 0,
    topLevelKey?: number,
  ) => {
    const key = topLevelKey ?? category.id;
    const paddingLeft = level > 1 ? level * 7 : 0;

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

              if (changeURLParams) {
                router.push(
                  `${pathname.replace(/\/product\/\d+/, "")}?category=${category.slug}`,
                );
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
          category.id === LEFT_BAR_PARENT_ID ||
          category.id === LEFT_BAR_PARENT_ID_EN ||
          openedCategoryIds.includes(category.id) ||
          selectedItemsNestedData?.includes(Number(category.id))
        }
        label={category.name}
        key={key}
        className={classNames({
          "opacity-0 pointer-events-none mt-[-40px]":
            category.id === LEFT_BAR_PARENT_ID ||
            category.id === LEFT_BAR_PARENT_ID_EN,
          "bg-sky-200": selectedCategoryId === category.id,
        })}
        style={{ paddingLeft: `${paddingLeft}px` }}
        onClick={() => {
          handleCollapseToggle(category);

          if (changeURLParams) {
            router.push(
              `${pathname.replace(/\/product\/\d+/, "")}?category=${category.slug}`,
            );
          }

          if (fromProductPage) {
            router.push(`/catalog/sub-catalog?category=${category.slug}`);
          }
        }}
      >
        {category.childrens
          ?.sort((a, b) => {
            if (level === 0 && customFirstLevelOrder.length > 0) {
              const aIndex = customFirstLevelOrder.indexOf(a.slug);
              const bIndex = customFirstLevelOrder.indexOf(b.slug);
              return (
                (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex)
              );
            }
            return a.name.localeCompare(b.name);
          })
          .map((child) => renderNestedCategories(child, level + 1))}
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
      <div>
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
