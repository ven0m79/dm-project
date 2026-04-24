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
      alternates: getAlternates("/partners/renosem", locale),
      title: "Партнер RENOSEM | ДМ-Проект",
      description:
        "RENOSEM  — офіційний партнер DM Project. Медичне обладнання та аксесуари.",
    }
    : {
      metadataBase: new URL("https://dm-project.com.ua"),
      alternates: getAlternates("/partners/renosem", locale),
      title: "Partner RENOSEM  | DM-Project",
      description:
        "RENOSEM  official partner. Medical equipment and accessories.",
    };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const lang = locale === "ua" ? "ua" : "en";

  const BRAND_ID = 1057;
  const CATEGORY_IDS = [1060];

  const filtered = await getProductsByBrandCached(lang, CATEGORY_IDS, BRAND_ID);

  return (
    <ClientPage
      locale={locale}
      brands={{
        id: 1057,
        name: "RENOSEM",
        slug: "renosem",
      }}
      products={filtered}
    />
  );
}

