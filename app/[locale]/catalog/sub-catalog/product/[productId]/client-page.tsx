"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  fetchWooCommerceProductDetails,
  fetchWooCommerceCrossProductsDetails,
} from "../../../../../../utils/woocommerce.setup";
import { SingleProductDetails } from "../../../../../../utils/woocomerce.types";
import Link from "next/link";
import styles from "./Product.module.css";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "@app/[locale]/components/atoms/loader/Loader";

import { Tabs, CustomFlowbiteTheme } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import DOMPurify from "dompurify";

const customTheme: CustomFlowbiteTheme = {
  tabs: {
    base: "flex flex-col gap-2",
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
              off: "text-[#0061AA] hover:bg-gray-50 hover:text-[#0061AA] dark:text-[#0060aa50] dark:hover:bg-[#0060aa50]  dark:hover:text-text-[#0061AA]",
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

const ClientPage = ({ params: { locale } }: { params: { locale: string } }) => {
  const { productId }: Params = useParams<any>();

  const [loading, setLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<SingleProductDetails | null>(null);
  const [crossSellProducts, setCrossSellProducts] = useState<
    SingleProductDetails[]
  >([]);

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

  const SEOData = useMemo(() => {
    // Очистка описания
    const cleanDescription = details?.short_description
      ? DOMPurify.sanitize(details.short_description)
      : "";

    if (isAccessories) {
      return {
        title: details?.name || "",
        description: cleanDescription,
      };
    }

    return {
      title: details?.name || "",
      description: cleanDescription, // Всегда используем очищенное описание
    };
  }, [details?.name, details?.short_description, isAccessories]);

  const getCategoryDetails = useCallback(async () => {
    setLoading(true);

    try {
      const data = await fetchWooCommerceProductDetails(
        selectedProductId,
        locale,
      );

      if (data) {
        setDetails(data);

        if (data.cross_sell_ids?.length) {
          const crossSellData = await fetchWooCommerceCrossProductsDetails(
            data.cross_sell_ids,
            locale,
          );
          setCrossSellProducts(crossSellData);
          console.log("Cross-sell products:", crossSellData);
        }
      }
    } catch (e) {
      console.warn("Error fetching product details or cross-sell products:", e);
    } finally {
      setLoading(false);
    }
  }, [locale, selectedProductId]);

  useEffect(() => {
    getCategoryDetails();
  }, [getCategoryDetails]);

  return (
    <>
      <div className="flex self-center flex-row max-w-[800px] mb-8">
        <div className="flex flex-col p-1 min-h-[600px] flex-1">
          {loading ? (
            <div className="flex w-full h-4/5 justify-center items-center">
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
                    <div className="flex flex-row w-full">
                      <div>
                      <div className={classNames("m-4", styles.imageRadius)}>
                        <img
                          src={details?.images[0].src}
                          alt={details?.images[0].alt}
                          width={450}
                          height={475}
                        />
                      </div>
                      <div>

                      </div>
                      </div>
                      <div className="px-1 pt-8 sm:pt-28 w-[300px]">
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
                          <>
                            <div
                              className={classNames(
                                "text-normal",
                                styles.brand,
                              )}
                            >
                              {"Артикул: "}
                              {details?.sku}
                            </div>
                            {/* <div
                                className="content mt-5"
                                dangerouslySetInnerHTML={{
                                  __html: details?.short_description || "",
                                }}
                              /> */}
                          </>
                        ) : null}
                        <div className="sm:h-[80px] h-[30px]"></div>
                        <br />
                        <div className="flex flex-col justify-between">
                          <div className={styles.downloadable}>
                            <Link href={"../../../../contacts"}>
                              Запит комерційної пропозиції
                            </Link>
                          </div>
                          <br />
                          {isAccessories ? (
                            <div className=""></div>
                          ) : (
                            <div
                              className={classNames("", styles.downloadable)}
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

                    <div className="text-black">
                      <Tabs aria-label="Default tabs" theme={customTheme.tabs}>
                        <Tabs.Item
                          active
                          title="Опис"
                          icon={HiUserCircle}
                          className="bg-red"
                        >
                          <div
                            className="content w-fit"
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
                              {crossSellProducts.length > 0 ? (
                                crossSellProducts.map((el) => (
                                  <li key={el.id} className="mx-1">
                                    <a
                                      className={"text text-blue-900"}
                                      href={`/catalog/sub-catalog/product/${el.id}?category=${el.tags[0].name}`}
                                    >
                                      {el.name}
                                    </a>
                                  </li>
                                ))
                              ) : (
                                <p>No cross-sell products available.</p>
                              )}
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
      </div>
    </>
  );
};

export default ClientPage;
