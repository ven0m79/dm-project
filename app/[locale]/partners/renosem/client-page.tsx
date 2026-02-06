"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { MainLayout } from "@app/[locale]/components/templates";
import styles from "../Partners.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isIOS } from "utils/constants";
import CaruselBrands from "@app/[locale]/components/atoms/carusel-brands/carusel-brands";
import { useIsMobile } from "../../components/hooks/useIsMobile";
import { WoocomerceCategoryType } from "../../../../utils/woocomerce.types";

type Category = {
    id: number;
    name: string;
    slug: string;
};

type ClientPageProps = {
    locale: string;
    brands: {
        id: number;
        name: string;
        slug: string;
    };
    products: any[];
};

const CATEGORY_PRIORITY = new Map<number, number>();

function getItemPriority(item: WoocomerceCategoryType): number {
    let priority = Number.MAX_SAFE_INTEGER;

    for (const cat of item.categories) {
        const p = CATEGORY_PRIORITY.get(cat.id);
        if (p !== undefined && p < priority) {
            priority = p;
        }
    }
    return priority;
}

export const ClientPage = ({ locale, brands, products }: ClientPageProps) => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null,
    );
    const [productsData, setProductsData] = useState(products);
    const router = useRouter();
    const [showBackButton, setShowBackButton] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        const onScroll = () => {
            setShowBackButton(window.scrollY > 120);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /** Фільтрація та сортування товарів */
    const filteredProducts = useMemo(() => {
        const source = [...productsData];

        // 1. Фільтрація (залишається без змін)
        const filtered = selectedCategory
            ? source.filter(
                (product) =>
                    product.categories?.some(
                        (cat: { slug: string }) => cat.slug === selectedCategory.slug,
                    ) ||
                    product.tags?.some(
                        (tag: { slug: string }) => tag.slug === selectedCategory.slug,
                    ),
            )
            : source;

        // 2. Сортування
        return filtered.sort((a, b) => {
            const priorityA = getItemPriority(a);
            const priorityB = getItemPriority(b);
            const priorityDiff = priorityA - priorityB;

            // ЯКЩО обидва товари мають однаковий пріоритет
            if (priorityDiff === 0) {
                return (a.menu_order ?? 0) - (b.menu_order ?? 0);
            }

            // В іншому випадку сортуємо за пріоритетом категорій (НДА -> ШВЛ -> Монітори...)
            return priorityDiff;
        });
    }, [productsData, selectedCategory, locale]);

    return (
        <MainLayout>
            <div className="flex flex-col justify-center items-center w-full max-w-250 pb-3 px-2">
                {/* BRAND INFO */}
                <div className="flex shrink-0 sm:flex-row flex-col w-full">
                    <div className="flex w-full h-auto">
                        <Image
                            src="/logo-partners/renosem-log-partner.webp"
                            alt="PROHS"
                            width={400}
                            height={400}
                        />
                    </div>
                    <div className="text-[#0061AA] w-full indent-0 sm:indent-5 leading-relaxed text-justify self-center">
                        <h1 className="text-[24px] sm:text-[30px] font-semibold text-[#002766]">
                            RENOSEM Co., Ltd.
                        </h1>
                        <div className="text-[16px] sm:text-[20px]">
                            <strong className="text-[#002766]">Рік заснування:</strong> 2007
                        </div>
                        <div className="text-[16px] sm:text-[20px]">
                            <strong className="text-[#002766]">Країна:</strong> Південна Корея
                        </div>
                        <div className="text-[16px] sm:text-[20px]">
                            <strong className="text-[#002766]">Офіційний сайт:</strong>
                            <Link href="https://renosem.com/" target="_blank">
                                https://renosem.com/
                            </Link>
                        </div>
                        <div className="text-[18px] sm:text-[20px]">
                            <strong className="text-[#002766]">Cоціальні мережі:</strong>
                            <div className="flex flex-row pl-10 pt-2 gap-4">
                                <Link
                                    href="https://www.linkedin.com/company/renosem/"
                                    target="_blank"
                                >
                                    <Image
                                        src="/linkedin.webp"
                                        width={30}
                                        height={30}
                                        alt="Logo Linkedin"
                                        className="transition-transform hover:scale-110"
                                    />
                                </Link>
                                <Link href="https://www.youtube.com/user/renosem" target="_blank">
                                    <Image
                                        src="/youtube-ico.jpg"
                                        width={30}
                                        height={30}
                                        alt="Logo Youtube"
                                        className="transition-transform hover:scale-110"
                                    />
                                </Link>
                                <Link
                                    href="https://www.facebook.com/RenosemKor/"
                                    target="_blank"
                                >
                                    <Image
                                        src="/facebook-ico.jpg"
                                        width={30}
                                        height={30}
                                        alt="Logo Facebook"
                                        className="transition-transform hover:scale-110"
                                    />
                                </Link>
                                <Link
                                    href="hhttps://www.instagram.com/renosemkor/"
                                    target="_blank"
                                >
                                    <Image
                                        src="/instagram.webp"
                                        width={30}
                                        height={30}
                                        alt="Logo Instagram"
                                        className="transition-transform hover:scale-110"
                                    />
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-[#0061AA] w-full indent-5 leading-relaxed text-justify pt-4">
                    RENOSEM — виробник обладнання для інфекційного контролю з фокусом на низькотемпературній стерилізації. Бренд розробляє рішення для безпечної обробки термочутливих медичних виробів у стерилізаційних відділеннях та процедурних зонах, де важливі відтворюваний цикл, контроль процесу та стабільний результат.
                </div>
                {/* PAGINATION + PRODUCTS */}
                <div className="w-full pt-6">
                    <h2 className="text-[22px] font-semibold text-[#002766] mb-4">
                        Обладнання бренду {brands?.name}
                    </h2>
                    <div
                        className={classNames(
                            "grid gap-2 mt-4 mb-4 mx-1 justify-items-center",
                            isMobile
                                ? "grid-cols-2"
                                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
                        )}
                    >
                        {filteredProducts.map((product) => {
                            const url = `/catalog/sub-catalog/product/${product.translations?.[locale as any]}?category=${encodeURIComponent(product.categories?.[0]?.slug || "")}`;

                            return (
                                <div
                                    key={product.id}
                                    className={classNames(
                                        "flex flex-col items-center rounded-lg p-4 min-w-35 cursor-pointer max-w-75",
                                        styles.headSubCatalogBlock,
                                    )}
                                    onClick={() => {
                                        if (isIOS) router.push(url);
                                        else window.location.href = url;
                                    }}
                                >
                                    {product.images?.[0] && (
                                        <Image
                                            src={product.images[0].src}
                                            alt={product.images[0].alt || product.name}
                                            width={isMobile ? 150 : 170}
                                            height={isMobile ? 160 : 200}
                                            className="object-contain"
                                        />
                                    )}
                                    <h3 className="justify-center h-18 w-full line-clamp-3">
                                        {product.name}
                                    </h3>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="text-[#0061AA] w-full indent-5 leading-relaxed text-justify pt-4">
                    <p>RENOSEM — бренд із Південної Кореї, який працює на ринку з 2007 року та розвиває напрямок низькотемпературної стерилізації для медичних закладів. Фокус компанії — інженерно прості й “робочі” рішення для щоденної експлуатації в CSSD/ЦСВ, де критичні стандартизація процесу, безпека персоналу та прогнозований результат обробки інструментів і виробів.</p>
                        <p>Асортимент RENOSEM концентрується на інфекційному контролі та обробці виробів: низькотемпературні плазмові стерилізатори (серія RENO) та супутні аксесуари/витратні компоненти, а також мийно-дезінфекційне обладнання (washer-disinfector) і аксесуари для нього. Така лінійка закриває ключові етапи підготовки виробів у стерильному циклі — від очищення та дезінфекції до стерилізації виробів, чутливих до високих температур.</p>
                            <p>Обирайте RENOSEM у DM Project, коли потрібен практичний підбір під ваші задачі стерилізаційного підрозділу та коректна комплектація під реальні сценарії роботи. Це спрощує закупівлю, зменшує ризик несумісності та дозволяє швидше отримати результат, який стабільно працює в щоденній рутині відділення.</p>
                        </div>
                        <CaruselBrands />
                </div>
                {showBackButton && (
                    <button
                        type="button"
                        onClick={() => router.push("/")}
                        className="fixed top-142 right-10 z-50 flex items-center justify-center cursor-pointer w-40 h-10 rounded-2xl bg-[#0061AA] text-white shadow-lg hover:bg-[#004f8a] transition"
                        aria-label="Back"
                    >
                        ← На головну
                    </button>
                )}
        </MainLayout>
    );
};
