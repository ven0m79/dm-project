import type { Metadata } from "next";
import { getAlternates } from "../components/atoms/hreflang/hreflang";
import { ClientPage } from "./client-page";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  return locale === "ua"
    ? {
        metadataBase: new URL("https://dm-project.com.ua"),
        alternates: getAlternates("/catalog", locale),
        title: "Основні категорії продуктів | ДМ-Проект",
        description:
          "Сьогодні основними видами діяльності компанії є не тільки продаж медичного обладнання високого класу, а й розробка та впровадження комплексних рішень для медичних закладів, починаючи з проектування і закінчуючи сервісом та навчанням персоналу.",
      }
    : {
        metadataBase: new URL("https://dm-project.com.ua"),
        alternates: getAlternates("/catalog", locale),
        title: "Main product categories | DM-Project",
        description:
          "Today, the company's main activities include not only the sale of high-quality medical equipment, but also the development and implementation of integrated solutions for medical institutions, from design to service and staff training.",
      };
}

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  return <ClientPage locale={locale} />;
}
