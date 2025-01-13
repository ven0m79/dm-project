import { Roboto } from "next/font/google";
import { ReactNode } from "react";

import { NextIntlClientProvider, useMessages } from "next-intl";

import "./globals.css";
//import "./reset.css";

import { cn } from "@app/[locale]/components/molecules/lib/utils";
import { unstable_setRequestLocale } from "next-intl/server";

const inter = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['cyrillic'],
  display: 'swap',
  adjustFontFallback: false,
})

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export function generateStaticParams() {
  return [{ locale: "ua" }, { locale: "en" }];
}

export default function RootLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();

  return (
    <html lang={locale}>
      <head>
        <title>ДМ-проект</title>
        <meta
          name="description"
          content="Компанія ДМ-ПРОЕКТ заснована у 2009 році як уповноважений представник німецької компанії Dräger в Україні, світового лідера з виробництва систем життєзабезпечення людини."></meta>
      </head>
      <body
        className={cn(
          "flex min-h-screen overflow-x-hidden bg-gray-950 text-gray-50",
          inter.className,
        )}
      >
        <main className="flex flex-1 flex-col items-center justify-center gap-12">
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}
