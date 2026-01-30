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
                            src="/logo-partners/mimp.webp"
                            alt="PROHS"
                            width={400}
                            height={400}
                        />
                    </div>
                    <div className="text-[#0061AA] w-full indent-0 sm:indent-5 leading-relaxed text-justify self-center">
                        <h1 className="text-[24px] sm:text-[30px] font-semibold text-[#002766]">
                            MIPM (Mammendorfer Institut für Physik und Medizin GmbH)
                        </h1>
                        <div className="text-[16px] sm:text-[20px]">
                            <strong className="text-[#002766]">Рік заснування:</strong> 1982
                        </div>
                        <div className="text-[16px] sm:text-[20px]">
                            <strong className="text-[#002766]">Країна:</strong> Німеччина
                        </div>
                        <div className="text-[16px] sm:text-[20px]">
                            <strong className="text-[#002766]">Офіційний сайт: </strong>
                            <Link href="https://www.mipm.com/" target="_blank">
                                https://www.mipm.com/
                            </Link>
                        </div>
                        <div className="text-[18px] sm:text-[20px]">
                            <strong className="text-[#002766]">Cоціальні мережі:</strong>
                            <div className="flex flex-row pl-10 pt-2 gap-4">
                                <Link
                                    href="https://www.linkedin.com/company/mipm-mammendorfer-institut-f%C3%BCr-physik-und-medizin-gmbh/about/"
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
                                <Link href="https://www.youtube.com/channel/UC5IaQhBF2x42K7qq6A6tPmg" target="_blank">
                                    <Image
                                        src="/youtube-ico.jpg"
                                        width={30}
                                        height={30}
                                        alt="Logo Youtube"
                                        className="transition-transform hover:scale-110"
                                    />
                                </Link>
                                <Link
                                    href="https://www.facebook.com/MipmMammendorferInstitutFurPhysikUndMedizinGmbh/"
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
                                    href="https://www.instagram.com/mipm_gmbh/"
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
                    MIPM (Mammendorfer Institut für Physik und Medizin GmbH) — німецький виробник медичних пристроїв із фокусом на рішеннях, сумісних із МРТ. Бренд спеціалізується на моніторингу пацієнта під час МР-досліджень та суміжних клінічних задачах, де критичні безпека в магнітному полі, стабільність вимірювань і зручність роботи персоналу.
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
                    <p>MIPM — бренд із Німеччини, який розробляє та виробляє медичні пристрої з 1982 року. Компанія базується в Баварії (Маммендорф, неподалік Мюнхена) і вибудувала експертизу навколо нішевих задач медтехніки, де важливо поєднати точність вимірювань із вимогами безпеки та сумісності з МРТ-середовищем. Такий фокус особливо цінний для відділень, які працюють з пацієнтами під седацією/анестезією або з важкими станами, коли моніторинг під час МР-дослідження має бути безперервним і надійним.</p>
                    <p>Основні напрямки продукції MIPM — МРТ-сумісні системи моніторингу пацієнта та аксесуари до них. У лінійках бренду представлені рішення для контролю життєвих показників під час МР-обстежень (з можливістю конфігурації під потрібні параметри) та спеціалізовані пристрої для клінічних задач на межі анестезіології й інтенсивної терапії, де потрібні відтворювані вимірювання та зрозумілий інтерфейс для персоналу. Окремий напрям — нейром’язовий моніторинг (TOF), який застосовують для контролю нервово-м’язової блокади.</p>
                    <p>Обирайте MIPM у DM Project, коли потрібен практичний підбір під ваші сценарії роботи (кабінет МРТ, анестезіологічний супровід, інтенсивні пацієнти) та коректна комплектація сумісними аксесуарами в одному замовленні. Це скорочує “зайві” узгодження, зменшує ризик помилок сумісності та дає прогнозований результат у щоденній роботі.</p>
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
