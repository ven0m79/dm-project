import { Roboto } from "next/font/google";
import { ReactNode } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";

import "./globals.css";
//import "./reset.css";

import { cn } from "@app/[locale]/components/molecules/lib/utils";
import { unstable_setRequestLocale } from "next-intl/server";
import Script from "next/script";

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
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17295797148"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17295797148');
            `,
          }}
        />
      </head>

      <body
        className={cn(
          "flex min-h-screen overflow-x-hidden bg-gray-950 text-gray-50",
          inter.className,
        )}
      >
        <main className="flex flex-1 flex-col items-center justify-center gap-12 w-full bg-white">
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}
