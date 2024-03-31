"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  fetchWooCommerceCategories,
  fetchWooCommerceProductDetails,
} from "../../../../../../utils/woocommerce.setup";
import { SingleProductDetails } from "../../../../../../utils/woocomerce.types";
import { MainLayout } from "@app/[locale]/components/templates";
import Sidebar from "@app/[locale]/components/molecules/leftSidebar/leftSidebar";
import { categoriesCreation, TransformedCategoriesType } from "../../helpers";
import { Anybody } from "next/font/google";
import Link from "next/link";
import styles from "./Product.module.css";
import classNames from "classnames";
import Image from "next/image";

type Params = {
  productId: string;
};

const Page = ({ params: { locale } }: { params: { locale: string } }) => {
  const { productId }: Params = useParams<any>();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams?.get("category");
  const [categories, setCategories] = useState<TransformedCategoriesType[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<SingleProductDetails | null>(null);

  const selectedProductId = useMemo(() => {
    return (
      (!details
        ? Number(productId)
        : Number(details.translations?.[locale as any])) || 0
    );
  }, [details, locale, productId]);

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

  const getCategoryDetails = useCallback(async () => {
    setLoading(true);

    try {
      const data = await fetchWooCommerceProductDetails(
        selectedProductId,
        locale,
      );

      if (data) {
        setDetails(data);
      }
    } catch (e) {
      console.warn({ e });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [locale, selectedProductId]);

  function setSelectedProducts(v: any[]): void {
    throw new Error("Function not implemented.");
  }

  useEffect(() => {
    getCategoryDetails();
  }, [getCategoryDetails]);

  useEffect(() => {
    getData();
  }, [getData, locale]);

  return (
    <MainLayout>
      <div className="flex self-center flex-row w-[1400px]">
        <div className="w-[300px]">
          <Sidebar
            items={[categories?.[1] || []]}
            setSelectedProducts={setSelectedProducts}
            locale={locale}
          />
        </div>
        <div className="flex flex-col p-1">
          {loading ? (
            <div className="flex flex-1 w-[800px] flex-row bg-amber-600">
              <h1>Loading</h1>
            </div>
          ) : (
            <>
              <div className="flex flex-row">
                <div className={classNames("m-4", styles.imageRadius)}>
                  <Link target="blank" href={details?.images[0].src || ""}>
                    <img
                      src={details?.images[0].src}
                      alt={details?.images[0].alt}
                      width={300}
                      height={311}
                    />
                  </Link>
                </div>
                <div className="p-4 w-[500px]">
                  <h1 className={classNames("", styles.title)}>
                    {details?.name}
                  </h1>
                  <br />
                  <div className={classNames("text-normal", styles.brand)}>
                    Бренд: {details?.brands[0]?.name}
                  </div>
                  <br />
                  <h2 className={classNames("", styles.available)}>
                    {'В наявності: "Під заказ"'}
                  </h2>
                  <br />
                  <div className="flex flex-row justify-between mt-10">
                    <div className={classNames("", styles.downloadable)}>
                      <Link href={details?.downloads[0]?.file || ""}>
                        <img
                          src="/download-pdf.png"
                          width={36}
                          className="float-left"
                          alt={"Завантажити"}
                        />
                        {"Завантажити документацію"}
                      </Link>
                    </div>
                    <div className={styles.yerSubmit}>
                      <Link href={"../../../../services"}>Замовити зараз</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.stroke}></div>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: details?.description || "" }}
              />
            </>
          )}
        </div>
        <div className="w-[300px]">
          <Sidebar
            items={[categories?.[0] || []]}
            setSelectedProducts={setSelectedProducts}
            locale={locale}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Page;
