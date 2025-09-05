import type { Metadata } from "next";

import  SharesLinea from "./client-page";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return locale === "ua"
    ? {
        title: "Акція на Консоль медичну з настінним кріпленням Лінеа IM2 | ДМ-Проект",
        description: "Акційна пропозиція на Консоль медичну з настінним кріпленням Лінеа IM2 від виробника Dräger у Києві. Актуальні акції та знижки на медичне обладнання з гарантією та сервісним обслуговуванням. Вигідні умови для медичних закладів на dm-project.com.ua",
      }
    : {
        title: "Promotion on Wall medical supply unit Linea | DM-Project",
        description: "Special offer on Wall medical supply unit Linea from manufacturer Dräger in Kyiv. Current promotions and discounts with warranty and service support. Favourable terms for medical institutions at dm-project.com.ua",
      };
}

export default function Page() {
  return <SharesLinea  />;
}
