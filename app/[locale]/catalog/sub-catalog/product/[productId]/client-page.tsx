"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  fetchWooCommerceProductDetails,
  fetchWooCommerceCrossProductsDetails,
  fetchWooCommerceCategoryDetails,
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
import { useTranslations } from "next-intl";
import { useSidebar } from "@app/[locale]/components/contexts/products-sidebar/products-sidebar.context";

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

type BreadcrumbItem = { id: number | string; name: string; url: string };

const ClientPage = ({ params: { locale } }: { params: { locale: string } }) => {
  const t = useTranslations("Product");
  const { productId }: Params = useParams<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<SingleProductDetails | null>(null);
  const [crossSellProducts, setCrossSellProducts] = useState<
    SingleProductDetails[]
  >([]);

  const { setOpenedCategoryIds } = useSidebar(); // для відкриття категорії в сайдбарі, якщо потр
  const [breadcrumbsTrail, setBreadcrumbsTrail] = useState<BreadcrumbItem[]>([]); // 🔹 хлібні крихти

  const isIOS = typeof window !== "undefined" && /iPhone|iPad|iPod/i.test(navigator.userAgent);

  const youtubeMeta = details?.meta_data?.find((item: any) => item.key === "_nickx_video_text_url");
  const youtubeUrl =
    Array.isArray(youtubeMeta?.value)
      ? youtubeMeta?.value?.[0]
      : youtubeMeta?.value;

  // 🔹 Визначення ID поточного продукту
  const selectedProductId = useMemo(() => {
    return (!details ? Number(productId) : Number(details.translations?.[locale as any])) || 0;
  }, [details, locale, productId]);

  const isAccessories = details?.tags?.map(el => el.name)?.includes("accessories");

  // 🔹 Функція завантаження деталей продукту та крос-селів
  const getProductDetails = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchWooCommerceProductDetails(selectedProductId, locale);
      if (data) {
        setDetails(data);

        // 🔹 Хлібні крихти — беремо першу категорію продукту
        const crossSellDataPromise = data.cross_sell_ids?.length
          ? fetchWooCommerceCrossProductsDetails(data.cross_sell_ids, locale)
          : Promise.resolve([]);

        await buildCategoryTrail(data.categories, data.name, data.id);
        const crossSellData = await crossSellDataPromise;
        setCrossSellProducts(crossSellData || []);
      }
    } catch (e) {
      console.warn("Error fetching product details or cross-sell products:", e);
    } finally {
      setLoading(false);
    }
  }, [locale, selectedProductId]);

  const getCategoryPath = async (categoryId: number, locale: string, visited: Set<number> = new Set()): Promise<BreadcrumbItem[]> => {
    const category = await fetchWooCommerceCategoryDetails(categoryId, locale);
    if (!category) return [];

    // Якщо категорія верхнього рівня або вже була додана, пропускаємо
    if (category.parent === 0 || visited.has(category.id)) return [];

    visited.add(category.id);

    const path: BreadcrumbItem[] = [];

    // Рекурсивно додаємо батьків
    if (category.parent) {
      const parentPath = await getCategoryPath(category.parent, locale, visited);
      path.push(...parentPath);
    }

    // Додаємо поточну категорію
    path.push({
      id: category.id,
      name: category.name,
      url: `/${locale}/catalog/sub-catalog?category=${encodeURIComponent(category.slug)}`,
    });

    return path;
  };

  // 🔹 Побудова хлібних крихт
  const buildCategoryTrail = useCallback(
    async (categories: any[], productName: string, productId: number) => {
      const trail: BreadcrumbItem[] = [];
      const homeUrl = locale === "ua" ? `/` : `/${locale}`;
      trail.push({ id: "home", name: "Головна", url: homeUrl });

      if (!categories || categories.length === 0) {
        setBreadcrumbsTrail(trail);
        return;
      }

      // Беремо **тільки першу (найглибшу) категорію**
      const deepestCategory = categories[0];
      const categoryPath = await getCategoryPath(deepestCategory.id, locale);
      trail.push(...categoryPath);

      // Додаємо сам продукт
      trail.push({
        id: productId,
        name: productName,
        url: `/${locale}/catalog/sub-catalog/product/${productId}?category=${encodeURIComponent(deepestCategory.slug)}`,
      });

      setBreadcrumbsTrail(trail);
    },
    [locale]
  );

  useEffect(() => {
    getProductDetails();
  }, [getProductDetails]);


  return (
    <>
      <div className="flex self-center flex-col max-w-[800px] mb-8">
        <div className="mt-5 ml-4">
          <nav aria-label="Breadcrumb" className={classNames("flex", styles.breadcrumbs)}>
            <ol className="flex flex-wrap gap-1">
              {breadcrumbsTrail.map((el, index) => {
                const isLast = index === breadcrumbsTrail.length - 1;
                return (
                  <li key={el.id} className="flex items-center gap-1">
                    {isLast ? (
                      <span>{el.name}</span> // останній елемент без лінка
                    ) : (
                      <Link href={el.url}>{el.name}</Link>
                    )}
                    {index < breadcrumbsTrail.length - 1 && "/"}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
        <div className="flex flex-col py-1 px-2 min-h-[600px] flex-1">
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
                        <div className={classNames("my-4 w-full h-auto", styles.imageRadius)}>
                          <img
                            src={details?.images[0].src}
                            alt={details?.images[0].alt}
                            width={450}
                            height={475}
                            className="w-full h-auto"
                          />
                        </div>
                        <div>

                        </div>
                      </div>
                      <div className="px-1 pt-8 sm:pt-28 w-1/2">
                        <h1 className={classNames("", styles.title)}>
                          {details?.name}
                        </h1>
                        <br />
                        <div
                          className={classNames("text-normal", styles.brand)}
                        >
                          {t("product-brand")} {details?.brands[0]?.name}
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
                        <div className="flex flex-col justify-between items-center">
                          <div className={styles.downloadable}>
                            <Link href={"../../../../contacts"}>
                              {t("product-request")}
                            </Link>
                          </div>
                          <br />
                          {isAccessories ? (
                            <div className=""></div>
                          ) : (
                            <div
                              className={classNames("flex items-center", styles.downloadable)}
                            >
                              <Link href={"../../../../services"}>
                                {t("product-services")}
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
                        {!isAccessories && crossSellProducts.length > 0 && (
                          <Tabs.Item
                            title="Аксесуари та комплектуючі"
                            icon={MdDashboard}
                          >
                            <div className={classNames("ml-10", styles.downloadabled)}>
                              {crossSellProducts.map((el) => (
                                <li key={el.id} className="mx-1">
                                  <a
                                    className="text text-blue-900"
                                    href={`/catalog/sub-catalog/product/${el.id}?category=${el.tags[0].name}`}
                                  >
                                    {el.name}
                                  </a>
                                </li>
                              ))}
                            </div>
                          </Tabs.Item>
                        )}
                        {details &&
                          Array.isArray(details.downloads) &&
                          details.downloads.length > 0 && (
                            <Tabs.Item title="Завантаження" icon={HiAdjustments}>
                              <div className={classNames("", styles.downloadabled)}>
                                {details.downloads.map((el) => (
                                  <li key={el.id} className="mx-1">
                                    <Link href={el.file}>{el.name}</Link>
                                  </li>
                                ))}
                              </div>
                            </Tabs.Item>
                          )}

                        {typeof youtubeUrl === "string" &&
                          youtubeUrl.startsWith("http") && (
                            <Tabs.Item title="Відео" icon={HiClipboardList}>
                              <a
                                href={youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                              >
                                Переглянути відео на YouTube
                              </a>
                            </Tabs.Item>
                          )}


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
