"use client";

import { Sidebar as FBSidebar } from "flowbite-react";
import styles from "../../../catalog/sub-catalog/Sub-catalog.module.css";
import React, { FC, useCallback, useState } from "react";
import classNames from "classnames";

import { fetchWooCommerceProductsBasedOnCategory } from "../../../../../utils/woocommerce.setup";
import { TransformedCategoriesType } from "@app/[locale]/catalog/sub-catalog/helpers";

type LeftSidebarProps = {
  items: TransformedCategoriesType[];
  setSelectedProducts?: (v: any[]) => void;
};

const Sidebar: FC<LeftSidebarProps> = ({ items, setSelectedProducts }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getCategoryDetails = useCallback(
    async (id: number) => {
      try {
        const data = await fetchWooCommerceProductsBasedOnCategory(id);

        console.log({ data });

        if (data) {
          setSelectedProducts?.(data);
        }
      } catch (e) {
        console.warn({ e });
      }
    },
    [setSelectedProducts],
  );

  // оця хуйня робить всю магію з створенням вкладених dropdown options
  const renderNestedCategories = (category: TransformedCategoriesType) => {
    return category.childrens.length === 0 ? (
      <FBSidebar.Item
        as="div"
        key={category.id}
        className={classNames("cursor-pointer", styles.subItem)}
        onClick={() => getCategoryDetails(category.id)}
      >
        {category.name}
      </FBSidebar.Item>
    ) : (
      <FBSidebar.Collapse
        label={category.name}
        key={category.id}
        className={classNames("", styles.subCollapse)}
      >
        {category.childrens.length
          ? category.childrens.map((child) => renderNestedCategories(child))
          : null}
      </FBSidebar.Collapse>
    );
  };

  return (
    <div
      className={classNames(
        "flex flex-1 flex-row justify-between self-center",
        styles.subCatalog,
      )}
    >
      <div className={classNames("mt-4", styles.subMenu)}>
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
