import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["ua", "en"];
export const defaultLocale = 'ua';
export const localePrefix = "as-needed";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
