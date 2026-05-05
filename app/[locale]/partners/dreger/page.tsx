import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getAlternates } from "../../components/atoms/hreflang/hreflang";
import { ClientPage } from "./client-page";
import { getProductsByBrandFromDb } from "../../../../lib/db/queries";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  return locale === "ua"
    ? {
        metadataBase: new URL("https://dm-project.com.ua"),
        alternates: getAlternates("/partners/dreger", locale),
        title: "Партнер Dräger | ДМ-Проект",
        description: "Dräger — офіційний партнер DM Project. Медичне обладнання та аксесуари.",
      }
    : {
        metadataBase: new URL("https://dm-project.com.ua"),
        alternates: getAlternates("/partners/dreger", locale),
        title: "Partner Dräger | DM-Project",
        description: "Dräger official partner. Medical equipment and accessories.",
      };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const lang = locale === "ua" ? "ua" : "en";
  const BRAND_ID = 102;
  const CATEGORY_IDS = [18, 644, 1126, 20];

  const filtered = await getProductsByBrandFromDb(lang, BRAND_ID, CATEGORY_IDS);

  return (
    <ClientPage
      locale={locale}
      brands={{ id: 102, name: "Dräger", slug: "drager-brand" }}
      products={filtered}
    />
  );
}
