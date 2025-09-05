import type { Metadata } from "next";

import { ClientPage } from "./client-page";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return locale === "ua"
    ? {
        title: "Контактна інформація компанії | ДМ-Проект",
        description:
          "Контакти компанії ДМ-Проект, адреса, телефони, e-mail та форма звернення. Професійна консультація та підтримка з питань медичного обладнання Dräger. Зв’яжіться з нами на dm-project.com.ua",
      }
    : {
        title: "Company contact information | DM-Project",
        description:
          "DM-Project contact details, address, telephone numbers, email and contact form. Professional advice and support on Dräger medical equipment. Contact us at dm-project.com.ua",
      };
}

export default function Page() {
  return <ClientPage />;
}
