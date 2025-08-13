import type { Metadata } from "next";
import { ClientPage } from "./client-page";

type Props = {
  params: { locale: string };
  searchParams: { category: string };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const categorySlug = searchParams.category;

  try {
    // 1️⃣ Отримуємо категорію по slug
    const categories = await fetch(
      `https://api.dm-project.com.ua/wp-json/wc/v3/products/categories?slug=${categorySlug}&lang=${params.locale}&consumer_key=ck_8dee30956004b4c7f467a46247004a2f4cd650e5&consumer_secret=cs_1cf0a573275e5cafe5af6bddbb01f29b9592be20`,
      { cache: "no-store" }
    ).then((res) => res.json());

    if (!categories || categories.length === 0) {
      throw new Error("Category not found");
    }

    let category = categories[0];
    let categoryName = category?.name || categorySlug;
    let categoryDescription = category?.description?.trim() || "";

    // 2️⃣ Якщо опис пустий — робимо окремий запит по ID
    if (!categoryDescription) {
      const fullCategoryData = await fetch(
        `https://api.dm-project.com.ua/wp-json/wc/v3/products/categories/${category.id}?lang=${params.locale}&consumer_key=ck_8dee30956004b4c7f467a46247004a2f4cd650e5&consumer_secret=cs_1cf0a573275e5cafe5af6bddbb01f29b9592be20`,
        { cache: "no-store" }
      ).then((res) => res.json());

      if (fullCategoryData?.description?.trim()) {
        categoryDescription = fullCategoryData.description.trim();
      }
    }

    return params.locale === "ua"
      ? {
          title: `ДМ-ПРОЕКТ: ${categoryName}`,
          description: categoryDescription,
        }
      : {
          title: `DM-PROJECT: ${categoryName}`,
          description: categoryDescription,
        };
  } catch (error) {
    console.error("Error fetching category:", error);
    return {
      title: `DM-PROJECT: ${searchParams.category}`,
      description:
        "Error fetching category details. Please try again later.",
    };
  }
}

export default function Page({ params }: Props) {
  return <ClientPage locale={params.locale} />;
}
