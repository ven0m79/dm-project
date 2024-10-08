"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  fetchWooCommerceCategories,
  fetchWooCommerceProductDetails,
  fetchWooCommerceCrossProductsDetails,
} from "../../../../../../utils/woocommerce.setup";
import { SingleProductDetails } from "../../../../../../utils/woocomerce.types";
import { MainLayout } from "@app/[locale]/components/templates";
import Sidebar from "@app/[locale]/components/molecules/leftSidebar/leftSidebar";
import { categoriesCreation, TransformedCategoriesType } from "../../helpers";
import Link from "next/link";
import styles from "./Product.module.css";
import classNames from "classnames";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "@app/[locale]/components/atoms/loader/Loader";

import { Tabs, CustomFlowbiteTheme } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

const customTheme: CustomFlowbiteTheme = {
  tabs: {
    base: "flex flex-col gap-2 ml-4",
    tablist: {
      base: "flex text-center",
      styles: {
        default: "flex-wrap border-b border-gray-200 dark:border-gray-300",
        underline:
          "-mb-px flex-wrap border-b border-gray-200 dark:border-gray-700",
      },
      tabitem: {
        base: "flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus:outline-none focus:ring-0 focus:ring-cyan-900 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
        styles: {
          default: {
            base: "rounded-t-lg",
            active: {
              on: "bg-[#0060aa10] text-[#0061AA] dark:bg-[#0060aa10] dark:text-[#0061AA]",
              off: "text-[#0061AA] hover:bg-gray-50 hover:text-[#0061AA] dark:text-[#0060aa10] dark:hover:bg-[#0060aa10]  dark:hover:text-text-[#0061AA]",
            },
          },
          underline: {
            base: "rounded-t-lg",
            active: {
              on: "active rounded-t-lg border-b-2 border-cyan-600 text-cyan-600 dark:border-cyan-500 dark:text-cyan-500",
              off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
            },
          },
        },
        icon: "mr-2 h-5 w-5",
      },
    },
    tabitemcontainer: {
      base: "",
      styles: {
        default: "",
        underline: "",
      },
    },
    tabpanel: "py-3",
  },
};

type Params = {
  productId: string;
};

const Page = ({ params: { locale } }: { params: { locale: string } }) => {
  const { productId }: Params = useParams<any>();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams?.get("category");
  const [selectedCategoryItem, setSelectedCategoryItem] =
    useState(selectedCategory);
  const [categories, setCategories] = useState<TransformedCategoriesType[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<
    SingleProductDetails[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<SingleProductDetails | null>(null);

  const selectedProductId = useMemo(() => {
    return (
      (!details
        ? Number(productId)
        : Number(details.translations?.[locale as any])) || 0
    );
  }, [details, locale, productId]);

  const isAccessories = details?.tags
    ?.map((el) => el.name)
    ?.includes("accessories");

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

  useEffect(() => {
    getCategoryDetails();
  }, [getCategoryDetails]);

  useEffect(() => {
    getData();
  }, [getData, locale]);

  return (
    <MainLayout>
      <div className="flex self-center flex-row w-[1400px] mb-8">
        <div className={classNames("mt-4", styles.subMenu)}>
          {locale === "ua" ? (
            <Sidebar
              items={[categories?.[1] || []]}
              categoryTag={selectedCategoryItem}
              setSelectedProducts={setSelectedProducts}
              locale={locale}
              fromProductPage
            />
          ) : (
            <Sidebar
              items={[categories?.[0] || []]}
              categoryTag={selectedCategoryItem}
              setSelectedProducts={setSelectedProducts}
              locale={locale}
              fromProductPage
            />
          )}
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
                    <div className="flex flex-row w-[800px]">
                      <div className={classNames("m-4", styles.imageRadius)}>
                        <img
                          src={details?.images[0].src}
                          alt={details?.images[0].alt}
                          width={450}
                          height={475}
                        />
                      </div>
                      <div className="px-1 pt-28 w-[350px]">
                        <h1 className={classNames("", styles.title)}>
                          {details?.name}
                        </h1>
                        <br />
                        <div
                          className={classNames("text-normal", styles.brand)}
                        >
                          {"Бренд: "} {details?.brands[0]?.name}
                        </div>
                        <br />

                        {isAccessories ? (
                          <div
                            className={classNames("text-normal", styles.brand)}
                          >
                            {"Артикул: "}
                            {details?.sku}
                          </div>
                        ) : null}
                        <div className="h-[100px]"></div>
                        <br />
                        <div className="flex flex-row justify-between">
                          <div className={styles.downloadable}>
                            <Link href={"../../../../contacts"}>
                              Запит комерційної пропозиції
                            </Link>
                          </div>
                          {isAccessories ? (
                            <div className=""></div>
                          ) : (
                            <div
                              className={classNames(
                                "self-center",
                                styles.downloadable,
                              )}
                            >
                              <Link href={"../../../../services"}>
                                Сервісне обслуговування
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={styles.stroke}></div>

                    <div className="flex flex-1 flex-row w-[400px]"></div>
                    <div className="text-black">
                      <Tabs aria-label="Default tabs" theme={customTheme.tabs}>
                        <Tabs.Item
                          active
                          title="Опис"
                          icon={HiUserCircle}
                          className="bg-red"
                        >
                          <div
                            className="content"
                            dangerouslySetInnerHTML={{
                              __html: details?.description || "",
                            }}
                          />
                        </Tabs.Item>
                        {isAccessories ? null : (
                          <Tabs.Item
                            title="Аксесуари та комплектуючі"
                            icon={MdDashboard}
                          >
                            <div
                              className={classNames(
                                "ml-10",
                                styles.downloadabled,
                              )}
                            >
                              {details?.cross_sell_ids?.map((el) => (
                                <li key={0} className={classNames("mx-1")}>
                                  {el}
                                </li>
                              ))}
                            </div>
                          </Tabs.Item>
                        )}
                        <Tabs.Item title="Загрузки" icon={HiAdjustments}>
                          <div className={classNames("", styles.downloadabled)}>
                            {details?.downloads?.map((el) => (
                              <li key={el.id} className={classNames("mx-1")}>
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
        <div className={classNames("mt-4", styles.subMenu)}>
          {locale === "ua" ? (
            <Sidebar
              items={[categories?.[0] || []]}
              categoryTag={selectedCategoryItem}
              setSelectedProducts={setSelectedProducts}
              locale={locale}
              changeURLParams
            />
          ) : (
            <Sidebar
              items={[categories?.[1] || []]}
              categoryTag={selectedCategoryItem}
              setSelectedProducts={setSelectedProducts}
              locale={locale}
              changeURLParams
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Page;
