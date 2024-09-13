import React from "react";
import styles from "./../Shares.module.css";

import { MainLayout } from "@app/[locale]/components/templates";
import { unstable_setRequestLocale } from "next-intl/server";
import { Link } from "config";
import Image from "next/image";
import classNames from "classnames";
import linea1 from "./linea1.webp";
import linea2 from "./linea2.webp";
import linea3 from "./linea3.webp";


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
                        <p className="indent-5 text-justify">Консоль медична з настінним кріпленням Лінеа IM2: <span className="font-bold">2 996,00 у.о.</span></p>
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
                            -	панель з настінним кріпленням L=1200мм, розміщення роз’ємів у 2 ряди;<br />
                            -	розетка газова О2 – 2шт;<br />
                            -	розетка газова Air – 2шт;<br />
                            -	розетка газова Vac – 1шт;<br />
                            -	розетка відводу відпрацьованих газів – 1шт;<br />
                            -	розетка електрична з LED індикатором – 5шт;<br />
                            -	розетка RJ45 подвійна – 1шт;<br />
                            -	роз’єм PE – 2шт;<br />
                            -	додаткова вбудована медична рейка у нижній частині – 1шт;<br />
                            -	інфузійна стійка з кріпленням у двох точках на медичну рейку – 1шт.
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
                            <p className="my-2">Лінійка продуктів Linea розроблена для використання практично у всіх сферах. У звичайних палатах, відділеннях інтенсивної терапії, наркозних/операційних, реабілітації – завдяки своїй модульній конструкції сімейство Linea є індивідуальним рішенням для подачі медіа для багатьох застосувань у лікарні.</p>
                            <p className="my-2">Продукти Linea виготовлені зі стійких екструдованих алюмінієвих профілів із закругленими краями та ідеально інтегрованими з’єднаннями для максимальної безпеки, простоти чищення та гігієни. Як частина єдиної концепції підготовки, існує стандартизований список із понад 20 дезінфікуючих засобів, доступних для сімейства Linea, як і для інших пристроїв та аксесуарів Dräger. Відсутність рухомих частин також зводить до мінімуму необхідні роботи з обслуговування.</p>
                            {/* <p className="my-2">Як і всі рішення Dräger, сімейство продуктів Linea також допомагає зробити повсякденні робочі процеси ефективнішими. Dräger робить гнучкість і сумісність основними акцентами своєї продукції. Linea дає змогу ефективно використовувати особливості приміщення. Інтеграція стандартних рейок дозволяють використовувати ряд аксесуарів від Dräger та інших виробників, тому ви можете комбінувати аксесуари повністю відповідно до ваших вимог.</p> */}
                        </div>
                    </div>
                </div>

            </div>

        </MainLayout>
    );
};

export default SharesLinea;
