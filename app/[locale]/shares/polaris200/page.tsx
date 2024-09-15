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


const SharesPolaris200 = ({ params: { locale } }: { params: { locale: string } }) => {
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
                        <p className="indent-5 text-justify">Світильник операційний Polaris 200 однокупольний: <span className="font-bold">11 556,00 у.о.</span></p>
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
                            -	купол світильника Polaris 200 на підпружиненому важелі – 1шт;<br />
                            -	центральна вісь Axis 1f – 1шт;<br />
                            -	з’ємні стерилізуємі рукоятки – 2шт.
                        </div>

                        <div className={classNames("self-center my-2 indent-5 text-justify", styles["catalogContainer"])}>
                            <Image
                                className={"float-left mt-1 mb-5 mr-5"}
                                src={polaris3}
                                width={500}
                                height={100}
                                alt="polaris200"
                            />
                            <p className="my-2">Системи хірургічного освітлення Polaris®200 забезпечують прохолодне світло з природними кольорами та насиченим контрастом для тисяч годин безтурботної роботи без навантаження на бюджет вашої лікарні.</p>
                            <p className="my-2">Максимальна потужність 160 000 люкс. Інтенсивність світла можна легко зменшити до 40 000 люкс. Кожен світлодіод оснащений власною системою відбивачів лінз. Однорідний світловий стовп обох ламп надає хірургу контрольований тінь, насичений контурами, природно кольорову передачу операційного поля.</p>
                            <p className="my-2">Класичний круглий дизайн включає інтегровані ручки для нестерильного персоналу та панель керування для зручного використання та експлуатації. Стерильний персонал може легко встановити Polaris 200 за допомогою центральної стерилізуємої рукоятки. Ви можете вибрати стерилізовану або стерильну ручку, залежно від вашої концепції запобігання інфекції. Кожна з чотирьох чітко позначених кнопок керування виконує одну функцію. Гладкий безшовний корпус робить прибирання швидким і простим, а його легка конструкція забезпечує практичне легке розміщення.</p>
                            <p className="my-2">Система хірургічного освітлення Polaris 200 — це економічне, високоефективне рішення для щоденної хірургічної роботи. Цей світильник створено для років безтурботної експлуатації та мінімального обслуговування. Його виняткова надійність і співвідношення ціна/якість допоможуть вам скоротити інвестиційні витрати сьогодні, а також витрати на обслуговування та експлуатацію завтра.</p>
                        </div>
                    </div>
                </div>

            </div>

        </MainLayout>
    );
};

export default SharesPolaris200;
