import type { Metadata } from "next";

import { ClientPage } from "./client-page1";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return locale === "ua"
    ? {
        title: "Сервісне обслуговування медичного обладнання | ДМ-Проект",
        description:
          "Гарантійне та післягарантійне обслуговування медичного обладнання Dräger. Технічна підтримка, сервіс і професійне навчання медичного персоналу. Надійний партнер для лікарень по всій Україні dm-project.com.ua",
      }
    : {
        title: "Medical equipment servicing | DM-Project",
        description:
          "Warranty and post-warranty service for Dräger medical equipment. Technical support, service and professional training for medical personnel. A reliable partner for hospitals throughout Ukraine dm-project.com.ua",
      };
}

export default function Page() {
  return <ClientPage />;
}
