"use client";
import classNames from "classnames";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useCallback, useEffect, useState } from "react";

import { MainLayout } from "@app/[locale]/components/templates";
import Sidebar from "@app/[locale]/components/molecules/leftSidebar/leftSidebar";

import { fetchWooCommerceCategories } from "../../../../utils/woocommerce.setup";
import { SingleProductDetails } from "../../../../utils/woocomerce.types";
import styles from "./Sub-catalog.module.css";
import { categoriesCreation, TransformedCategoriesType } from "./helpers";

const SubCatalog = ({ params: { locale } }: { params: { locale: string } }) => {
  // цей прийом дозволить визначати яку категорію ти видрав, дивись на сторінці категорій
  // треба буде формувати структуру, у якій значення із попередньої сторінки буде відповідати вибранному sidebar елементу
  const searchParams = useSearchParams();
  const selectedCategory = searchParams?.get("category");

  const [selectedCategoryItem, setSelectedCategoryItem] =
    useState(selectedCategory);

  const [categories, setCategories] = useState<TransformedCategoriesType[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<
    SingleProductDetails[]
  >([]);

  const getData = useCallback(async () => {
    try {
      const data = await fetchWooCommerceCategories(locale);

      // console.log({ data });

      if (data) {
        // отут тобі треба розділити результат масиву data на 2 елементи які в ньому є
        // один для лівого бару, другий - правий

        setCategories(
          categoriesCreation(data as unknown as TransformedCategoriesType[]),
        );
      }
    } catch (e) {
      console.warn({ e });
    }
  }, [locale]);

  useEffect(() => {
    getData();
  }, [getData, locale]);

  const isAccessories = selectedProducts?.map((el) =>
    el.tags.map((el) => el.name).includes("accessories"),
  );

  console.log("selectedProducts -", selectedProducts);
  // console.log("isAccessories -", isAccessories);

  return (
    <Suspense fallback="Loading">
      <MainLayout>
        <div
          className={classNames(
            "flex flex-1 flex-row justify-between self-center mb-5",
            styles.subCatalog,
          )}
        >
          <div className={classNames("mt-4", styles.subMenu)}>
            <Sidebar
              items={[categories?.[1] || []]}
              categoryTag={selectedCategoryItem}
              setSelectedProducts={setSelectedProducts}
              setSelectedCategoryItem={setSelectedCategoryItem}
              locale={locale}
            />
          </div>

          <div className="flex flex-wrap justify-start self-start mt-4 mb-4 mx-6 w-full items-start">
            {selectedProducts && selectedProducts.length ? (
              selectedProducts.map((el) => {
                console.log("В Ретурні ", isAccessories);

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
                          query: `category=${selectedCategoryItem}`,
                        }}
                      >
                        <div>{el.sku}</div>
                        <div
                          className={
                            "cursor-pointer flex flex-1 justify-center"
                          }
                        >
                          <img
                            src={el.images[0].src}
                            alt={el.images[0].alt}
                            width={150}
                            height={210}
                          />
                        </div>
                        <div className="h-px bg-emerald-900 mb-1 mx-1 flex self-center"></div>
                        <div className="flex justify-center h-16">
                          <h3 className="">{el.name}</h3>
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
                          query: `category=${selectedCategoryItem}`,
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
                          <h3 className="flex justify-center h-16">
                            {el.name}
                          </h3>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2 className="text-amber-700">Немає результатів пошуку</h2>
            )}
          </div>

          <div className={classNames("mt-4", styles.subMenu)}>
            <Sidebar
              items={[categories?.[0] || []]}
              categoryTag={selectedCategoryItem}
              setSelectedProducts={setSelectedProducts}
              locale={locale}
            />
          </div>
        </div>
      </MainLayout>
    </Suspense>
  );
};

export default SubCatalog;
