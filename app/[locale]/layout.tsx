// app/[locale]/layout.tsx
import { ReactNode } from 'react';
import { Roboto } from 'next/font/google';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { cn } from '@app/[locale]/components/molecules/lib/utils';
//import { Link } from 'i18n/navigation';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto'
});

export default async function LocaleLayout({ children, params }: Props) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={cn('flex min-h-screen overflow-x-hidden', roboto.variable)}>
        <main className="flex flex-1 flex-col items-center justify-center gap-12 w-full">
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}
