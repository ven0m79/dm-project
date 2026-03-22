import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ClientPage } from "./client-page";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export const revalidate = 300;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_RITE_URL!,
  consumerKey: process.env.WC_CONSUMER_KEY!,
  consumerSecret: process.env.WC_CONSUMER_SECRET!,
  version: "wc/v3",
});

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
      title: "Партнер RENOSEM | ДМ-Проект",
      description:
        "RENOSEM  — офіційний партнер DM Project. Медичне обладнання та аксесуари.",
    }
    : {
      title: "Partner RENOSEM  | DM-Project",
      description:
        "RENOSEM  official partner. Medical equipment and accessories.",
    };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const lang = locale === "ua" ? "ua" : "en";

  const BRAND_ID = 1057;
  const CATEGORY_ID = 1060;

  const res = await api.get("products", {
    per_page: 20,
    page: 1,
    category: CATEGORY_ID,
    lang,
  });

  const filtered = res.data.filter((p: any) =>
    p.brands?.some((b: any) => b.id === BRAND_ID),
  );

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

