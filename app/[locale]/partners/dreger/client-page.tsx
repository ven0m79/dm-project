"use client";
import React, { useState } from "react";
import classNames from "classnames";
import { MainLayout } from "@app/[locale]/components/templates";
import styles from "../Partners.module.css";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { isIOS } from "utils/constants";

type ClientPageProps = {
    locale: string;
    brands: {
        id: number;
        name: string;
        slug: string;
    };
    products: any[];
};

export const ClientPage = ({ locale, brands, products }: ClientPageProps) => {
    const ITEMS_PER_PAGE = 15;
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const loadMore = () => setVisibleCount(prev => prev + ITEMS_PER_PAGE);
    const visibleProducts = products.slice(0, visibleCount);

    return (
        <MainLayout>
            <div className="flex flex-col justify-center items-center w-full max-w-[1000px]">
                {/* BRAND INFO */}
                <div className="flex flex-shrink-0 sm:flex-row flex-col w-full">
                    <div className="flex w-full h-auto">
                        <Image src="/logo-partners/dreger-log-partner-big.webp" alt="Dräger" width={400} height={400} />
                    </div>
                    <div className="text-[#0061AA] w-full indent-0 sm:indent-5 leading-relaxed text-justify self-center sm:px-0 px-2">
                        <h1 className="text-[24px] sm:text-[30px] font-semibold text-[#002766]">Drägerwerk AG & Co. KGaA</h1>
                        <div className="text-[16px] sm:text-[20px]"><strong className="text-[#002766]">Рік заснування:</strong> 1889</div>
                        <div className="text-[16px] sm:text-[20px]"><strong className="text-[#002766]">Країна:</strong> Німеччина</div>
                        <div className="text-[16px] sm:text-[20px]"><strong className="text-[#002766]">Офіційний сайт:</strong>
                            <Link href="https://www.draeger.com/" target="_blank">https://www.draeger.com/</Link>
                        </div>
                        <div className="text-[18px] sm:text-[20px]"><strong className="text-[#002766]">Cоціальні мережі:</strong>
                            <div className="flex flex-row pl-10 pt-2 gap-4">
                                <Link href="https://www.linkedin.com/company/draeger" target="_blank">
                                    <Image src="/linkedin.webp" width={30} height={30} alt="Logo Linkedin" className="transition-transform hover:scale-110" />
                                </Link>
                                <Link href="https://www.youtube.com/Draeger" target="_blank">
                                    <Image src="/youtube-ico.jpg" width={30} height={30} alt="Logo Youtube" className="transition-transform hover:scale-110" />
                                </Link>
                                <Link href="https://www.facebook.com/DraegerGlobal/" target="_blank">
                                    <Image src="/facebook-ico.jpg" width={30} height={30} alt="Logo Facebook" className="transition-transform hover:scale-110" />
                                </Link>
                                <Link href="https://www.instagram.com/draeger.global/" target="_blank">
                                    <Image src="/instagram.webp" width={30} height={30} alt="Logo Instagram" className="transition-transform hover:scale-110" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DESCRIPTION */}
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

                {/* PAGINATION + PRODUCTS */}
                <div className="w-full pt-10">
                    <h2 className="text-[22px] font-semibold text-[#002766] mb-4">
                        Обладнання бренду {brands?.name}
                    </h2>

                    {products.length === 0 && <div>Товари для цього бренду відсутні</div>}

                    <div className="flex flex-wrap justify-start gap-4 w-full">
                        {visibleProducts.map(product => {
                            const url = `/catalog/sub-catalog/product/${product.translations?.[locale as any]}?category=${encodeURIComponent(product.categories?.[0]?.slug || "")}`;

                            return (
                                <div
                                    key={product.id}
                                    className="flex flex-col items-center border rounded-lg p-4 min-w-[180px] cursor-pointer max-w-[300px]"
                                    onClick={() => {
                                        if (isIOS) router.push(url);
                                        else window.location.href = url;
                                    }}
                                >
                                    {product.images?.[0] && (
                                        <Image
                                            src={product.images[0].src}
                                            alt={product.images[0].alt || product.name}
                                            width={150}
                                            height={180}
                                            className="object-contain"
                                        />
                                    )}
                                    <h3 className="flex justify-center h-20 w-full px-2">
                                        {product.name}
                                    </h3>
                                </div>
                            );
                        })}
                    </div>


                    {visibleCount < products.length && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={loadMore}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Завантажити ще
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};
