"use client"
import React from "react";
import styles from "./../Shares.module.css";

import { MainLayout } from "@app/[locale]/components/templates";
import { Link } from "config";
import Image from "next/image";
import classNames from "classnames";
import linea1 from "./linea1.webp";
import linea2 from "./linea2.webp";
import linea3 from "./linea3.webp";
import { useTranslations } from "next-intl";


const SharesLinea = ({ params: { locale } }: { params: { locale: string } }) => {
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
                    <p className=" text-justify text-[24px]">{t('shares-linea-title')}</p>
                    <div className="flex flex-wrap">
                        <p className="indent-5 text-justify">{t('shares-linea-prehead')} <span className="font-bold">2 996,00 у.о.</span></p>
                        <div className="w-full flex flax-wrap justify-center my-2">
                            <Image
                                className={styles.img}
                                src={linea1}
                                width={400}
                                height={100}
                                alt="linea"
                            />
                            <Image
                                className={styles.img}
                                src={linea2}
                                width={400}
                                height={100}
                                alt="linea"
                            />
                        </div>
                        <div className="w-[]">
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
                        </div>

                        <div className={classNames("self-center my-2 indent-5 text-justify", styles["catalogContainer"])}>
                            {/* <p className="my-2">Поєднайте ергономіку та економічність з використанням настінних консолей (панелей), які нададуть вам електричні, газові та ІТ-рішення.</p> */}
                            <Image
                                className={"float-left mt-1 mb-5 mr-5"}
                                src={linea3}
                                width={500}
                                height={100}
                                alt="linea"
                            />
                            <p className="my-2">{t('shares-linea-text1')}</p>
                            <p className="my-2">{t('shares-linea-text2')}</p>
                            {/* <p className="my-2">Як і всі рішення Dräger, сімейство продуктів Linea також допомагає зробити повсякденні робочі процеси ефективнішими. Dräger робить гнучкість і сумісність основними акцентами своєї продукції. Linea дає змогу ефективно використовувати особливості приміщення. Інтеграція стандартних рейок дозволяють використовувати ряд аксесуарів від Dräger та інших виробників, тому ви можете комбінувати аксесуари повністю відповідно до ваших вимог.</p> */}
                        </div>
                    </div>
                </div>

            </div>

        </MainLayout>
    );
};

export default SharesLinea;
