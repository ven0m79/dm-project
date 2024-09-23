import React from "react";
import styles from "./../Shares.module.css";

import { MainLayout } from "@app/[locale]/components/templates";
import { unstable_setRequestLocale } from "next-intl/server";
import { Link } from "config";
import Image from "next/image";
import classNames from "classnames";
import fabius1 from "./fabius1.webp";
import fabius2 from "./fabius2.webp";
import fabius3 from "./fabius3.webp";



const SharesFabiusXL = ({ params: { locale } }: { params: { locale: string } }) => {
    unstable_setRequestLocale(locale);
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
                    <p className=" text-centered text-[24px]">Пропонуємо готове рішення для вашої операційної </p>
                    <p className="text-justify">Апарат наркозно-дихальний Fabius plus XL та Монітор пацієнта Vista 120S: <span className="font-bold">45 450,00 у.о.</span></p>
                    <div className="flex flex-row">
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex flex-row justify-center items-center w-[800px]">
                                <Image
                                    className={styles.img}
                                    src={fabius1}
                                    width={1200}
                                    height={800}
                                    alt="FabiusXL"
                                />

                            </div>
                            <div className="flex flex-row">
                            <div className="pl-20 w-[525px]">
                                -	Базовий блок Fabius Plus XL на візку<br />
                                -	Механічний змішувач газів, на 3 гази<br />
                                -	Модуль газоналізу Scio Four Oxi<br />
                                -	Режими вентиляції PCV, VCV, MAN, Spont<br />
                                -	Зовнішній флоуметр О2<br />
                                -	Тримач на 2 випарника<br />
                                -	Тримач на 1 балон<br />
                                -	Розетка 220В – 2 шт.<br />
                                -	Лінія для забору газу – 10 шт.<br />
                                -	Вологозбірник WaterLock2 – 12 шт.<br />
                                -	Датчик потоку Spirolog – 5 шт.<br />
                                -	Шланг O2, 3 м – 1 шт.<br />
                                -	Шланг N2O, 3 м – 1 шт.<br />
                                -	Шланг AIR, 3 м – 1 шт.<br />
                                -	Випарник севофлюрану Vapor 2000<br />
                                -	Кріплення для монітора
                            </div>
                            <div className="ml-5 w-[525px]">
                                -	Основний блок монітора<br />
                                -	Папір для принтера - 4 рул.<br />
                                -	Батарея літій-іонна<br />
                                -	Основний кабель ЕКГ<br />
                                -	Кабель ЕКГ на 3 відведення<br />
                                -	Подовжувальний кабель SPO2, 3 м<br />
                                -	Багаторазовий датчик SPO2 на палець DS100A для дорослих<br />
                                -	Багаторазовий мультіпозиційний датчик SPO2<br />
                                -	Шланг для манжет НІАТ<br />
                                -	Манжета для виміру НІАТ, 5 розмірів<br />
                                -	Температурний датчик нашкірний<br />
                            </div>
                            </div>
                        </div>




                    </div>
                    <div className={classNames("self-center my-2 indent-5 text-justify", styles["catalogContainer"])}>
                        <Image
                            className={"float-left mt-2 mb-2 mr-5"}
                            src={fabius3}
                            width={500}
                            height={100}
                            alt="FabiusXL"
                        />
                        <p className="my-2">Поєднання наркозного апарата Fabius plus XL та мультипараметричного монітора Vista 120S  забезпечує справжню інтегровану функціональність робочої станції. </p>
                        <p className="my-2">Наркозно-дихальний апарат Fabius plus XL призначений для інгаляційної анестезії з низьким потоком у дорослих та дітей. </p>
                        <p className="my-2">Fabius plus XL забезпечує ефективну вентиляцію на рівні вимог для інтенсивної терапії в режимах: Ручна/Спонтанна (MAN/SPON), Контрольована за тиском (PC-CMV), Контрольована за об'ємом (VC-CMV), має інтегрований поршневий вентилятор з електронним керуванням та електричним приводом (не потрібен рушійний газ), дихальну систему із вбудованим нагрівачем для підігріву дихального газу та зменшення конденсації, механічний змішувач газів на 3 гази, резервне живлення від батареї до 120 хвилин (час роботи мінімум 45 хвилин), висококонтрастний монітор 10,5’’, великі ящики для зберігання.</p>
                        <p className="my-2">Модуль газоналізу Scio Four Oxi вимірює значення O2 на вдиху та видиху, CO2, N2O та анестетиків.</p>
                        <p className="my-2">Показники відображаються на моніторі пацієнта Vista 120S.</p>
                        <p className="my-2">Монітор пацієнта Vista 120S забезпечує спостереження фізіологічних показників у пацієнтів різних вікових груп: ЕКГ на 3 відведення, SpO2, температура, дихання, неінвазивне вимірювання артеріального тиску.	</p>
                        <p className="my-2">Vista 120S  має 12" кольоровий сенсорний TFT екран, 8 каналів (відображення до 11 кривих), інтерфейс моніторингу газів, зберігає до 120 годин трендів основних параметрів, до 1200 вимірювань НІАТ і 200 тривожних подій, працює 350 хвилин від батареї.</p>
                        <p className="my-2">Анестезіологічна станція Fabius plus XL / Vista 120S допоможе максимально збільшити ваш терапевтичний потенціал і підвищити безпеку пацієнтів.</p>

                    </div>
                </div>

            </div>

        </MainLayout>
    );
};

export default SharesFabiusXL;
