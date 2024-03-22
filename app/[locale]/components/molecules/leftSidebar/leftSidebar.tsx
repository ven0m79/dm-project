"use client";

import classNames from "classnames";
import { Sidebar as FBSidebar } from "flowbite-react";
import React, { FC, useCallback, useEffect } from "react";

import styles from "../../../catalog/sub-catalog/Sub-catalog.module.css";

import { fetchWooCommerceProductsBasedOnCategory } from "../../../../../utils/woocommerce.setup";
import { TransformedCategoriesType } from "@app/[locale]/catalog/sub-catalog/helpers";

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
  items: TransformedCategoriesType[];
  categoryTag?: string | null | keyof typeof categoriesIdData;
  setSelectedProducts?: (v: any[]) => void;
};

const Sidebar: FC<LeftSidebarProps> = ({
  items,
  categoryTag,
  setSelectedProducts,
}) => {
  const getCategoryDetails = useCallback(
    async (id: number) => {
      try {
        const data = await fetchWooCommerceProductsBasedOnCategory(id);

        if (data) {
          setSelectedProducts?.(data);
        }
      } catch (e) {
        console.warn({ e });
      }
    },
    [setSelectedProducts],
  );

  const renderNestedCategories = (
    category: TransformedCategoriesType,
    level = 0,
  ) => {
    const marginLeft = level === 0 || level === 1 ? 0 : level * 10;

    return category?.childrens?.length === 0 ? (
      <FBSidebar.Item
        as="div"
        key={category.id}
        className={classNames("cursor-pointer", styles.subItem)}
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
        className={classNames("", styles.subCollapse, {
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
        "flex flex-1 flex-row justify-between self-center",
        styles.subCatalog,
      )}
    >
      <div className={classNames("mt-4", styles.subMenu)}>
        {/*Оцю стилізувати*/}
        <h3 className="text-amber-700">{items?.[0]?.name}</h3>

        <FBSidebar aria-label="Catalog" className="">
          <FBSidebar.ItemGroup>
            {items?.map((el) => renderNestedCategories(el))}
          </FBSidebar.ItemGroup>
        </FBSidebar>
        <div className={classNames("", styles.subMenuDash)}></div>
      </div>
    </div>
  );
};

export default Sidebar;
