"use client";
import React, { useState } from "react";
import classNames from "classnames";
import { MainLayout } from "@app/[locale]/components/templates";
import styles from "../Partners.module.css";
import { useTranslations } from "next-intl";
import Image from "next/image";

import dreger from "../../../../public/logo-partners/dreger-log-partner-big.webp";
import Link from "next/link";


type ClientPageProps = {
    locale: string;
    brands: {
        id: number;
        name: string;
        slug: string;
    };
    products: any[];
};

export const ClientPage = ({
    locale,
    brands,
    products,
}: ClientPageProps) => {

    return (
        <MainLayout>
            <div className="flex flex-col justify-center items-center w-full max-w-[1000px]">
                <div className="flex flex-shrink-0 sm:flex-row flex-col w-full">
                    <div className="flex w-full h-auto">
                        <Image
                            className=""
                            src={dreger}
                            alt="Dräger"
                            width={400}
                            height={400}
                        />
                    </div>
                    <div className="text-[#0061AA] w-full indent-0 sm:indent-5 leading-relaxed text-justify self-center sm:px-0 px-2">
                        <h1 className="text-[24px] sm:text-[30px] font-semibold text-[#002766]">Drägerwerk AG & Co. KGaA</h1>
                        <div className="text-[16px] sm:text-[20px]"><strong className="text-[#002766]">Рік заснування:</strong> 1889</div>
                        <div className="text-[16px] sm:text-[20px]"><strong className="text-[#002766]">Країна:</strong> Німеччина</div>
                        <div className="text-[16px] sm:text-[20px]"><strong className="text-[#002766]">Офіційний сайт:</strong>
                            <Link href="https://www.draeger.com/" target="_blank"> https://www.draeger.com/</Link></div>
                        <div className="text-[18px] sm:text-[20px]"><strong className="text-[#002766]">Cоціальні мережі:</strong>
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
                <div className="flex flex-col self-center justify-center gap-4 pb-3 sm:px-0 px-2">
                    <div className="text-[#0061AA] w-full indent-5 leading-relaxed text-justify pt-4">Dräger — бренд із Німеччини з історією понад століття. Компанія працює з 1889 року та пройшла шлях від інженерних
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
                    <div className="flex sm:flex-row justify-around flex-col gap-3">
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
                    <div>
                        <div className="flex flex-col justify-center items-center w-full max-w-[1000px]">
                            {/* PRODUCTS */}
                            <div className="w-full pt-10">
                                <h2 className="text-[22px] font-semibold text-[#002766] mb-4">
                                    Обладнання бренду {brands?.name}
                                </h2>
                                {products.length === 0 && (
                                    <div>Товари для цього бренду відсутні</div>
                                )}
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {products.map((product) => (
                                        <div
                                            key={product.id}
                                            className="border rounded-lg p-4 flex flex-col gap-3"
                                        >
                                            {product.images?.[0] && (
                                                <Image
                                                    src={product.images[0].src}
                                                    alt={product.images[0].alt || product.name}
                                                    width={300}
                                                    height={300}
                                                    className="object-contain"
                                                />
                                            )}

                                            <h3 className="font-semibold text-[#002766]">
                                                {product.name}
                                            </h3>

                                            <Link
                                                href={`/${locale}/product/${product.id}`}
                                                className="text-[#0061AA] underline"
                                            >
                                                Переглянути товар
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </MainLayout >
    );
};
