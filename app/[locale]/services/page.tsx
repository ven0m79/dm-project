// app/[locale]/services/page.tsx
import type { Metadata } from "next";
import { getAlternates } from "../components/atoms/hreflang/hreflang";
import { MainLayout } from "../components/templates";
import ServiceClient from "./ServiceClient";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { locale } = await params;

  return locale !== "en"
    ? {
        metadataBase: new URL("https://dm-project.com.ua"),
        alternates: getAlternates("/services", locale),
        title: "Сервісне обслуговування медичного обладнання | ДМ-Проект",
        description:
          "Гарантійне та післягарантійне обслуговування медичного обладнання Dräger...",
      }
    : {
        metadataBase: new URL("https://dm-project.com.ua"),
        alternates: getAlternates("/services", locale),
        title: "Medical equipment servicing | DM-Project",
        description:
          "Warranty and post-warranty service for Dräger medical equipment...",
      };
}

export default function Page() {
  return (
    <MainLayout>
      <ServiceClient />
    </MainLayout>
  );
}
