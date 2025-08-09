// app/[locale]/not-found.tsx
import { useLocale, NextIntlClientProvider, useMessages } from "next-intl";
import NotFoundPage from "./components/atoms/NotFoundPage/notFoundPage";

import { notFound } from "next/navigation";
import RootLayout from "../[locale]/layout";
import React, { FC, ReactNode, Suspense } from "react";
import styles from "@app/[locale]/components/templates/main-layout/MainLayout.module.css";
import { Nav, Footer, Header } from "@app/[locale]/components/molecules";



export default async function NotFound() {
  const locale = useLocale();
  const messages = useMessages();


  // Ви можете додати перевірку на наявність повідомлень, якщо потрібно
  if (!messages) {
    notFound();
  }

  return (



    <RootLayout params={{ locale: locale }}>
      <Suspense fallback="Loading">
        <main className={styles.main}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <Nav />
            <NotFoundPage />
          </NextIntlClientProvider>
          {/* <Footer/> */}
        </main>
      </Suspense>
    </RootLayout >
  );
}