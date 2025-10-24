"use client"
import React from "react";
import styles from "./../Shares.module.css";
import { MainLayout } from "@app/[locale]/components/templates";
import Image from "next/image";
import classNames from "classnames";
import linea1 from "./linea1.webp";
import linea2 from "./linea2.webp";
import linea3 from "./linea3.webp";
import { useTranslations } from "next-intl";
import Link from "next/link";

const SharesLinea = () => {
    const t = useTranslations('Shares');
    const t1 = useTranslations("Product");
    return (
        <MainLayout>
            <div
                className={classNames(
                    "w-full flex flex-wrap justify-center mb-3 mt-3",
                )}
            >
                <div className={classNames(
                    "flex flex-col justify-center mb-5 w-full",
                    [styles.catalogContainerDeeper])}>
                    <h3 className="text-justify text-[18px] font-bold sm:text-[20px]">{t('shares-linea-title')}</h3>
                    <div className="flex flex-wrap">
                        <p className="indent-5 text-justify">{t('shares-linea-prehead')} <span className="font-bold text-nowrap">3 103,00 у.о.</span></p>
                        <p><span className="font-bold">{t("shares-atlan300-pehead1")}</span></p>
                        <div className="w-full flex flax-wrap justify-center my-2">
                            <Image
                                className={classNames("w-1/2", styles.img)}
                                src={linea1}
                                width={400}
                                height={100}
                                alt="linea"
                            />
                            <Image
                                className={classNames("w-1/2", styles.img)}
                                src={linea2}
                                width={400}
                                height={100}
                                alt="linea"
                            />
                        </div>
                        <div className="w-screen">
                            -	{t('shares-linea-specific1')}<br />
                            -	{t('shares-linea-specific2')}<br />
                            -	{t('shares-linea-specific3')}<br />
                            -	{t('shares-linea-specific4')}<br />
                            -	{t('shares-linea-specific5')}<br />
                            -	{t('shares-linea-specific6')}<br />
                            -	{t('shares-linea-specific7')}<br />
                            -	{t('shares-linea-specific8')}<br />
                            -	{t('shares-linea-specific9')}<br />
                            -	{t('shares-linea-specific10')}<br />
                            <div className={styles.downloadable}>
                                <Link
                                    href={{
                                        pathname: "../../../../contacts",
                                        query: { productName: t('shares-linea-prehead') },
                                    }}
                                >
                                    {t1("product-request")}
                                </Link>
                            </div>
                        </div>
                        <div className={classNames("self-center my-2 indent-5 text-justify", styles["catalogContainer"])}>
                            <Image
                                className={"w-1/2 float-left mt-1 mb-3 mr-3"}
                                src={linea3}
                                width={500}
                                height={100}
                                alt="linea"
                            />
                            <p className="my-2">{t('shares-linea-text1')}</p>
                            <p className="my-2">{t('shares-linea-text2')}</p>
                        </div>
                    </div>
                </div>

            </div>

        </MainLayout>
    );
};

export default SharesLinea;
