import type { Metadata } from "next";

import { ClientPage } from "./client-page";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return locale === "ua"
    ? {
        title: "ДМ-ПРОЕКТ: Головна",
        description: "ДМ-проект є надійним партнером українських лікарів з 2009 року",
      }
    : {
        title: "DM-PROJECT: Main",
        description: "DM-project has been a reliable partner of ukrainian doctors since 2009",
      };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return <ClientPage params={{ locale }}  />;
}
