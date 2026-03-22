import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ClientPage } from "./client-page";
import { getProductsByBrandCached } from "../../../../utils/woo.server";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  return locale === "ua"
    ? {
      title: "Партнер Lojer | ДМ-Проект",
      description:
        "Lojer — офіційний партнер DM Project. Медичне обладнання та аксесуари.",
    }
    : {
      title: "Partner Lojer | DM-Project",
      description:
        "Lojer official partner. Medical equipment and accessories.",
    };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const lang = locale === "ua" ? "ua" : "en";
  const BRAND_ID = 285;
  const CATEGORY_IDS = [277, 937, 996, 958, 980];

  const filtered = await getProductsByBrandCached(lang, CATEGORY_IDS, BRAND_ID);

  return (
    <ClientPage
      locale={locale}
      brands={{
        id: 285,
        name: "Lojer",
        slug: "lojer",
      }}
      products={filtered}   />
  );
}
