import type { Metadata } from "next";

import { ClientPage } from "./client-page";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return locale === "ua"
    ? {
        title: "ДМ-ПРОЕКТ: Головна",
        description: "ДМ-ПРОЕКТ Є НАДІЙНИМ ПАРТНЕРОМ УКРАЇНСЬКИХ ЛІКАРІВ З 2009 РОКУ",
      }
    : {
        title: "DM-PROJECT: Main",
        description: "DM-PROJECT HAS BEEN A RELIABLE PARTNER OF UKRAINIAN DOCTORS SINCE 2009",
      };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return <ClientPage params={{ locale }}  />;
}
