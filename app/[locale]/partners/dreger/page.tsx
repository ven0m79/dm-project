import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { ClientPage } from "./client-page";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ locale: string }>;
};

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_RITE_URL!,
  consumerKey: process.env.WC_CONSUMER_KEY!,
  consumerSecret: process.env.WC_CONSUMER_SECRET!,
  version: "wc/v3",
});

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

// ----------------- Функція, що тягне товари Dräger -----------------
async function getDragerProducts(locale: string) {
  let page = 1;
  let totalPages = 1;
  const allProducts: any[] = [];

  // Визначаємо мову для фільтру
  const lang = locale === "ua" ? "ua" : "en";

  do {
    const response = await api.get(`products?per_page=100&page=${page}`);

    if (response.status === 200) {
      totalPages = parseInt(response.headers["x-wp-totalpages"] || "1", 10);

      // Фільтруємо товари: Dräger + правильна мова
      const dragerProducts = response.data.filter(
        (product: { brands: any[]; lang?: string }) =>
          product.brands?.some(brand => brand.id === 102) &&
          product.lang === lang
      );

      allProducts.push(...dragerProducts);
      page++;
    } else {
      break;
    }
  } while (page <= totalPages);

  // Сортуємо товари за абеткою, при цьому accessories йдуть вкінці
  allProducts.sort((a, b) => {
    const aIsAccessory = a.tags?.some(
      (tag: any) => tag.slug?.toLowerCase() === "accessories"
    );
    const bIsAccessory = b.tags?.some(
      (tag: any) => tag.slug?.toLowerCase() === "accessories"
    );

    // Якщо обидва аксесуари або обидва не аксесуари — сортуємо за назвою
    if (aIsAccessory === bIsAccessory) {
      return a.name.localeCompare(b.name, lang === "ua" ? "uk" : "en");
    }

    // Якщо a аксесуар, а b ні — a вкінці
    return aIsAccessory ? 1 : -1;
  });


  return allProducts;
}


// ----------------- Page -----------------
export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  let products: any[] = [];
  try {
    products = await getDragerProducts(locale);
  } catch (err) {
    console.error("Failed to fetch Dräger products:", err);
  }

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
