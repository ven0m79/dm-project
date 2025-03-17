import type { Metadata } from "next";

import { ClientPage } from "./client-page";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return locale === "ua"
    ? {
        title: "ДМ-ПРОЕКТ: Про компанію",
        description: "Видами діяльності компанії є не тільки продаж медичного обладнання високого класу, а й розробка та впровадження комплексних рішень для медичних закладів, починаючи з проектування і закінчуючи сервісом та навчанням персоналу.",
      }
    : {
        title: "DM-PROJECT: About company",
        description: "DM-PROJECT was founded in 2009 as an authorized representative of the German company Dräger in Ukraine, the world leader in the production of human life support systems.",
      };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return <ClientPage params={{ locale }}  />;
}
