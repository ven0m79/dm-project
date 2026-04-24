import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getAlternates } from "../../components/atoms/hreflang/hreflang";
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
      metadataBase: new URL("https://dm-project.com.ua"),
      alternates: getAlternates("/partners/atos", locale),
      title: "Партнер Dräger | ДМ-Проект",
      description:
        "Dräger — офіційний партнер DM Project. Медичне обладнання та аксесуари.",
    }
    : {
      metadataBase: new URL("https://dm-project.com.ua"),
      alternates: getAlternates("/partners/atos", locale),
      title: "Partner Dräger | DM-Project",
      description:
        "Dräger official partner. Medical equipment and accessories.",
    };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const lang = locale === "ua" ? "ua" : "en";
  const BRAND_ID = 105;
  const CATEGORY_IDS = [592, 600, 112];

  const filtered = await getProductsByBrandCached(lang, CATEGORY_IDS, BRAND_ID);


  return (
    <ClientPage
      locale={locale}
      brands={{
        id: 105,
        name: "AT-OS",
        slug: "atos-brand",
      }}
      products={filtered} />
  );
}
