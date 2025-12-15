// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "./config"; // масив ['ua', 'en']

export default getRequestConfig(async ({ locale }) => {
  // ✅ Жорстка перевірка locale
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  return {
    // ✅ Повертаємо locale
    locale,

    // ✅ Завантажуємо messages
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
