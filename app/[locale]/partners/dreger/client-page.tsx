"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import styles from "../Partners.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isIOS } from "utils/constants";
import CaruselBrands from "@app/[locale]/components/atoms/carusel-brands/carusel-brands";
import { useIsMobile } from "../../components/hooks/useIsMobile";
import type { WoocomerceCategoryType } from "../../../../utils/woocomerce.types";

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
  CATEGORY_PRIORITY.set(cat.id, index);

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

async function fetchWooProducts(params: {
  lang: string;
  page: number;
  per_page: number;
  category?: number;
  brandId?: number;
}): Promise<{ items: any[]; totalPages: number }> {
  const sp = new URLSearchParams();
  sp.set("lang", params.lang);
  sp.set("page", String(params.page));
  sp.set("per_page", String(params.per_page));
  if (params.category != null) sp.set("category", String(params.category));
  if (params.brandId != null) sp.set("brandId", String(params.brandId));

  const res = await fetch(`/api/woo/products?${sp.toString()}`, {
    method: "GET",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Woo proxy API error: ${res.status} ${text}`);
  }

  return res.json();
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
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const router = useRouter();
  const [showBackButton, setShowBackButton] = useState(false);
  const isMobile = useIsMobile();
  const loadMoreClickedRef = useRef(false);
  const initialProductsRef = useRef(products);

  useEffect(() => {
    setProductsData(products);
    initialProductsRef.current = products;
  }, [products]);

  useEffect(() => {
    let cancelled = false;

    async function loadInitialBatchIfNeeded() {
      if (products.length > 0) return;

      try {
        let page = 1;
        let totalPages = 1;
        const collected: any[] = [];

        do {
          const data = await fetchWooProducts({
            lang: locale,
            page,
            per_page: 100,
            brandId: brands.id,
          });

          totalPages = data.totalPages || 1;
          collected.push(...data.items);
          page++;
        } while (page <= totalPages && collected.length < ITEMS_PER_PAGE);

        if (!cancelled) {
          setProductsData(collected);
          initialProductsRef.current = collected;
        }
      } catch (error) {
        if (!cancelled) {
          setLoadError(
            error instanceof Error ? error.message : "Failed to load products",
          );
        }
      }
    }

    loadInitialBatchIfNeeded();

    return () => {
      cancelled = true;
    };
  }, [brands.id, locale, products.length]);

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

  const filteredProducts = useMemo(() => {
    const source = [...productsData];

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

    return filtered.sort((a, b) => {
      const priorityA = getItemPriority(a);
      const priorityB = getItemPriority(b);
      const priorityDiff = priorityA - priorityB;

      if (priorityDiff === 0) {
        if (
          priorityA === Number.MAX_SAFE_INTEGER ||
          selectedCategory?.slug === "accessories"
        ) {
          return a.name.localeCompare(b.name, locale);
        }
        return (a.menu_order ?? 0) - (b.menu_order ?? 0);
      }

      return priorityDiff;
    });
  }, [productsData, selectedCategory, locale]);

  const loadMore = async () => {
    setLoadError(null);
    setIsLoadingMore(true);
    loadMoreClickedRef.current = true;

    let page = 1;
    let totalPages = 1;
    const collected: any[] = [];

    try {
      do {
        const data = await fetchWooProducts({
          lang: locale,
          page,
          per_page: 100,
          brandId: brands.id,
        });

        totalPages = data.totalPages || 1;
        collected.push(...data.items);

        page++;
      } while (page <= totalPages);

      setProductsData(collected);
      setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
    } catch (error) {
      loadMoreClickedRef.current = false;
      setLoadError(
        error instanceof Error ? error.message : "Failed to load products",
      );
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleCategoryClick = async (category: Category) => {
    setIsDropdownOpen(false);
    setVisibleCount(ITEMS_PER_PAGE);

    if (category.slug === "all") {
      setSelectedCategory(null);
      setProductsData(initialProductsRef.current);
      return;
    }

    setSelectedCategory(category);

    if (loadMoreClickedRef.current) {
      return;
    }

    try {
      setLoadError(null);
      const data = await fetchWooProducts({
        lang: locale,
        page: 1,
        per_page: 100,
        category: category.id,
        brandId: brands.id,
      });

      setProductsData(data.items);
    } catch (error) {
      setLoadError(
        error instanceof Error ? error.message : "Failed to load products",
      );
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full max-w-250 pb-3 px-2">
        {/* BRAND INFO */}
        <div className="flex shrink-0 sm:flex-row flex-col w-full">
          <div className="flex w-full h-auto">
            <Image
              src="/logo-partners/dreger-log-partner-big.webp"
              alt="Dräger"
              width={400}
              height={400}
            />
          </div>

          <div className="text-[#0061AA] w-full indent-0 sm:indent-5 leading-relaxed text-justify self-center">
            <h1 className="text-[24px] sm:text-[30px] font-semibold text-[#002766]">
              Drägerwerk AG & Co. KGaA
            </h1>
            <div className="text-[16px] sm:text-[20px]">
              <strong className="text-[#002766]">
                Рік заснування:
              </strong>{" "}
              1889
            </div>
            <div className="text-[16px] sm:text-[20px]">
              <strong className="text-[#002766]">Країна:</strong>{" "}
              Німеччина
            </div>
            <div className="text-[16px] sm:text-[20px]">
              <strong className="text-[#002766]">
                Офіційний сайт:
              </strong>{" "}
              <Link href="https://www.draeger.com/" target="_blank">
                https://www.draeger.com/
              </Link>
            </div>

            <div className="text-[18px] sm:text-[20px]">
              <strong className="text-[#002766]">
                Cоціальні мережі:
              </strong>
              <div className="flex flex-row pl-10 pt-2 gap-4">
                <Link
                  href="https://www.linkedin.com/company/draeger"
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
                <Link href="https://www.youtube.com/Draeger" target="_blank">
                  <Image
                    src="/youtube-ico.jpg"
                    width={30}
                    height={30}
                    alt="Logo Youtube"
                    className="transition-transform hover:scale-110"
                  />
                </Link>
                <Link
                  href="https://www.facebook.com/DraegerGlobal/"
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
                  href="https://www.instagram.com/draeger.global/"
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
          Dräger — німецький виробник медичної та безпекової техніки, відомий
          рішеннями для лікарень і критичної медицини. Бренд фокусується на
          практичних технологіях, які допомагають медичним командам працювати
          стабільно, точно та безпечно в щоденних і високоризикових сценаріях.
        </div>

        {/* ===== BUTTON + DROPDOWN ===== */}
        <div className="relative flex gap-3 mx-1" ref={dropdownRef}>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className={styles.loadProducts}
            >
              {"Завантажити обладнання Dräger"}
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

          <button
            className={styles.loadProducts}
            type="button"
            onClick={() => handleCategoryClick(ACCESSORIES_CATEGORY)}
          >
            Завантажити аксесуари Dräger
          </button>
        </div>

        {/* PRODUCTS GRID */}
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
            {filteredProducts.slice(0, visibleCount).map((product) => {
              const url = `/catalog/sub-catalog/product/${product.translations?.[locale as any]}?category=${encodeURIComponent(
                product.categories?.[0]?.slug || "",
              )}`;

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

          <div className="flex justify-center mt-6">
            <button
              onClick={loadMore}
              className={styles.loadProducts}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? "Завантаження..." : "Завантажити ще"}
            </button>
          </div>
          {loadError ? (
            <p className="mt-3 text-center text-red-600">{loadError}</p>
          ) : null}
        </div>

        <div className="text-[#0061AA] w-full indent-5 leading-relaxed text-justify pt-4">
          <p>
            Dräger — бренд із Німеччини з історією понад століття. Компанія
            працює з 1889 року та пройшла шлях від інженерних розробок до
            масштабного виробництва медичних систем, які використовують у
            лікарнях у багатьох країнах світу. У медичному напрямку Dräger
            асоціюється з надійністю обладнання, продуманістю інтерфейсів та
            увагою до сценаріїв, у яких важлива кожна секунда — від операційної
            до відділення інтенсивної терапії.
          </p>

          <p>
            Асортимент медичної продукції Dräger охоплює базові потреби
            стаціонару та критичної допомоги. Це рішення для анестезіології та
            операційних (анестезіологічні робочі місця й системи), апарати
            штучної вентиляції легень для різних клінічних ситуацій, системи
            моніторингу пацієнта та суміжні рішення для організації
            безперервного контролю показників. Окремий напрям — неонатальні
            рішення, зокрема обладнання для підтримки стабільного середовища й
            догляду за новонародженими, що критично для відділень, де значення
            мають точні налаштування та прогнозована робота техніки.
          </p>

          <p>
            Придбати продукцію Dräger в DM Project зручно, коли потрібен швидкий
            і зрозумілий підбір під задачу відділення та комплектація в одному
            місці. Тут легше узгодити потрібні позиції між собою, уникнути
            помилок сумісності та отримати рішення, яке коректно закриває
            реальний клінічний сценарій, а не просто “окремий пристрій у
            вакуумі”.
          </p>

          <p>
            Обирайте Dräger у каталозі DM Project — щоб отримати перевірені
            медичні рішення з логічною комплектацією та прозорим шляхом від
            вибору до покупки.
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
          На головну
        </button>
      )}
    </>
  );
};