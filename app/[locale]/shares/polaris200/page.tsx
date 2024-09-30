import React from "react";
import styles from "./../Shares.module.css";

import { MainLayout } from "@app/[locale]/components/templates";
import { unstable_setRequestLocale } from "next-intl/server";
import { Link } from "config";
import Image from "next/image";
import classNames from "classnames";
import polaris1 from "./polaris200-1.webp";
import polaris2 from "./polaris200-2.webp";
import polaris3 from "./polaris200-3.webp";
import { useTranslations } from "next-intl";


const SharesPolaris200 = ({ params: { locale } }: { params: { locale: string } }) => {
    unstable_setRequestLocale(locale);
    const t = useTranslations('Shares');
    return (
        <MainLayout>
            <div
                className={classNames(
                    "w-full flex flex-wrap justify-center mb-5 gap-5 mt-5",

                )}
            >
                <div className={classNames(
                    "flex flex-col justify-center mb-5 gap-5 w-[900px]",
                    [styles.catalogContainerDeeper])}>
                    <p className=" text-justify text-[24px]">{t('shares-polaris200-title')}</p>
                    <div className="flex flex-wrap">
                        <p className="indent-5 text-justify">{t('shares-polaris200-prehead')}<span className="font-bold">11 556,00 у.о.</span></p>
                        <div className="w-full flex flax-wrap justify-center my-2">
                            <Image
                                className={styles.img}
                                src={polaris1}
                                width={400}
                                height={100}
                                alt="polaris200"
                            />
                            <Image
                                className={styles.img}
                                src={polaris2}
                                width={400}
                                height={100}
                                alt="polaris200"
                            />
                        </div>
                        <div className="w-[]">
                            -	{t('shares-polaris200-specific1')}<br />
                            -	{t('shares-polaris200-specific2')}<br />
                            -	{t('shares-polaris200-specific3')}<br />
                        </div>

                        <div className={classNames("self-center my-2 indent-5 text-justify", styles["catalogContainer"])}>
                            
                            <p className="my-2">{t('shares-polaris200-text1')}</p>
                            <p className="my-2">{t('shares-polaris200-text2')}</p>
                            <Image
                                className={"float-left mt-1 mb-5 mr-5"}
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
