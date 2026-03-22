import type { Metadata } from "next";

import { ClientPage } from "./client-page";


type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { locale } = await params;
  return locale === "ua"
    ? {
        title: "Акції та спеціальні пропозиції на медичне обладнання | ДМ-Проект",
        description:
          "Акційні пропозиції на медичне обладнання Dräger та оснащення для лікарень в Києві. Вигідні знижки, професійна консультація та сервіс. Купуйте обладнання для лікарень вигідно на dm-project.com.ua",
      }
    : {
        title: "Promotions and special offers on medical equipment | DM-Project",
        description:
          "Special offers on Dräger medical equipment and hospital supplies in Kyiv. Great discounts, professional advice and service. Buy hospital equipment at great prices on dm-project.com.ua",
      };
}

export default function Page() {
  return <ClientPage />;
}
