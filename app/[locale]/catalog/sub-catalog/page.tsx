"use client";
import classNames from "classnames";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useCallback, useEffect, useState } from "react";

import { MainLayout } from "@app/[locale]/components/templates";
import LSidebar from "@app/[locale]/components/molecules/leftSidebar/leftSidebar";
import RSidebar from "@app/[locale]/components/molecules/rightSidebar/rightSidebar";

import { fetchWooCommerceCategories } from "../../../../utils/woocommerce.setup";
import { SingleProductDetails } from "../../../../utils/woocomerce.types";
import styles from "./Sub-catalog.module.css";
import { categoriesCreation, TransformedCategoriesType } from "./helpers";
import Seo from "@app/[locale]/components/atoms/seo/Seo";

const SubCatalog = ({ params: { locale } }: { params: { locale: string } }) => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams?.get("category");

  const [selectedCategoryItem, setSelectedCategoryItem] =
    useState(selectedCategory);

  const [categories, setCategories] = useState<TransformedCategoriesType[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<SingleProductDetails[]>(
    []
  );

  const getData = useCallback(async () => {
    try {
      const data = await fetchWooCommerceCategories(locale);

      if (data) {
        setCategories(
          categoriesCreation(data as unknown as TransformedCategoriesType[])
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
    el.tags.map((el) => el.name).includes("accessories")
  );

  return (
    <div>
      <Seo
        title={`ДМ-ПРОЕКТ: ${selectedCategory}`}
        description={`Пропонуємо Вам сучасне обладнання різних типів та призначень`}
      />
      <div
        className={classNames(
          "flex flex-1 flex-row justify-between self-center mb-5",
          styles.subCatalog
        )}
      >
        <div className="flex flex-wrap justify-start self-start mt-4 mb-4 mx-6 w-full items-start">
          {selectedProducts && selectedProducts.length ? (
            selectedProducts.map((el) => {
              return isAccessories[0] ? (
                <div
                  key={el.id}
                  className={classNames(
                    "mx-1 mb-5 flex flex-col justify-center items-center",
                    styles.headSubCatalogBlockMini
                  )}
                >
                  <div>
                    <Link
                      locale={locale}
                      key={el.id}
                      href={{
                        pathname: `/catalog/sub-catalog/product/${el.translations[locale as any]}`,
                        query: `category=${selectedCategoryItem}`,
                      }}
                    >
                      <div>{el.sku}</div>
                      <div className={"cursor-pointer flex flex-1 justify-center"}>
                        <img
                          src={el.images[0].src}
                          alt={el.images[0].alt}
                          width={130}
                          height={137}
                        />
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
                    styles.headSubCatalogBlock
                  )}
                >
                  <div>
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
            <h2 className="text-amber-700">Loading products...</h2>
          )}
        </div>
      </div>
    </div>
  );
};

// Обернуть компонент в Suspense для корректной работы с асинхронными данными
export default function SubCatalogPage({ params }: { params: { locale: string } }) {
  return (
    <Suspense fallback="Loading">
      <SubCatalog params={params} />
    </Suspense>
  );
}
