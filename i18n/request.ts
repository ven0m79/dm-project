// i18n/request.ts

import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
import {notFound} from 'next/navigation';

export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;

  // Якщо локаль не підтримується — 404
  if (!hasLocale(routing.locales, requested)) {
    notFound();
  }

  return {
    locale: requested,
    messages: (await import(`../messages/${requested}.json`)).default
  };
});

export async function getMessages(locale: string) {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (await import(`../messages/${locale}.json`)).default;
}
