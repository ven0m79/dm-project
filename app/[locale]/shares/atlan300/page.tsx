import React from "react";
import styles from "./../Shares.module.css";

import { MainLayout } from "@app/[locale]/components/templates";
import { unstable_setRequestLocale } from "next-intl/server";
import { Link } from "config";
import Image from "next/image";
import classNames from "classnames";
import atlan300_1 from "./atlan300_1.webp";
import atlan300_2 from "./atlan300_2.webp";
import vista120 from "./vista120.webp";



const SharesLinea = ({ params: { locale } }: { params: { locale: string } }) => {
    unstable_setRequestLocale(locale);
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
                    <p className=" text-justify text-[24px]">Пропонуємо для стоматологічних клінік, малих операційних та процедурних</p>
                    <div className="flex flex-wrap">
                        <p className="indent-5 text-justify">Апарат наркозно-дихальний Atlan A300: <span className="font-bold">51 700,00 у.о.</span></p>
                        <div className="w-full flex flax-wrap justify-center my-2">
                            <Image
                                className={styles.img}
                                src={atlan300_1}
                                width={400}
                                height={100}
                                alt="Atlan300"
                            />
                        </div>
                        <div className="w-[]">
                            -	Базовий блок A300 на візку – 1<br />
                            -	Механічний змішувач газів, на 3 гази<br />
                            -	Модуль газоналізу xGM AutoID – 1 шт.<br />
                            -	Опція Розширений моніторинг газів<br />
                            -	Опція «Spontaneous breathing support»<br />
                            -	Опція «Expert Views»<br />
                            -	Інтегрований флоуметр О2<br />
                            -	Тримач на 1 випарник<br />
                            -	Тримач на 2 балона<br />
                            -	Розетка 220В – 4 шт.<br />
                            -	Лінія для забору газу – 10 шт.<br />
                            -	Вологозбірник WaterLock2 – 12 шт.<br />
                            -	Датчик потоку Spirolog – 5 шт.<br />
                            -	Шланг O2, 3 м – 1 шт.<br />
                            -	Шланг N2O, 3 м – 1 шт.<br />
                            -	Шланг AIR, 3 м – 1 шт.<br />
                            -	Маска силіконова багаторазова  - 3 шт різних розмірів<br />

                        </div>

                        <div className="w-full flex flax-wrap justify-center my-2">
                            <Image
                                className={styles.img}
                                src={vista120}
                                width={400}
                                height={100}
                                alt="Vista120"
                            />
                        </div>
                        <div className="w-[]">
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
                            -	Температурний датчик нашкірний <br />

                        </div>

                        <div className={classNames("self-center my-2 indent-5 text-justify", styles["catalogContainer"])}>
                            { <Image
                                className={"float-left mt-1 mb-5 mr-5"}
                                src={atlan300_2}
                                width={500}
                                height={100}
                                alt="Atlan300"
                            /> }
                            <p className="my-2">ОПИС!!!!!</p>
                        </div>
                    </div>
                </div>

            </div>

        </MainLayout>
    );
};

export default SharesLinea;
