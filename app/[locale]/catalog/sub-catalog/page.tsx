"use client";

import { Sidebar } from "flowbite-react";
import styles from "./Sub-catalog.module.css";
import React, { useCallback, useEffect, useState } from "react";
import { MainLayout } from "@app/[locale]/components/templates";
import { useTranslations } from "next-intl";
import classNames from "classnames";

import {
  fetchWooCommerceProductsBasedOnCategory,
} from "../../../../utils/woocommerce.setup";

import Link from "next/link";
import {
  SingleProductDetails,
} from "../../../../utils/woocomerce.types";
import Leftsidebar from "@app/[locale]/components/molecules/leftSidebar/leftSidebar";

const SubCatalog = ({ params: { locale } }: { params: { locale: string } }) => {
  const t = useTranslations("Footer");

  const [selectedProducts, setSelectedProducts] = useState<
    SingleProductDetails[]
  >([]);


  const getCategoryDetails = useCallback(async (id: number) => {
    try {
      const data = await fetchWooCommerceProductsBasedOnCategory(id);

      if (data) {
        setSelectedProducts(data);
      }
    } catch (e) {
      console.warn({ e });
    }
  }, []);

  return (
    <MainLayout>
      <div
        className={classNames(
          "flex flex-1 flex-row justify-between self-center bg-slate-400",
          styles.subCatalog,
        )}
      >
        <Leftsidebar params={{
          locale: ""
        }} />
      </div>
      <div
        className={classNames(
          "flex flex-1 flex-row justify-between self-center",
          styles.subCatalog,
        )}
      >
        <div className={classNames("mt-4", styles.subMenu)}>

          <div className="flex flex-wrap justify-around self-center mt-4 mb-4 mx-1 w-full">
            {selectedProducts.length
              ? selectedProducts.map((el) => {
                return (
                  <div key={el.id} className={classNames("mx-5 bg-black", styles.headSubCatalogBlock)}>

                    <div className="">

                      <Link key={el.id} href={`/catalog/sub-catalog/product/${el.id}`}>
                        <div className={classNames("cursor-pointer", styles.headSubCatalogPhoto)}>
                          <img
                            src={el.images[0].src}
                            alt={el.images[0].alt}
                            width={310}
                            height={360}
                          />
                        </div>


                        <div className="flex justify-center">
                          <h3 className={classNames("", styles.headSubCatalog)}>{el.name}</h3>
                        </div>
                      </Link>
                    </div>
                  </div>

                );
              })
              : null}
          </div>

        </div>
      </div>
    </MainLayout>

  );
};

export default SubCatalog;
