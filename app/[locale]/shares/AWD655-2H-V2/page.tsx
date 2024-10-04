import React from "react";
import styles from "./../Shares.module.css";

import { MainLayout } from "@app/[locale]/components/templates";
import { unstable_setRequestLocale } from "next-intl/server";
import { Link } from "config";
import Image from "next/image";
import classNames from "classnames";
import awd655_2h_v2 from "./awd655-2h-v2.webp"

import { useTranslations } from "next-intl";


const AWD655_2h_v2 = ({ params: { locale } }: { params: { locale: string } }) => {
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
                    "flex flex-col justify-center items-center mb-5 gap-5",
                    [styles.catalogContainerDeeper])}>
                    <p className=" text-centered text-[24px]">{t('shares-awd655-h2-v2-title')}</p>
                    <p className="text-justify">{t('shares-awd655-h2-v2-prehead')} <span className="font-bold">9 500,00 у.о.</span></p>
                    <div className="flex flex-row">
                        <div className="flex flex-row w-[1050px]">
                            <div className="flex flex-row justify-center items-center w-[500px]">
                                <Image
                                    className={styles.img}
                                    src={awd655_2h_v2}
                                    width={290}
                                    height={300}
                                    alt="awd655-h2-v2"
                                />

                            </div>
                            <div className="pl-10 w-[525px]">
                                -	{t('shares-awd655-h2-v2-specific1')}<br />
                                -	{t('shares-awd655-h2-v2-specific2')}<br />
                                -	{t('shares-awd655-h2-v2-specific3')}<br />
                                -	{t('shares-awd655-h2-v2-specific4')}<br />
                                -	{t('shares-awd655-h2-v2-specific5')}<br />
                                -	{t('shares-awd655-h2-v2-specific6')}<br />
                                -	{t('shares-awd655-h2-v2-specific7')}<br />
                                -	{t('shares-awd655-h2-v2-specific8')}<br />
                                -	{t('shares-awd655-h2-v2-specific9')}<br />
                                -	{t('shares-awd655-h2-v2-specific10')}<br />
                                -	{t('shares-awd655-h2-v2-specific11')}<br />
                                -	{t('shares-awd655-h2-v2-specific12')}<br />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classNames("self-center mb-2 indent-5 text-justify", styles["catalogContainer"])}>

                    <p className="my-2">{t('shares-awd655-h2-v1-text1')}</p>

                    <p className="my-2">{t('shares-awd655-h2-v1-text2')}</p>
                    <p className="my-2">{t('shares-awd655-h2-v1-text3')}</p>
                    {/* <Image
                        className={"float-right mt-2 ml-5"}
                        src={fabius3}
                        width={500}
                        height={100}
                        alt="FabiusXL"
                    /> */}


                </div>
            </div>

        </MainLayout >
    );
};

export default AWD655_2h_v2;
