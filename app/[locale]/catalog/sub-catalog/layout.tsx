"use client";

import React, { Suspense, useCallback, useEffect, useState } from 'react';
import LSidebar from "@app/[locale]/components/molecules/leftSidebar/leftSidebar";
import RSidebar from "@app/[locale]/components/molecules/rightSidebar/rightSidebar";
import { fetchWooCommerceCategories } from 'utils/woocommerce.setup';
import { SingleProductDetails } from 'utils/woocomerce.types';
import { categoriesCreation, TransformedCategoriesType } from './helpers';
import { useSearchParams } from 'next/navigation';
import { MainLayout } from '@app/[locale]/components/templates';
import classNames from 'classnames';
import styles from "./Sub-catalog.module.css"





export default function Layout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {



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

            if (data) {

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
    return (

        <MainLayout>
                    <Suspense fallback="Loading">
            <div
                className={classNames(
                    "flex flex-1 flex-row justify-between self-center mb-5 mt-5",
                    styles.subCatalog,
                )}
            >
                <div className='w-[302px]'>
                    {/* Компонента1 */}
                    {locale === "ua" ? (
                        <LSidebar
                            items={[categories?.[1] || []]}
                            categoryTag={selectedCategoryItem}
                            setSelectedProducts={setSelectedProducts}
                            locale={locale}
                            changeURLParams
                        />
                    ) : (
                        <LSidebar
                            items={[categories?.[0] || []]}
                            categoryTag={selectedCategoryItem}
                            setSelectedProducts={setSelectedProducts}
                            locale={locale}
                            changeURLParams
                        />
                    )}
                </div>
                {/* Основное содержимое */}
                <div className='min-w-min'>
                {children}
                </div>
                <div className='w-[302px]'>
                    {locale === "ua" ? (
                        <RSidebar
                            items={[categories?.[1] || []]}
                            setSelectedProducts={setSelectedProducts}
                            locale={locale}
                            changeURLParams
                        />
                    ) : (
                        <RSidebar
                            items={[categories?.[0] || []]}
                            setSelectedProducts={setSelectedProducts}
                            locale={locale}
                            changeURLParams
                        />
                    )}
                </div>
            </div>
            </Suspense>    
        </MainLayout>
        
    );
}
