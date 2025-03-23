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
  const categorySlug = searchParams.category; // Get the category slug from the searchParams

  try {
    // Fetch category data from the API
    const category = await fetch(
      `https://api.dm-project.com.ua/wp-json/wc/v3/products/categories?slug=${categorySlug}&lang=${params.locale}&consumer_key=ck_8dee30956004b4c7f467a46247004a2f4cd650e5&consumer_secret=cs_1cf0a573275e5cafe5af6bddbb01f29b9592be20`
    ).then((res) => res.json());

    // Check if category data is found
    if (!category || category.length === 0) {
      throw new Error("Category not found");
    }

    // Extract the name of the category
    const categoryName = category[0]?.name || categorySlug; // Fallback to the slug if name is unavailable
    const categoryDescription = category[0]?.description;

    return params.locale === "ua"
      ? {
        title: `ДМ-ПРОЕКТ: ${categoryName}`,
        description: `${categoryDescription}`,
      }
      : {
        title: `DM-PROJECT: ${categoryName}`,
        description: `${categoryDescription}`,
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
