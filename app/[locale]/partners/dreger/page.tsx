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

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const lang = locale === "ua" ? "ua" : "en";
  const BRAND_ID = 102;

  let page = 1;
  let totalPages = 1;
  const collected: any[] = [];

  do {
    const res = await api.get(`products`, {
      per_page: 100,
      page,
      lang,
    });

    totalPages = Number(res.headers["x-wp-totalpages"] || 1);

    const filtered = res.data.filter((p: any) =>
      p.brands?.some((b: any) => b.id === BRAND_ID)
    );

    collected.push(...filtered);
    page++;
  } while (page <= totalPages && collected.length < 15);

  // серверне сортування (аксесуари в кінець + алфавіт)
  collected.sort((a, b) => {
    const aIsAccessory = a.tags?.some((t: any) => t.slug === "accessories");
    const bIsAccessory = b.tags?.some((t: any) => t.slug === "accessories");

    if (aIsAccessory === bIsAccessory) {
      return a.name.localeCompare(b.name, lang === "ua" ? "uk" : "en");
    }

    return aIsAccessory ? 1 : -1;
  });

  const products = collected.slice(0, 15);

  return (
    <ClientPage
      locale={locale}
      brands={{
        id: 102,
        name: "Dräger",
        slug: "drager-brand",
      }}
      products={products}
    />
  );
}
