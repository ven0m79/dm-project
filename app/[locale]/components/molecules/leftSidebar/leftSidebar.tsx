"use client"

import { Sidebar } from "flowbite-react";
import styles from "../../../catalog/sub-catalog/Sub-catalog.module.css";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import classNames from "classnames";

import {
    fetchWooCommerceCategories,
    fetchWooCommerceProductsBasedOnCategory,
} from "../../../../../utils/woocommerce.setup";

import Link from "next/link";
import {
    SingleProductDetails,
    WoocomerceCategoryType,
} from "../../../../../utils/woocomerce.types";

const PARENT_ID = 19;

type InternalDataTypes = WoocomerceCategoryType & {
    childrenData?: WoocomerceCategoryType[];
};

const Leftsidebar = ({ params: { locale } }: { params: { locale: string } }) => {
    const t = useTranslations("Footer");

    const [categories, setCategories] = useState<InternalDataTypes[] | null>(
        null,
    );
    const [selectedProducts, setSelectedProducts] = useState<
        SingleProductDetails[]
    >([]);

    const getData = useCallback(async () => {
        try {
            const data = await fetchWooCommerceCategories();

            if (data) {
                const parentElement = data.find(
                    (el) => el.id === PARENT_ID,
                ) as WoocomerceCategoryType;
                const subParentElements = data.filter((el) => el.parent === PARENT_ID);

                const finalData: InternalDataTypes = {
                    ...parentElement,
                    childrenData: subParentElements,
                };

                const responseData = [finalData];
                setCategories(responseData);
            }
        } catch (e) {
            console.warn({ e });
        }
    }, []);

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

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <div
            className={classNames(
                "flex flex-1 flex-row justify-between self-center",
                styles.subCatalog,
            )}
        >
            <div className={classNames("mt-4", styles.subMenu)}>
                <div className={classNames("mt-3", styles.subMenuDashHead)}>
                    Каталог по типу призначення
                </div>

                <Sidebar aria-label="Catalog" className="">
                    <Sidebar.ItemGroup>
                        {categories?.map((el) => (
                            <Sidebar.Collapse
                                key={el.id}
                                className={classNames("", styles.subCollapse)}
                                label={t("or-equipment")}
                                open
                            >
                                {el.childrenData?.map((item) => (
                                    <Sidebar.Item
                                        as="div"
                                        key={item.id}
                                        className={classNames("cursor-pointer", styles.subItem)}
                                        onClick={() => {
                                            getCategoryDetails(item.id);
                                        }}
                                    >
                                        {item.name}
                                    </Sidebar.Item>
                                ))}
                            </Sidebar.Collapse>
                        ))}
                    </Sidebar.ItemGroup>
                </Sidebar>
                <div className={classNames("", styles.subMenuDash)}></div>
            </div>

            <div className="flex flex-wrap justify-around self-center mt-4 mb-4 mx-1 w-full">
                {selectedProducts.length
                    ? selectedProducts.map((el) => {
                        return (
                            <div key={el.id} className={classNames("mx-5", styles.headSubCatalogBlock)}>

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
    );
};

export default Leftsidebar
