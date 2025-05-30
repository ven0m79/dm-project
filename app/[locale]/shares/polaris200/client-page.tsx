"use client"
import React from "react";
import styles from "./../Shares.module.css";
import { MainLayout } from "@app/[locale]/components/templates";
import Image from "next/image";
import classNames from "classnames";
import polaris1 from "./polaris200-1.webp";
import polaris2 from "./polaris200-2.webp";
import polaris3 from "./polaris200-3.webp";
import { useTranslations } from "next-intl";

const SharesPolaris200 = () => {

    const t = useTranslations('Shares');
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
                    <p className="text-justify text-[18px] font-bold sm:text-[20px]">{t('shares-polaris200-title')}</p>
                    <div className="flex flex-wrap">
                        <p className="indent-5 text-justify">{t('shares-polaris200-prehead')}<span className="font-bold text-nowrap">11 556,00 у.о.</span></p>
                        <div className="w-full flex flax-wrap justify-center my-2">
                            <Image
                                className={classNames("w-1/2",styles.img)}
                                src={polaris1}
                                width={400}
                                height={100}
                                alt="polaris200"
                            />
                            <Image
                                className={classNames("w-1/2",styles.img)}
                                src={polaris2}
                                width={400}
                                height={100}
                                alt="polaris200"
                            />
                        </div>
                        <div className="w-screen">
                            -	{t('shares-polaris200-specific1')}<br />
                            -	{t('shares-polaris200-specific2')}<br />
                            -	{t('shares-polaris200-specific3')}<br />
                        </div>

                        <div className={classNames("self-center my-2 indent-5 text-justify", styles["catalogContainer"])}>
                            
                            <p className="my-2">{t('shares-polaris200-text1')}</p>
                            <p className="my-2">{t('shares-polaris200-text2')}</p>
                            <Image
                                className={"w-1/2 float-left mt-1 mb-5 mr-5"}
                                src={polaris3}
                                width={500}
                                height={100}
                                alt="polaris200"
                            />
                            <p className="my-2">{t('shares-polaris200-text3')}</p>
                            <p className="my-2">{t('shares-polaris200-text4')}</p>
                        </div>
                    </div>
                </div>

            </div>

        </MainLayout>
    );
};

export default SharesPolaris200;
