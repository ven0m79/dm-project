import type { Metadata } from "next";

import { ClientPage } from "./client-page";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return locale === "ua"
    ? {
        title: "ДМ-ПРОЕКТ: Контакти",
        description:
          "Контактна інформація компанії ДМ-ПРОЕКТ. Адреса офісу продажів. Номери телефонів компанії для зв'язку.",
      }
    : {
        title: "DM-PROJECT: Contacts",
        description:
          "Contact information of the company DM-PROJECT. Address of the sales office. Company phone numbers for communication.",
      };
}

export default function Page() {
  return <ClientPage />;
}
