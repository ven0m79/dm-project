// app/[locale]/layout.tsx
import { ReactNode } from 'react';
import { Roboto } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { cn } from '@app/[locale]/components/molecules/lib/utils';
import ClientScriptLoader from '@app/[locale]/components/atoms/scriptsBinotel/scriptsBinotel';
import './globals.css';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>; // params як Promise
};

const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto'
});

export default async function LocaleLayout({ children, params }: Props) {
    const resolvedParams = await params; // обов’язково unwrap
  const { locale } = await resolvedParams; // чекаємо Promise
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={cn('flex min-h-screen overflow-x-hidden bg-gray-950 text-gray-50', roboto.variable)}>
        <main className="flex flex-1 flex-col items-center justify-center gap-12 w-full bg-white">
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </main>
        <ClientScriptLoader />
      </body>
    </html>
  );
}
