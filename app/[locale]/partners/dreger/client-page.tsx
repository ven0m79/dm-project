"use client";
import React, { useState } from "react";
import classNames from "classnames";
import { MainLayout } from "@app/[locale]/components/templates";
import styles from "../Partners.module.css";
import { useTranslations } from "next-intl";
import Image from "next/image";

import dreger from "../../../../public/logo-partners/dreger-log-partner.webp";
import Link from "next/link";

export const ClientPage = ({ params: { locale } }: { params: { locale: string } }) => {
    const t = useTranslations("AboutPage");

    return (
        <MainLayout>
            <div className="flex flex-col justify-center items-center w-full max-w-[1000px]">
                <div className="flex  sm:flex-row flex-col">
                    <div className="w-[400px]">
                        <Image
                            className=""
                            src={dreger}
                            alt="Dräger"
                            width={300}
                            height={300}
                        />
                    </div>
                    <div className="text-[#0061AA] w-full indent-5 leading-relaxed text-justify self-center">
                        <h1 className="text-[24px]">Drägerwerk AG & Co. KGaA</h1>
                        <div><strong>Рік заснування:</strong> 1889</div>
                        <div><strong>Країна:</strong> Німеччина</div>
                        <div><strong>Офіційний сайт:</strong>
                            <Link href="https://www.draeger.com/" target="_blank"> https://www.draeger.com/</Link></div>
                        <div><strong>Cоціальні мережі:</strong>
                            <div className="flex flex-row pl-10 pt-2">
                                <div
                                    className={"flex items-center justify-center gap-4"}
                                >
                                    <Link href="https://www.linkedin.com/company/draeger" target="_blank">
                                        <Image className="transition-transform hover:scale-110" src="/linkedin.webp" width={30} height={30} alt="Logo Linkedin" />
                                    </Link>

                                    <Link href="https://www.youtube.com/Draeger" target="_blank">
                                        <Image className="transition-transform hover:scale-110" src="/youtube-ico.jpg" width={30} height={30} alt="Logo Youtube" />
                                    </Link>

                                    <Link className="transition-transform hover:scale-110" href="https://www.facebook.com/DraegerGlobal/" target="_blank">
                                        <Image src="/facebook-ico.jpg" width={30} height={30} alt="Logo Facebook" />
                                    </Link>

                                    <Link className="transition-transform hover:scale-110" href="https://www.instagram.com/draeger.global/" target="_blank">
                                        <Image src="/instagram.webp" width={30} height={30} alt="Logo Instagram" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col self-center justify-center gap-4 pb-3">
                    <div className="text-[#0061AA] w-full indent-5 leading-relaxed text-justify">Dräger — бренд із Німеччини з історією понад століття. Компанія працює з 1889 року та пройшла шлях від інженерних
                        розробок до масштабного виробництва медичних систем, які використовують у лікарнях у багатьох країнах світу.
                        У медичному напрямку Dräger асоціюється з надійністю обладнання, продуманістю інтерфейсів та увагою до сценаріїв,
                        у яких важлива кожна секунда — від операційної до відділення інтенсивної терапії.

                        <p>Асортимент медичної продукції Dräger охоплює базові потреби стаціонару та критичної допомоги. Це рішення для
                            анестезіології та операційних (анестезіологічні робочі місця й системи), апарати штучної вентиляції легень для
                            різних клінічних ситуацій, системи моніторингу пацієнта та суміжні рішення для організації безперервного контролю
                            показників. Окремий напрям — неонатальні рішення, зокрема обладнання для підтримки стабільного середовища й догляду
                            за новонародженими, що критично для відділень, де значення мають точні налаштування та прогнозована робота техніки.</p>

                        <p>Придбати продукцію Dräger в DM Project зручно, коли потрібен швидкий і зрозумілий підбір під задачу відділення та
                            комплектація в одному місці. Тут легше узгодити потрібні позиції між собою, уникнути помилок сумісності та
                            отримати рішення, яке коректно закриває реальний клінічний сценарій, а не просто “окремий пристрій у вакуумі”.</p>

                        <p>Обирайте Dräger у каталозі DM Project — щоб отримати перевірені медичні рішення з логічною комплектацією та
                            прозорим шляхом від вибору до покупки.</p>
                    </div>
                    <div className="flex sm:flex-row justify-around flex-col">
                        <button
                            className={styles.loadProducts}
                            type="button" // змінено з submit на button

                        >
                            {'Завантажити обладнання Dräger'}
                        </button>
                        <button
                            className={styles.loadProducts}
                            type="button" // змінено з submit на button

                        >
                            {'Завантажити аксесуари Dräger'}
                        </button>
                    </div>
                </div>
            </div>

        </MainLayout >
    );
};
