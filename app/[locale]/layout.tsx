// app/[locale]/layout.tsx
import { ReactNode } from 'react';
import { Roboto } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { cn } from '@app/[locale]/components/molecules/lib/utils';
import ClientScriptLoader from '@app/[locale]/components/atoms/scriptsBinotel/scriptsBinotel';
import Script from "next/script";

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
      <head>
        {/* ✅ Обидва скрипти у <head> */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=GT-P3NZ9SN9" />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GT-P3NZ9SN9');`,
          }}
        />

        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-17295797148"
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
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-52H85B3W');
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className={cn('flex min-h-screen overflow-x-hidden', roboto.variable)}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-52H85B3W"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <main className="flex flex-1 flex-col items-center justify-center gap-12 w-full">
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </main>
        <ClientScriptLoader />
      </body>
    </html>
  );
}
