"use client";
import classNames from "classnames";
import Link from "next/link";
import React, { FC, useCallback, useEffect, useMemo } from "react";

import { fetchWooCommerceCategories } from "../../../../utils/woocommerce.setup";
import styles from "./Sub-catalog.module.css";
import { categoriesCreation, TransformedCategoriesType } from "./helpers";

import { useSidebar } from "@app/[locale]/components/contexts/products-sidebar/products-sidebar.context";
import { getCategoriesIds } from "@app/[locale]/components/constants";

export const ClientPage: FC<{locale: string, selectedCategory: string}> = ({locale, selectedCategory}) => {
  const {
    selectedProducts,
    setCategories,
    selectedCategory,
    setSelectedCategoryId,
    getCategoryDetails,
    setOpenedCategoryIds,
    openedCategoryIds,
  } = useSidebar();

  const currentIdsData = useMemo(() => getCategoriesIds(locale), [locale]);

  const getData = useCallback(async () => {
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
  }, [locale, setCategories]);

  useEffect(() => {
    getData();
  }, [getData, locale]);

  const isAccessories = selectedProducts?.map((el) =>
    el.tags.map((el) => el.name).includes("accessories"),
  );

  useEffect(() => {
   
    if (selectedCategory && openedCategoryIds.length === 0) {
      console.log(selectedCategory)
      // @ts-ignore
      const categoryId = currentIdsData?.[selectedCategory];

      if (categoryId) {
        getCategoryDetails(categoryId, locale);
        setSelectedCategoryId(categoryId);
        setOpenedCategoryIds([categoryId]);
      }
    }
  }, [
    currentIdsData,
    getCategoryDetails,
    locale,
    openedCategoryIds.length,
    selectedCategory,
    setOpenedCategoryIds,
    setSelectedCategoryId,
  ]);

  return (
    <>
      <div
        className={classNames(
          "flex flex-1 flex-row justify-between self-center mb-5",
          styles.subCatalog,
        )}
      >
        <div className="flex flex-wrap justify-start self-start mt-4 mb-4 mx-5 w-full items-start">
          {selectedProducts && selectedProducts.length ? (
            selectedProducts.map((el) => {
              return isAccessories[0] ? (
                <div
                  key={el.id}
                  className={classNames(
                    "mx-1 mb-5 flex flex-col justify-center items-center",
                    styles.headSubCatalogBlockMini,
                  )}
                >
                  <div className="">
                    <Link
                      locale={locale}
                      key={el.id}
                      href={{
                        pathname: `/catalog/sub-catalog/product/${el.translations[locale as any]}`,
                        query: `category=${selectedCategory}`,
                      }}
                    >
                      <div>{el.sku}</div>
                      <div
                        className={"cursor-pointer flex flex-1 justify-center"}
                      >
                        <img
                          src={el.images[0].src}
                          alt={el.images[0].alt}
                          width={130}
                          height={137}
                        />
                        {/* <div className="h-px mt-24 ml-20 text-[16px] flex self-center absolute text-red-500 font-bold">{el.price} $</div> */}
                      </div>
                      <div className="h-px bg-emerald-900 mb-1 mx-1 flex self-center"></div>
                      <div className="flex justify-center h-16">
                        <h3 className="">{el.name} </h3>
                      </div>
                    </Link>
                  </div>
                </div>
              ) : (
                <div
                  key={el.id}
                  className={classNames(
                    "mx-5 mb-5 flex flex-col justify-center items-center",
                    styles.headSubCatalogBlock,
                  )}
                >
                  <div className="">
                    <Link
                      locale={locale}
                      key={el.id}
                      href={{
                        pathname: `/catalog/sub-catalog/product/${el.translations[locale as any]}`,
                        query: `category=${selectedCategory}`,
                      }}
                    >
                      <div className="cursor-pointer flex justify-center">
                        <img
                          src={el.images[0].src}
                          alt={el.images[0].alt}
                          width={200}
                          height={250}
                        />
                      </div>

                      <div className="h-px bg-emerald-900 mb-1 mx-1 flex self-center"></div>
                      <div className="flex justify-center">
                        <h3 className="flex justify-center h-16">{el.name}</h3>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <h2 className="text-amber-700"></h2>
          )}
        </div>
        {/* 
          <div className={classNames("mt-4", styles.subMenu)}>
            {locale === "ua" ? (
              <RSidebar
                items={[categories?.[0] || []]}
                setSelectedProducts={setSelectedProducts}
                locale={locale}
              />
            ) : (
              <RSidebar
                items={[categories?.[1] || []]}
                setSelectedProducts={setSelectedProducts}
                locale={locale}
              />
            )}
          </div> */}
      </div>
    </>
  );
};

