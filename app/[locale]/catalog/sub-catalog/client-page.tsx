"use client";
import classNames from "classnames";
import Link from "next/link";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";

import { fetchWooCommerceCategories, fetchWooCommerceCategoryDetails } from "../../../../utils/woocommerce.setup";
import styles from "./Sub-catalog.module.css";
import { categoriesCreation, TransformedCategoriesType } from "./helpers";

import { useSidebar } from "@app/[locale]/components/contexts/products-sidebar/products-sidebar.context";
import { getCategoriesIds } from "@app/[locale]/components/constants";
import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";
import { useRouter, useSearchParams } from "next/navigation";

type BreadcrumbItem = { id: number | string; name: string; url: string };

export const ClientPage: FC<{ locale: string }> = ({ locale }) => {
  const {
    selectedProducts,
    setCategories,
    selectedCategory,
    setSelectedCategoryId,
    getCategoryDetails,
    setOpenedCategoryIds,
    openedCategoryIds,
    selectedCategoryId,
  } = useSidebar();



  const currentIdsData = useMemo(() => getCategoriesIds(locale), [locale]);
  const isMobile = useIsMobile();
  const router = useRouter();
  const searchParams = useSearchParams(); // ✅ відслідковуємо query

  const isIOS = typeof window !== "undefined" && /iPhone|iPad|iPod/i.test(navigator.userAgent);

  const sortedProducts = [...selectedProducts].sort((a, b) => a.name.localeCompare(b.name));
  const [visibleCount, setVisibleCount] = useState(15);
  const productsToRender = sortedProducts.slice(0, visibleCount);


  const categoryFromUrl = searchParams?.get("category") ?? "" // ✅ беремо `category` з URL
  // 🔹 Локальний state для хлібних крихт
  const [breadcrumbsTrail, setBreadcrumbsTrail] = useState<BreadcrumbItem[]>([]);

  // 🔹 Функція для побудови trail від поточної категорії вгору до root
  const buildCategoryTrail = useCallback(
    async (categoryId: number) => {
      let trail: BreadcrumbItem[] = [];
      let currentId: number | null = categoryId;

      while (currentId) {
        const category = await fetchWooCommerceCategoryDetails(currentId, locale);
        if (!category) break;

        // 🚫 Пропускаємо root (наприклад, якщо в нього parent === 0)
        if (category.parent !== 0) {
          trail.unshift({
            id: category.id,
            name: category.name,
            url: `/${locale}/catalog/sub-catalog?category=${encodeURIComponent(
              category.slug
            )}`,
          });
        }

        currentId =
          category.parent && category.parent !== 0 ? category.parent : null;
      }

      // ✅ Додаємо "Головна" тільки один раз у початок
      const homeUrl = locale === "ua" ? `/` : `/${locale}`;
      const finalTrail: BreadcrumbItem[] = [
        { id: "home", name: "Головна", url: homeUrl },
        ...trail,
      ];
      setBreadcrumbsTrail(finalTrail);
    },
    [locale]
  );



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

  // ✅ реагуємо на зміну `category` з URL
  useEffect(() => {
    if (categoryFromUrl && currentIdsData) {
      const categoryId = (currentIdsData as Record<string, number>)[categoryFromUrl];
      if (categoryId) {
        getCategoryDetails(categoryId, locale);
        setSelectedCategoryId(categoryId);
        setOpenedCategoryIds([categoryId]);

        // 🔹 побудова хлібних крихт
        buildCategoryTrail(categoryId);
      }
    }
  }, [
    categoryFromUrl,
    currentIdsData,
    getCategoryDetails,
    locale,
    setOpenedCategoryIds,
    setSelectedCategoryId,
    buildCategoryTrail,
  ]);

  return (
    <>
      {typeof window !== "undefined" && isMobile ?
        <div
          className={classNames(
            "flex flex-1 flex-row justify-between self-center mb-5",
            styles.subCatalog,
          )}
        >
          <div className="flex flex-wrap justify-start self-start mt-4 mb-4 mx-1 w-full items-start">
            {productsToRender && productsToRender.length ? (

              productsToRender.map((el) => {
                return isAccessories[0] ? (
                  <div
                    key={el.id}
                    className={classNames(
                      "mx-1 mb-5 flex flex-col justify-center items-center",
                      styles.headSubCatalogBlockMini,
                    )}
                  >
                    <div className="w-full">
                      <div
                        key={el.id}
                        className="cursor-pointer"
                        onClick={() => {
                          const url = `/catalog/sub-catalog/product/${el.translations[locale as any]}?category=${encodeURIComponent(selectedCategory || "")}`;
                          if (isIOS) {
                            router.push(url);
                          } else {
                            window.location.href = url;
                          }
                        }}
                      >
                        <div>{el.sku.length > 7 ? `${el.sku.slice(0, 7)}..` : el.sku}</div>
                        <div className="cursor-pointer flex flex-1 justify-center">
                          <img
                            src={el.images[0].src}
                            alt={el.images[0].alt}
                            width={130}
                            height={137}
                            className="w-full h-auto"
                          />
                        </div>
                        <div className="h-px bg-emerald-900 mb-1 mx-1 flex self-center"></div>
                        <div className="flex justify-center h-16">
                          <h3 className={classNames(styles.headSubCatalogTitle)}>{el.name}</h3>
                        </div>
                      </div>

                    </div>
                  </div>
                ) : (
                  <div
                    key={el.id}
                    className={classNames(
                      "mx-1 mb-5 flex flex-col justify-center items-center",
                      styles.headSubCatalogBlock,
                    )}
                  >
                    <div className="w-full">
                      <div
                        key={el.id}
                        className="cursor-pointer"
                        onClick={() => {
                          const url = `/catalog/sub-catalog/product/${el.translations[locale as any]}?category=${encodeURIComponent(selectedCategory || "")}`;
                          if (isIOS) {
                            router.push(url); // Программная навигация
                          } else {
                            window.location.href = url; // Прямая загрузка страницы
                          }
                        }}
                      >
                        <div className="cursor-pointer flex justify-center">
                          <img
                            src={el.images[0].src}
                            alt={el.images[0].alt}
                            width={isMobile ? 150 : 200}
                            height={isMobile ? 150 : 200}
                            className="w-full h-auto"
                          />
                        </div>

                        <div className="h-px bg-emerald-900 mb-1 mx-1 flex self-center"></div>
                        <div className="flex justify-center">
                          <h3 className="flex justify-center h-16">{el.name}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2 className="text-amber-700"></h2>
            )}
          </div>
        </div>
        :
        <div
          className={classNames(
            "flex flex-1 flex-col justify-between self-center mb-5",
            styles.subCatalog,
          )}
        >
          <div className="mt-5 ml-4">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className={styles.headSubCatalogTitle}>
              <ol className="flex flex-wrap gap-2">
                {breadcrumbsTrail.map((el, idx) => {
                  const isLast = idx === breadcrumbsTrail.length - 1;
                  return (
                    <li key={el.id} className="flex items-center gap-2">
                      {idx > 0 && <span>/</span>}
                      {isLast ? (
                        <span className={styles.headSubCatalogTitle}>{el.name}</span>
                      ) : (
                        <Link href={el.url} className="hover:underline">
                          {el.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>

          <div className="flex flex-wrap justify-start self-start mt-4 mb-4 mx-5 w-full max-w-[800px] items-start">
            {productsToRender && productsToRender.length ? (
              productsToRender.map((el) => {
                return isAccessories[0] ? (
                  <div
                    key={el.id}
                    className={classNames(
                      "mx-1 mb-5 flex flex-col justify-center items-center",
                      styles.headSubCatalogBlockMini,
                    )}
                  >
                    <div className="w-full text-center">
                      <Link
                        locale={locale}
                        key={el.id}
                        href={{
                          pathname: `/catalog/sub-catalog/product/${el.translations[locale as any]}`,
                          query: `category=${selectedCategory}`,
                        }}
                      >
                        <div className="w-full px-2">{el.sku.length > 7 ? `${el.sku.slice(0, 7)}..` : el.sku}</div>
                        <div
                          className={"cursor-pointer flex flex-1 justify-center w-full"}
                        >
                          <img
                            src={el.images[0].src}
                            alt={el.images[0].alt}
                            width={130}
                            height={137}
                            className="w-full h-auto"
                          />
                          {/* <div className="h-px mt-24 ml-20 text-[16px] flex self-center absolute text-red-500 font-bold">{el.price} $</div> */}
                        </div>
                        <div className="h-px bg-emerald-900 mb-1 mx-1 flex self-center"></div>
                        <div className="flex justify-center h-16">
                          <h3 className={classNames("text-center", styles.headSubCatalogTitle)}>{el.name} </h3>
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
                    <div className="w-full text-center">
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
                            className="w-full h-auto"
                          />
                        </div>

                        <div className="h-px bg-emerald-900 mb-1 mx-1 flex self-center"></div>
                        <div className="flex justify-center">
                          <h3 className="flex justify-center h-16 w-full px-2">{el.name}</h3>
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

        </div>
      }
      {sortedProducts.length > visibleCount && (
        <div className="flex flex-1 w-full self-center items-center justify-center">
          <button
            className={classNames("justify-center", styles.downloadable)}
            onClick={() => setVisibleCount(visibleCount + 15)}>
            Завантажити ще
          </button>
        </div>
      )}
    </>
  );
};