// app/[locale]/services/page.tsx
import type { Metadata } from "next";
import { MainLayout } from "@app/[locale]/components/templates";
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
        title: "Сервісне обслуговування медичного обладнання | ДМ-Проект",
        description:
          "Гарантійне та післягарантійне обслуговування медичного обладнання Dräger...",
      }
    : {
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
