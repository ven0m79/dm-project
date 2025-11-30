"use client"
import React from "react";
import styles from "./../Shares.module.css";
import { MainLayout } from "@app/[locale]/components/templates";
import Image from "next/image";
import classNames from "classnames";
import polaris2_1 from "./polaris200-2-1.webp";
import polaris2_2 from "./polaris200-2-2.webp";
import polaris2_3 from "./polaris200-2-3.webp";
import { useTranslations } from "next-intl";
import Link from "next/link";

const SharesPolaris2002 = () => {
    const t = useTranslations('Shares');
    const t1 = useTranslations('Product');
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

                    <div className="flex flex-wrap">

                        <div className="flex flex-1 flex-col sm:flex-row">
                            <div className="flex flex-col w-full h-auto justify-center">
                                <h3 className="indent-5 sm:indent-2 text-justify text-[18px] font-bold sm:text-[20px]">{t('shares-polaris200-2-title')}</h3>
                                <p className="indent-5 text-justify">{t('shares-polaris200-2-prehead')}
                                    <span className="font-bold text-nowrap"> 21 079,00 у.о.
                                    </span>
                                </p>
                                <p className="font-bold">{t("shares-atlan300-pehead1")}</p>
                            </div>
                            <div className="flex mx-3 justify-center">
                                <div className={styles.downloadable}>
                                    <Link
                                        href={{
                                            pathname: "../../../../contacts",
                                            query: { productName: t('shares-polaris200-2-prehead') },
                                        }}
                                    >
                                        {t1("product-request")}
                                    </Link>
                                </div>
                            </div>
                        </div>


                        <div className="w-full flex flax-wrap justify-center my-2">
                            <Image
                                className={classNames("w-1/2", styles.img)}
                                src={polaris2_1}
                                width={400}
                                height={100}
                                alt="polaris200-2"
                                unoptimized
                            />
                            <Image
                                className={classNames("w-1/2", styles.img)}
                                src={polaris2_2}
                                width={400}
                                height={100}
                                alt="polaris200-2"
                                unoptimized
                            />
                        </div>
                        <div className="w-screen">
                            -	{t('shares-polaris200-2-specific1')}<br />
                            -	{t('shares-polaris200-2-specific2')}<br />
                            -	{t('shares-polaris200-2-specific3')}<br />
                        </div>

                        <div className={classNames("self-center my-2 indent-5 text-justify", styles["catalogContainer"])}>

                            <p className="my-2">{t('shares-polaris200-2-text1')}</p>
                            <p className="my-2">{t('shares-polaris200-2-text2')}</p>
                            <Image
                                className={"w-1/2 float-left mt-1 mb-5 mr-5"}
                                src={polaris2_3}
                                width={500}
                                height={100}
                                alt="polaris200-2"
                                unoptimized
                            />
                            <p className="my-2">{t('shares-polaris200-2-text3')}</p>
                            <p className="my-2">{t('shares-polaris200-2-text4')}</p>
                        </div>
                    </div>
                </div>

            </div>

        </MainLayout>
    );
};

export default SharesPolaris2002;