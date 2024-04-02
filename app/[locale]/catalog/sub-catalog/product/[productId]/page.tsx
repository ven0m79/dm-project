"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  fetchWooCommerceCategories,
  fetchWooCommerceProductDetails,
  fetchWooCommerceCrossProductsDetails
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
import { AnimatePresence, motion } from "framer-motion";
import Loader from "@app/[locale]/components/atoms/loader/Loader";

import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

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
      <div className="flex self-center flex-row w-[1400px] mb-8">
        <div className="w-[300px]">
          <Sidebar
            items={[categories?.[1] || []]}
            setSelectedProducts={setSelectedProducts}
            locale={locale}
          />
        </div>
        <div className="flex flex-col p-1 min-h-[600px]">
          {loading ? (
            <div className="flex flex-1 w-[800px] h-[600px] justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              <AnimatePresence>
                {!loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      delay: 0.4,
                    }}
                  >
                    <div className="flex flex-row ">
                      <div className={classNames("m-4", styles.imageRadius)}>
                        <Link
                          target="blank"
                          href={details?.images[0].src || ""}
                        >
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
                        <div
                          className={classNames("text-normal", styles.brand)}
                        >
                          Бренд: {details?.brands[0]?.name}
                        </div>
                        <br />
                        <h2 className={classNames("", styles.available)}>
                          {'В наявності: "Під заказ"'}
                        </h2>
                        <br />
                        <div className="flex flex-col justify-between mt-10">
                          <div className={classNames("", styles.downloadable)}>

                            <Link href={"../../../../services"}>
                            Сервісне обслуговування
                            </Link>
                          </div>
                          <div className={styles.downloadable}>
                            <Link href={"../../../../services"}>
                            Запит комерційної пропозиції
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.stroke}></div>

                    <div className="flex flex-1 flex-row w-[400px]">
                     



                    </div>
                    <div className="text-black">
      <Tabs aria-label="Default tabs" style="underline">
      <Tabs.Item active title="Опис" icon={HiUserCircle}>
                        <div
                      className="content px-5"
                      dangerouslySetInnerHTML={{
                        __html: details?.description || "",
                      }}
                    />
      </Tabs.Item>
      <Tabs.Item title="Аксесуари та комплектуючі" icon={MdDashboard}>
                      <div className={classNames("ml-10", styles.downloadabled)}>
                        {details?.cross_sell_ids?.map((el) => (
                          <li
                            className={classNames("mx-1")}
                          >
                            {el}
                          </li>
                        ))}

                      </div>
      </Tabs.Item>
      <Tabs.Item title="Загрузки" icon={HiAdjustments}>
 <div className={classNames("", styles.downloadabled)}>
                        {details?.downloads?.map((el) => (
                          <li
                            key={el.id}
                            className={classNames("mx-1")}
                          >
                            <Link href={el.file}>{el.name}</Link>
                          </li>
                        ))}

                      </div>
      </Tabs.Item>
      <Tabs.Item title="Відео" icon={HiClipboardList}>
                          Тут будуть лінки на ютуб...
      </Tabs.Item>
    </Tabs>
</div>

                  </motion.div>
                )}
              </AnimatePresence>
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
