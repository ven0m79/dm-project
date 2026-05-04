import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getAlternates } from "../../components/atoms/hreflang/hreflang";
import { ClientPage } from "./client-page";
import { getProductsByBrandFromDb } from "../../../../lib/db/queries";

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
      metadataBase: new URL("https://dm-project.com.ua"),
      alternates: getAlternates("/partners/mimp", locale),
      title: "Партнер FSN | ДМ-Проект",
      description:
        "FSN — офіційний партнер DM Project. Медичне обладнання та аксесуари.",
    }
    : {
      metadataBase: new URL("https://dm-project.com.ua"),
      alternates: getAlternates("/partners/mimp", locale),
      title: "Partner PROHS | DM-Project",
      description:
        "FSN official partner. Medical equipment and accessories.",
    };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const lang = locale === "ua" ? "ua" : "en";

  const BRAND_ID = 919;
  const CATEGORY_IDS = [1122];

  const filtered = await getProductsByBrandFromDb(lang, BRAND_ID, CATEGORY_IDS);

  return (
    <ClientPage
      locale={locale}
      brands={{
        id: 919,
        name: "MIPM",
        slug: "mipm",
      }}
      products={filtered}
    />
  );
}

