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
import { api } from "../../../../utils/woocommerce.setup";


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

/** Тимчасово — потім замінюється даними з API */
const EQUIPMENT_CATEGORIES: Category[] = [
    { id: 0, name: "Всі товари Lojer", slug: "all" },
    { id: 277, name: "Столи операційні", slug: "operating-tables2" },
    { id: 937, name: "Столи оглядові", slug: "examination-tables" },
    { id: 996, name: "Процедурні крісла", slug: "recovery-chair" },
    { id: 958, name: "Функціональні ліжка", slug: "hospital-beds" },
    { id: 980, name: "Приліжкові тумбочки та столики", slug: "bedside-cabinet" },
];

const CATEGORY_PRIORITY = new Map<number, number>();

EQUIPMENT_CATEGORIES.filter((el) => el.id !== 0).forEach((cat, index) => {
    // Встановлюємо пріоритет для основної категорії
    CATEGORY_PRIORITY.set(cat.id, index);

    // Якщо у цієї категорії є підкатегорії в CATEGORY_NAONATHAL, 
    // даємо їм такий самий пріоритет

});
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

    const ITEMS_PER_PAGE = 20;

    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null,
    );
    const [productsData, setProductsData] = useState(products);
    const router = useRouter();
    const [showBackButton, setShowBackButton] = useState(false);
    const isMobile = useIsMobile();
    const loadMoreClickedRef = useRef(false);
    const initialProductsRef = useRef(products);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);


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
                // ЯКЩО це товари без пріоритету (аксесуари, розхідники тощо)
                // використовуємо menu_order
                return (a.menu_order ?? 0) - (b.menu_order ?? 0);
            }

            // В іншому випадку сортуємо за пріоритетом категорій (НДА -> ШВЛ -> Монітори...)
            return priorityDiff;
        });
    }, [productsData, selectedCategory, locale]);

    const handleCategoryClick = async (category: Category) => {
    setIsDropdownOpen(false);
    setVisibleCount(ITEMS_PER_PAGE);

    if (category.slug === "all") {
        setSelectedCategory(null);
        setProductsData(initialProductsRef.current);
        return;
    }

    setSelectedCategory(category);

    // ❌ нічого не тягнемо і нічого не перезаписуємо
};


    return (
        <MainLayout>
            <div className="flex flex-col justify-center items-center w-full max-w-250 pb-3 px-2">
                {/* BRAND INFO */}
                <div className="flex shrink-0 sm:flex-row flex-col w-full">
                    <div className="flex w-full h-auto">
                        <Image
                            src="/logo-partners/lojer-log-partner.webp"
                            alt="Dräger"
                            width={400}
                            height={400}
                        />
                    </div>
                    <div className="text-[#0061AA] w-full indent-0 sm:indent-5 leading-relaxed text-justify self-center">
                        <h1 className="text-[24px] sm:text-[30px] font-semibold text-[#002766]">
                            Lojer Group
                        </h1>
                        <div className="text-[16px] sm:text-[20px]">
                            <strong className="text-[#002766]">Рік заснування:</strong> 1919
                        </div>
                        <div className="text-[16px] sm:text-[20px]">
                            <strong className="text-[#002766]">Країна:</strong> Фінляндія
                        </div>
                        <div className="text-[16px] sm:text-[20px]">
                            <strong className="text-[#002766]">Офіційний сайт:</strong>
                            <Link href="https://www.lojer.com/" target="_blank">
                                https://www.lojer.com/
                            </Link>
                        </div>
                        <div className="text-[18px] sm:text-[20px]">
                            <strong className="text-[#002766]">Cоціальні мережі:</strong>
                            <div className="flex flex-row pl-10 pt-2 gap-4">
                                <Link
                                    href="https://fi.linkedin.com/company/lojer-group"
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
                                <Link href="https://www.youtube.com/@LojerGroup" target="_blank">
                                    <Image
                                        src="/youtube-ico.jpg"
                                        width={30}
                                        height={30}
                                        alt="Logo Youtube"
                                        className="transition-transform hover:scale-110"
                                    />
                                </Link>
                                <Link
                                    href="https://www.facebook.com/LojerGroup/"
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
                                    href="https://www.instagram.com/lojer_physical_therapy_equip/"
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

                {/* DESCRIPTION */}
                <div className="text-[#0061AA] w-full indent-5 leading-relaxed text-justify pt-4">
                    Lojer Group — фінський виробник медичних меблів і обладнання для лікарень та догляду, а також рішень для фізіотерапії й реабілітації. Продукція бренду орієнтована на щоденну практику медзакладів: ергономіку для персоналу, комфорт і безпеку пацієнта та передбачувану роботу обладнання в інтенсивному режимі.
                </div>

                {/* ===== BUTTON + DROPDOWN ===== */}
                <div className="relative flex gap-3 mx-1" ref={dropdownRef}>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen((prev) => !prev)}
                            className={styles.loadProducts}
                        >
                            {"Завантажити обладнання Lojer"}
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute left-0 mt-2 bg-white border rounded-lg shadow-lg z-20">
                                {EQUIPMENT_CATEGORIES.map((category) => (
                                    <button
                                        key={category.id}
                                        type="button"
                                        onClick={() => handleCategoryClick(category)}
                                        className={classNames(
                                            "block w-full whitespace-nowrap rounded-lg text-left px-4 py-2 hover:bg-blue-50 transition",
                                            selectedCategory?.id === category.id &&
                                            "bg-blue-100 font-semibold rounded-lg",
                                        )}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
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
                    <p>Lojer — бренд із Фінляндії, історія якого починається з 1919 року. Виробник розвивався від інженерного виробництва до медичних технологій і сьогодні відомий як один із ключових гравців у сегменті медичних меблів та обладнання для стаціонарів і реабілітації. Для закладів охорони здоров’я це означає просту перевагу: рішення створені не “для каталогу”, а для реальних клінічних процесів, де важливі витривалість, продумана механіка та зручність щоденної роботи персоналу.</p>
                    <p>Асортимент Lojer Group охоплює функціональні лікарняні та доглядові ліжка, оглядові й процедурні столи/кушетки, меблі та оснащення для палат і відділень, а також обладнання для фізіотерапії та реабілітації. Окремий напрям групи — хірургічні рішення для операційних (зокрема операційні столи та хірургічне освітлення), що дозволяє закривати потреби як стаціонару, так і операційного блоку в єдиній логіці сумісності та експлуатації.</p>
                    <p>Обирайте Lojer у DM Project, якщо потрібна закупівля з практичним підбором під задачу відділення та зрозумілою комплектацією. Так ви отримуєте рішення, яке коректно “стає” у ваші процеси, а не потребує переробок і компромісів після постачання.</p>
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
