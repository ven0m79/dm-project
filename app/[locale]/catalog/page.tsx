import type { Metadata } from "next";

import { ClientPage } from "./client-page";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return locale === "ua"
    ? {
        title: "ДМ-ПРОЕКТ: Продукти",
        description: "Сьогодні основними видами діяльності компанії є не тільки продаж медичного обладнання високого класу, а й розробка та впровадження комплексних рішень для медичних закладів, починаючи з проектування і закінчуючи сервісом та навчанням персоналу.",
      }
    : {
        title: "DM-PROJECT: Products",
        description: "Today, the company's main activities include not only the sale of high-quality medical equipment, but also the development and implementation of integrated solutions for medical institutions, from design to service and staff training.",
      };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return <ClientPage params={{ locale }}  />;
}
