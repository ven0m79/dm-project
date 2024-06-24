import React from "react";
import styles from "./../Shares.module.css";

import { MainLayout } from "@app/[locale]/components/templates";
import { unstable_setRequestLocale } from "next-intl/server";
import { Link } from "config";
import Image from "next/image";
import classNames from "classnames";
import linea1 from "./linea1.webp";
import linea2 from "./linea2.webp";


const SharesLinea = ({ params: { locale } }: { params: { locale: string } }) => {
    unstable_setRequestLocale(locale);
    return (
        <MainLayout>
            <div
                className={classNames(
                    "text-2xl flex flex-wrap justify-start mb-5 gap-5 mt-5 text-slate-950",
                    [styles.catalogContainer],
                )}
            >
                <p className="font font-bold indent-5">Панель Linea</p>
                <p className="indent-5 text-justify">ТОВ «ДМ-ПРОЕКТ», уповноважений представник Drägerwerk AG & Co. KGaA (Німеччина) в Україні, пропонує до поставки наступне медичне обладнання для стоматології:</p>

                <div>
                    <div className="flex flex-row gap-[1px] w-[1400px] bg-black justify-center">
                        <div className="w-[80px] my-[1px] bg-slate-200 self-center items-center justify-center flex">№ з/п</div>
                        <div className="w-[700px] my-[1px] bg-slate-200 justify-center flex">Найменування обладнання:</div>
                        <div className="w-[200px] my-[1px] bg-slate-200 justify-center flex">Ціна за од., євро</div>
                        <div className="w-[114px] my-[1px] bg-slate-200 justify-center flex">Кількість</div>
                        <div className="w-[300px] my-[1px] bg-slate-200 justify-center flex">Загальна вартість, євро</div>
                    </div>
                    <div className="flex flex-row gap-1 w-[1400px] m-1">
                        <div className="w-[80px] justify-center flex">1</div>
                        <div className="w-[700px]">Консоль медична з настінним кріпленням Лінеа IM2, у комплекті:<br />
                            <Image
                                className={styles.img}
                                src={linea1}
                                width={700}
                                height={100}
                                alt="linea"
                            />
                            <Image
                                className={styles.img}
                                src={linea2}
                                width={700}
                                height={100}
                                alt="linea"
                            />
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
                        <div className="w-[200px] justify-center flex">2 996,00</div>
                        <div className="w-[116px] justify-center flex">1</div>
                        <div className="w-[300px] justify-center flex">2 996,00</div>
                    </div>
                </div>

            </div>
            <div className={classNames("w-[1400px] self-center my-2 indent-5 text-justify", styles["sharesText"])}>
                <p className="my-2">Поєднайте ергономіку та економічність з використанням настінних консолей (панелей), які нададуть вам електричні, газові та ІТ-рішення.</p>
                <p className="my-2">Лінійка продуктів Linea розроблена для використання практично у всіх сферах. У звичайних палатах, відділеннях інтенсивної терапії, наркозних/операційних, реабілітації – завдяки своїй модульній конструкції сімейство Linea є індивідуальним рішенням для подачі медіа для багатьох застосувань у лікарні.</p>
                <p className="my-2">Продукти Linea виготовлені зі стійких екструдованих алюмінієвих профілів із закругленими краями та ідеально інтегрованими з’єднаннями для максимальної безпеки, простоти чищення та гігієни. Як частина єдиної концепції підготовки, існує стандартизований список із понад 20 дезінфікуючих засобів, доступних для сімейства Linea, як і для інших пристроїв та аксесуарів Dräger. Відсутність рухомих частин також зводить до мінімуму необхідні роботи з обслуговування.</p>
                <p className="my-2">Як і всі рішення Dräger, сімейство продуктів Linea також допомагає зробити повсякденні робочі процеси ефективнішими. Dräger робить гнучкість і сумісність основними акцентами своєї продукції. Linea дає змогу ефективно використовувати особливості приміщення. Інтеграція стандартних рейок дозволяють використовувати ряд аксесуарів від Dräger та інших виробників, тому ви можете комбінувати аксесуари повністю відповідно до ваших вимог.</p>
                <p className="my-2">Умови оплати – згідно умов договору.</p>
                <p className="my-2">                Термін поставки – протягом 10 днів за заявкою Покупця.</p>
                <p className="my-2">Умови поставки - DDP Україна (ІНКОТЕРМС 2020), включає монтаж* на місці експлуатації та навчання персоналу користувача роботі з обладнанням.</p>
                <p className="">(* монтаж не включає прокладку кабелів електроживлення та газових труб до місця кріплення панелі).</p>
                <p className="my-2">Гарантійний період - 12 міс. з моменту введення обладнання у експлуатацію.</p>
                <p className="mt-2 font-bold">З повагою,</p>
                <p className="mb-2 font-bold">Директор ТОВ «ДМ-ПРОЕКТ»	-	                                   				Тарас ТКАЧУК</p>
            </div>
        </MainLayout>
    );
};

export default SharesLinea;
