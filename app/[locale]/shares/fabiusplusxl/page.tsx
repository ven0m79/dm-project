import type { Metadata } from "next";

import  SharesFabiusXL from "./client-page";


type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { locale } = await params;
  return locale === "ua"
    ? {
        title: "Акція на Апарат наркозно-дихальний Dräger Fabius plus XL та Монітор пацієнта Dräger Vista 120S | ДМ-Проект",
        description: "Акційна пропозиція на Апарат наркозно-дихальний Dräger Fabius plus XL та Монітор пацієнта Dräger Vista 120S від виробника Dräger у Києві. Актуальні акції та знижки на медичне обладнання з гарантією та сервісним обслуговуванням. Вигідні умови для медичних закладів на dm-project.com.ua",
      }
    : {
        title: "Promotion on Anesthesia workstation Dräger Fabius plus XL and Patient monitor Dräger Vista 120S | DM-Project",
        description: "Special offer on the combination of Dräger Fabius plus XL anaesthesia machine and Dräger Vista 120S from manufacturer Dräger in Kyiv. Current promotions and discounts with warranty and service support. Favourable terms for medical institutions at dm-project.com.ua",
      };
}

export default function Page() {
  return <SharesFabiusXL  />;
}
