"use client"
import React from "react";
import styles from "./../Shares.module.css";

import { MainLayout } from "@app/[locale]/components/templates";

import { Link } from "config";
import Image from "next/image";
import classNames from "classnames";
import fabius1 from "./fabius1.webp";
import fabius2 from "./fabius2.webp";
import fabius3 from "./fabius3.webp";
import { useTranslations } from "next-intl";



const SharesFabiusXL = ({ params: { locale } }: { params: { locale: string } }) => {
    
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
                    <p className=" text-centered text-[24px]">{t('shares-fabius-title')}</p>
                    <p className="text-justify">{t('shares-fabius-pehead')} <span className="font-bold">45 450,00 у.о.</span></p>
                    <div className="flex flex-row">
                        <div className="flex flex-row w-[1050px]">
                            <div className="flex flex-row justify-center items-center w-[500px]">
                                <Image
                                    className={styles.img}
                                    src={fabius1}
                                    width={490}
                                    height={633}
                                    alt="FabiusXL"
                                />

                            </div>
                            <div className="pl-10 w-[525px]">
                                -	<span className="font-bold">{t('shares-fabius-specific1')}</span><br />
                                -	{t('shares-fabius-specific2')}<br />
                                -	{t('shares-fabius-specific3')}<br />
                                -	{t('shares-fabius-specific4')}<br />
                                -	{t('shares-fabius-specific5')}<br />
                                -	{t('shares-fabius-specific6')}<br />
                                -	{t('shares-fabius-specific7')}<br />
                                -	{t('shares-fabius-specific8')}<br />
                                -	{t('shares-fabius-specific9')}<br />
                                -	{t('shares-fabius-specific10')}<br />
                                -	{t('shares-fabius-specific11')}<br />
                                -	{t('shares-fabius-specific12')}<br />
                                -	{t('shares-fabius-specific13')}<br />
                                -	{t('shares-fabius-specific14')}<br />
                                -	{t('shares-fabius-specific15')}<br />
                                -	{t('shares-fabius-specific16')}<br />
                                <br />
                                -	<span className="font-bold">{t('shares-vista120-specific1')}</span><br />
                                -	{t('shares-vista120-specific1')}<br />
                                -	{t('shares-vista120-specific2')}<br />
                                -	{t('shares-vista120-specific3')}<br />
                                -	{t('shares-vista120-specific4')}<br />
                                -	{t('shares-vista120-specific5')}<br />
                                -	{t('shares-vista120-specific6')}<br />
                                -	{t('shares-vista120-specific7')}<br />
                                -	{t('shares-vista120-specific8')}<br />
                                -	{t('shares-vista120-specific9')}<br />
                                -	{t('shares-vista120-specific10')}<br />
                                -	{t('shares-vista120-specific11')}<br />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classNames("self-center my-2 indent-5 text-justify", styles["catalogContainer"])}>

                    <p className="my-2">{t('shares-fabius-text1')}</p>

                    <p className="my-2">{t('shares-fabius-text2')}</p>
                    <Image
                        className={"float-right mt-2 ml-5"}
                        src={fabius3}
                        width={500}
                        height={100}
                        alt="FabiusXL"
                    />
                    <p className="my-2">{t('shares-fabius-text3')}</p>
                    <p className="my-2">{t('shares-fabius-text4')}</p>
                    <p className="my-2">{t('shares-fabius-text5')}</p>
                    <p className="my-2">{t('shares-fabius-text6')}</p>
                    <p className="my-2">{t('shares-fabius-text7')}</p>
                    <p className="my-2">{t('shares-fabius-text8')}</p>
                    <p className="my-2">{t('shares-fabius-text9')}</p>

                </div>
            </div>

        </MainLayout >
    );
};

export default SharesFabiusXL;
