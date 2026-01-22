import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ClientPage } from "./client-page";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  return locale === "ua"
    ? {
        title: "Партнер Dräger | ДМ-Проект",
        description: "Dräger — офіційний партнер DM Project. Медичне обладнання та аксесуари.",
      }
    : {
        title: "Partner Dräger | DM-Project",
        description: "Dräger official partner. Medical equipment and accessories.",
      };
}

// ----------------- Page -----------------
export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  return (
    <ClientPage
      locale={locale}
      brands={{
        id: 102,
        name: "Dräger",
        slug: "drager-brand",
      }}
      products={[]} // ⬅️ стартуємо без товарів
    />
  );
}
