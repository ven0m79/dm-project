import type { Metadata } from "next";

import { ClientPage } from "./client-page";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return locale === "ua"
    ? {
        title: `ДМ-ПРОЕКТ: ${selectedCategory}`,
        description: "Пропонуємо Вам сучасне обладнання різних типів та призначень.",
      }
    : {
        title: `DM-PROJECT: ${selectedCategory}`,
        description: "Today, the company's main activities include not only the sale of high-quality medical equipment, but also the development and implementation of integrated solutions for medical institutions, from design to service and staff training.",
      };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <ClientPage locale={locale} selectedCategory={""} />;
}