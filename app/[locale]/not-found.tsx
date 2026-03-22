// app/[locale]/not-found.tsx

import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import NotFoundPage from "./components/atoms/NotFoundPage/notFoundPage";
import { MainLayout } from "@app/[locale]/components/templates";

export default async function NotFound() {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <MainLayout>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <NotFoundPage />
      </NextIntlClientProvider>
    </MainLayout>
  );
}
