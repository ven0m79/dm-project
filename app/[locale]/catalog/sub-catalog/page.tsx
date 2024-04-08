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

  const [categories, setCategories] = useState<TransformedCategoriesType[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<
    SingleProductDetails[]
  >([]);

  const getData = useCallback(async () => {
    try {
      const data = await fetchWooCommerceCategories(locale);

      console.log({ data });

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

  const isAccessories = selectedProducts?.map(el => el.tags.map(el => el.name).includes("accessories"));
  
  console.log('selectedProducts -', selectedProducts);
  console.log('isAccessories -', isAccessories);
   
  

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
              categoryTag={selectedCategory}
              setSelectedProducts={setSelectedProducts}
              locale={locale}
            />
            <div className={classNames("", styles.subMenuDash)}></div>
          </div>

          <div className="flex flex-wrap justify-start self-start mt-4 mb-4 mx-6 w-full items-start">

            {selectedProducts && selectedProducts.length ? (
              selectedProducts.map((el) => {
                return (
                  isAccessories ? 
                  <div
                    key={el.id}
                    className={classNames("mx-5 mb-5", styles.headSubCatalogBlockMini)}
                    >
                    <div className="">
                      <Link
                        locale={locale}
                        key={el.id}
                        href={{
                          pathname: `/catalog/sub-catalog/product/${el.translations[locale as any]}`,
                          query: `category=${selectedCategory}`
                        }}
                      >
                        <div
                          className={classNames(
                            "cursor-pointer",
                            styles.headSubCatalogPhoto,
                          )}
                        >
                          <img
                            src={el.images[0].src}
                            alt={el.images[0].alt}
                            width={100}
                            height={150}
                          />
                        </div>

                        <div className="flex justify-center">
                          <h3 className={classNames("", styles.headSubCatalog)}>
                            {el.name}
                          </h3>
                        </div>
                      </Link>
                    </div>
                  </div>
                  :
                  <div
                    key={el.id}
                    className={classNames("mx-5 mb-5", styles.headSubCatalogBlock)}
                   >
                    <div className="">
                      <Link
                        locale={locale}
                        key={el.id}
                        href={{
                          pathname: `/catalog/sub-catalog/product/${el.translations[locale as any]}`,
                          query: `category=${selectedCategory}`
                        }}
                      >
                        <div
                          className={classNames(
                            "cursor-pointer",
                            styles.headSubCatalogPhoto,
                          )}
                        >
                          <img
                            src={el.images[0].src}
                            alt={el.images[0].alt}
                            width={200}
                            height={250}
                          />
                        </div>

                        <div className="flex justify-center">
                          <h3 className={classNames("", styles.headSubCatalog)}>
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
              categoryTag={selectedCategory}
              setSelectedProducts={setSelectedProducts}
              locale={locale}
            />
            <div className={classNames("", styles.subMenuDash)}></div>
          </div>
        </div>
      </MainLayout>
    </Suspense>
  );
};

export default SubCatalog;
