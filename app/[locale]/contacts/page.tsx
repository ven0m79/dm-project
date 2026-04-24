import type { Metadata } from "next";
import { getAlternates } from "../components/atoms/hreflang/hreflang";
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
      metadataBase: new URL("https://dm-project.com.ua"),
      alternates: getAlternates("/contacts", locale),
      title: "Контактна інформація компанії | ДМ-Проект",
      description:
        "Контакти компанії ДМ-Проект, адреса, телефони, e-mail та форма звернення. Професійна консультація та підтримка з питань медичного обладнання Dräger. Зв’яжіться з нами на dm-project.com.ua",
    }
    : {
      metadataBase: new URL("https://dm-project.com.ua"),
      alternates: getAlternates("/contacts", locale),
      title: "Company contact information | DM-Project",
      description:
        "DM-Project contact details, address, telephone numbers, email and contact form. Professional advice and support on Dräger medical equipment. Contact us at dm-project.com.ua",
    };
}

export default function Page() {
  return <ClientPage />;
}
