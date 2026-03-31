"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { usePathname } from "../../../../i18n/navigation";
import type {
  SingleProductDetails,
  WoocomerceCategoryType,
} from "../../../../utils/woocomerce.types";

const SUPPORTED_LOCALES = ["ua", "en"] as const;
const PRODUCT_PATH_RE = /^\/catalog\/sub-catalog\/product\/(\d+)(\/)?$/;

type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
type LocaleSwitcherHrefs = Record<SupportedLocale, string>;

const categoriesCache = new Map<
  SupportedLocale,
  Promise<WoocomerceCategoryType[]>
>();
const productsCache = new Map<string, Promise<SingleProductDetails>>();

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

function buildHref(pathname: string, search: string, categorySlug?: string) {
  const params = new URLSearchParams(search);

  if (categorySlug) params.set("category", categorySlug);
  else params.delete("category");

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

function getCategories(locale: SupportedLocale) {
  const cached = categoriesCache.get(locale);
  if (cached) return cached;

  const request = fetch(
    `/api/woocommerce/categories?locale=${encodeURIComponent(locale)}`,
  )
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to load categories for locale ${locale}`);
      }

      return (await response.json()) as WoocomerceCategoryType[];
    })
    .catch((error) => {
      categoriesCache.delete(locale);
      throw error;
    });

  categoriesCache.set(locale, request);
  return request;
}

function getProduct(productId: number, locale: SupportedLocale) {
  const cacheKey = `${locale}:${productId}`;
  const cached = productsCache.get(cacheKey);
  if (cached) return cached;

  const request = fetch(
    `/api/woo/product?locale=${encodeURIComponent(locale)}&productId=${productId}`,
  )
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to load product ${productId} for locale ${locale}`);
      }

      return (await response.json()) as SingleProductDetails;
    })
    .catch((error) => {
      productsCache.delete(cacheKey);
      throw error;
    });

  productsCache.set(cacheKey, request);
  return request;
}

async function getProductForLocaleSwitch(
  productId: number,
  currentLocale: SupportedLocale,
) {
  try {
    return await getProduct(productId, currentLocale);
  } catch {
    const fallbackLocale: SupportedLocale = currentLocale === "ua" ? "en" : "ua";
    return getProduct(productId, fallbackLocale);
  }
}

async function translateCategorySlug(
  currentSlug: string,
  currentLocale: SupportedLocale,
  targetLocale: SupportedLocale,
) {
  if (!currentSlug || currentLocale === targetLocale) return currentSlug;

  const fallbackLocale = currentLocale === "ua" ? "en" : "ua";
  const [currentCategories, targetCategories, fallbackCategories] =
    await Promise.all([
      getCategories(currentLocale),
      getCategories(targetLocale),
      getCategories(fallbackLocale),
    ]);

  const sourceCategory =
    currentCategories.find((category) => category.slug === currentSlug) ??
    fallbackCategories.find((category) => category.slug === currentSlug);

  const translatedId = sourceCategory?.translations?.[targetLocale];
  if (!translatedId) return currentSlug;

  return (
    targetCategories.find((category) => category.id === translatedId)?.slug ??
    currentSlug
  );
}

async function translateProductPath(
  pathname: string,
  currentLocale: SupportedLocale,
  targetLocale: SupportedLocale,
) {
  const match = pathname.match(PRODUCT_PATH_RE);
  if (!match) return pathname;

  const currentProductId = Number(match[1]);
  if (!Number.isFinite(currentProductId)) return pathname;
  if (currentLocale === targetLocale) return pathname;

  const product = await getProductForLocaleSwitch(currentProductId, currentLocale);
  const translatedProductId = Number(product.translations?.[targetLocale]);

  if (!Number.isFinite(translatedProductId) || translatedProductId < 1) {
    return pathname;
  }

  return pathname.replace(
    PRODUCT_PATH_RE,
    (_match, _id, trailingSlash = "") =>
      `/catalog/sub-catalog/product/${translatedProductId}${trailingSlash}`,
  );
}

export function useLocaleSwitcherHrefs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const search = searchParams?.toString() ?? "";
  const categorySlug = searchParams?.get("category") ?? "";

  const fallbackHrefs = useMemo<LocaleSwitcherHrefs>(
    () => ({
      ua: buildHref(pathname, search, categorySlug || undefined),
      en: buildHref(pathname, search, categorySlug || undefined),
    }),
    [categorySlug, pathname, search],
  );

  const requiresResolution = useMemo(
    () => PRODUCT_PATH_RE.test(pathname) || Boolean(categorySlug),
    [categorySlug, pathname],
  );

  const [hrefs, setHrefs] = useState<LocaleSwitcherHrefs>(fallbackHrefs);
  const [isResolvingHref, setIsResolvingHref] = useState(requiresResolution);

  useEffect(() => {
    setHrefs(fallbackHrefs);
    setIsResolvingHref(requiresResolution);
  }, [fallbackHrefs, requiresResolution]);

  useEffect(() => {
    if (!isSupportedLocale(locale)) {
      setIsResolvingHref(false);
      return;
    }

    let cancelled = false;
    setIsResolvingHref(true);

    Promise.all(
      SUPPORTED_LOCALES.map(async (targetLocale) => {
        const [translatedPathname, translatedCategorySlug] = await Promise.all([
          translateProductPath(pathname, locale, targetLocale),
          categorySlug
            ? translateCategorySlug(categorySlug, locale, targetLocale)
            : Promise.resolve(categorySlug),
        ]);

        return [
          targetLocale,
          buildHref(
            translatedPathname,
            search,
            translatedCategorySlug || undefined,
          ),
        ] as const;
      }),
    )
      .then((entries) => {
        if (cancelled) return;
        setHrefs(Object.fromEntries(entries) as LocaleSwitcherHrefs);
      })
      .catch(() => {
        if (cancelled) return;
        setHrefs(fallbackHrefs);
      })
      .finally(() => {
        if (!cancelled) setIsResolvingHref(false);
      });

    return () => {
      cancelled = true;
    };
  }, [categorySlug, fallbackHrefs, locale, pathname, search]);

  return { hrefs, isResolvingHref };
}
