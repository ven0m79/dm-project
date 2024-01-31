import { Inter } from "next/font/google";
import { FC, ReactNode } from "react";

import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';


import "./globals.css";
import "./reset.css";

import type { Metadata } from "next"

import { cn } from "@app/[locale]/components/molecules/lib/utils"

const inter = Inter({ subsets: ["latin"] });

interface LocaleLayoutProps {
  children: ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return [{ locale: 'ua' }, { locale: 'en' }]
}




export default async function RootLayout({ children, params: {locale} }: LocaleLayoutProps) {
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    console.error('Failed to load messages:', error);
    notFound()
  }
  return (
    <html lang={locale}>
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
};

