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
    { id: 0, name: "Всі товари Dräger", slug: "all" },
    {
        id: 18,
        name: "Наркозно-дихальні апарати",
        slug: "anesthesia-and-respiratory-devices",
    },
    {
        id: 644,
        name: "Апарати штучної вентиляції легень",
        slug: "ventilators-icu",
    },
    {
        id: 1126,
        name: "Електро-імпедансний томограф",
        slug: "electrical-impedance-tomography",
    },
    { id: 20, name: "Монітори пацієнта", slug: "patient-monitors" },
    { id: 79, name: "Неонатальне обладнання", slug: "neonatal-equipment" },
    {
        id: 670,
        name: "Світильники операційні та екзаменаційні",
        slug: "operating-and-examination-lamps",
    },
    {
        id: 243,
        name: "Консолі стельові та настінні",
        slug: "wall-supply-and-ceiling-supply-units",
    },
    { id: 1145, name: "Випаровувачі", slug: "vaporisers" },
    { id: 1131, name: "Газоаналізатори", slug: "gas-analyzers" },
    { id: 1157, name: "Аспіратори", slug: "aspiration" },
    { id: 87, name: "Медичне газопостачання", slug: "gas-management-systems" },
];

const ACCESSORIES_CATEGORY: Category = {
    id: 95,
    name: "Аксесуари",
    slug: "accessories",
};

const CATEGORY_NAONATHAL: Record<number, number[]> = {
    79: [384, 364, 286, 374, 354], // всі підкатегорії неонатального обладнання
};

const CATEGORY_PRIORITY = new Map<number, number>();

EQUIPMENT_CATEGORIES.filter((el) => el.id !== 0).forEach((cat, index) => {
    // Встановлюємо пріоритет для основної категорії
    CATEGORY_PRIORITY.set(cat.id, index);

    // Якщо у цієї категорії є підкатегорії в CATEGORY_NAONATHAL, 
    // даємо їм такий самий пріоритет
    if (CATEGORY_NAONATHAL[cat.id]) {
        CATEGORY_NAONATHAL[cat.id].forEach((subId) => {
            CATEGORY_PRIORITY.set(subId, index);
        });
    }
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
                            src="/logo-partners/atos-log-partner.webp"
                            alt="AT-OS"
                            width={400}
                            height={400}
                        />
                    </div>
                    <div className="text-[#0061AA] w-full indent-0 sm:indent-5 leading-relaxed text-justify self-center">
                        <h1 className="text-[24px] sm:text-[30px] font-semibold text-[#002766]">
                            AT-OS S.r.l.
                        </h1>
                        <div className="text-[16px] sm:text-[20px]">
                            <strong className="text-[#002766]">Рік заснування:</strong> 1996
                        </div>
                        <div className="text-[16px] sm:text-[20px]">
                            <strong className="text-[#002766]">Країна:</strong> Італія
                        </div>
                        <div className="text-[16px] sm:text-[20px]">
                            <strong className="text-[#002766]">Офіційний сайт:</strong>
                            <Link href="https://www.at-os.com/" target="_blank">
                                https://www.at-os.com/
                            </Link>
                        </div>
                        <div className="text-[18px] sm:text-[20px]">
                            <strong className="text-[#002766]">Cоціальні мережі:</strong>
                            <div className="flex flex-row pl-10 pt-2 gap-4">
                                <Link
                                    href="https://it.linkedin.com/company/at-os"
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
                                <Link href="https://www.youtube.com/@at-ossrl" target="_blank">
                                    <Image
                                        src="/youtube-ico.jpg"
                                        width={30}
                                        height={30}
                                        alt="Logo Youtube"
                                        className="transition-transform hover:scale-110"
                                    />
                                </Link>

                            </div>
                        </div>
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
                    <p> AT-OS — бренд з Італії, що розвиває напрямок обладнання для безпечної обробки медичних виробів і хірургічних інструментів.
                        Компанія позиціонує себе як виробника, який поєднує інженерну практичність із фокусом на профілактиці передачі інфекцій:
                        у медичних процесах важливий не лише результат “чисто”, а стабільно відтворюваний стандарт обробки, який можна контролювати
                        та підтверджувати. Саме тому AT-OS робить акцент на рішеннях для мийки й дезінфекції, а також на оснащенні зон, де інструменти
                        проходять підготовку, сушіння та зберігання.</p>

                    <p>У портфелі AT-OS — машини для миття та дезінфекції інструментів для медичного і стоматологічного напрямів, рішення для обробки
                        виробів у лікарняному середовищі (включно з окремими категоріями для різних типів застосування), сушильні шафи, а також
                        допоміжне оснащення: візки, аксесуари та системи завантаження/вивантаження. Для стерилізаційних підрозділів і операційних
                        зон передбачені технічні елементи з нержавіючої сталі, а для лабораторій — лінійки для миття лабораторного скла та матеріалів.
                        Виробник також зазначає відповідність обладнання міжнародним вимогам EN ISO 15883, що є важливим орієнтиром для закупівель,
                        де критичні стандартизація та простежуваність процесу.</p>

                    <p>Замовляйте AT-OS у DM Project, якщо потрібен підбір під конкретну задачу підрозділу та коректна комплектація під ваші сценарії
                        роботи. Це знижує ризик помилок сумісності, спрощує впровадження в щоденні процеси та дає прогнозований результат на практиці,
                        а не лише “на папері”.
                    </p>
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
