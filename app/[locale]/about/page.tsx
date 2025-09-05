import type { Metadata } from "next";

import { ClientPage } from "./client-page";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return locale === "ua"
    ? {
        title: "Медичне обладнання, проектування та сервіс | ДМ-Проект",
        description: "ДМ-Проект лідер у сфері проектування та оснащення медичних закладів сучасним обладнанням Dräger. Гарантія якості, сервісне обслуговування медичного обладнання та навчання персоналу. Надійний партнер українських лікарів dm-project.com.ua",
      }
    : {
        title: "Medical equipment, design and service | DM-Project",
        description: "DM-Project is a leader in the design and equipping of medical facilities with modern Dräger equipment. Quality assurance, medical equipment servicing and staff training. A reliable partner for Ukrainian doctors dm-project.com.ua",
      };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return <ClientPage params={{ locale }}  />;
}
