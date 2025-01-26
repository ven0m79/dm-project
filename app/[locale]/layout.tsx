import { Roboto } from "next/font/google";
import { ReactNode } from "react";

import { DefaultSeo } from "next-seo";
import defaultSEOConfig from "../../next-seo.config";

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

  const seoConfig = {
    ...defaultSEOConfig,
    openGraph: {
      ...defaultSEOConfig.openGraph,
      locale: locale === "en" ? "en_US" : "ua_UA", // Установка языка.
      url: `https://dm-project.com.ua`, // Динамическое URL.
    },
  };

  return (
    <html lang={locale}>
      <body
        className={cn(
          "flex min-h-screen overflow-x-hidden bg-gray-950 text-gray-50",
          inter.className,
        )}
      >
        <main className="flex flex-1 flex-col items-center justify-center gap-12 w-100% bg-white">
          <NextIntlClientProvider locale={locale} messages={messages}>
          {/* <DefaultSeo {...seoConfig} /> */}
            {children}
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}
