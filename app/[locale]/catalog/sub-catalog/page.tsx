import type { Metadata } from "next";
import { ClientPage } from "./client-page";
import  parse  from "html-react-parser";

type Props = {
  params: { locale: string };
  searchParams: { category?: string }; // Зробив `category` опціональним, оскільки в URL його може не бути
};

// Функція generateMetadata залишається, як у вашому коді.
// Вона відповідає за стандартні метатеги <title>, <meta name="description"> тощо.
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

    const category = categories[0];

    // 2️⃣ Беремо дані з Yoast SEO
    const yoast = category?.yoast_head_json;
    const title = yoast?.title || category?.name || categorySlug;
    const description =
      yoast?.description || category?.description?.trim() || "";

    return {
      title,
      description,
      openGraph: {
        title: yoast?.og_title || title,
        description: yoast?.og_description || description,
      },
      twitter: {
        title: yoast?.twitter_title || title,
        description: yoast?.twitter_description || description,
      },
    };
  } catch (error) {
    console.error("Error fetching category for metadata:", error);
    return {
      title: `DM-PROJECT: ${searchParams.category}`,
      description:
        "Error fetching category details. Please try again later.",
    };
  }
}

// ✅ Цей компонент стає асинхронним, щоб отримати дані для schema.org.
export default async function Page({ params, searchParams }: Props) {
  let schemaJson = null;
  const categorySlug = searchParams?.category;

  if (categorySlug) {
    try {
      // 1️⃣ Повторно отримуємо дані категорії, щоб мати доступ до schema_json
      // Це дозволяє зберегти generateMetadata чистим
      const categories = await fetch(
        `https://api.dm-project.com.ua/wp-json/wc/v3/products/categories?slug=${categorySlug}&lang=${params.locale}&consumer_key=ck_8dee30956004b4c7f467a46247004a2f4cd650e5&consumer_secret=cs_1cf0a573275e5cafe5af6bddbb01f29b9592be20`,
        { cache: "no-store" }
      ).then((res) => res.json());

      const activeCategory = categories?.[0];
      if (activeCategory?.schema_json) {
        // ✅ Перетворюємо дані в JSON-рядок, якщо це об'єкт
        schemaJson = typeof activeCategory.schema_json === "string"
          ? activeCategory.schema_json
          : JSON.stringify(activeCategory.schema_json);
      }
    } catch (error) {
      console.error("Error fetching schema data on the server:", error);
    }
  }

  return (
    <>
      
        {/* ✅ Рендеримо скрипт з schema.org тут, на сервері! */}
        {schemaJson && (
          <>{parse(schemaJson)}</>
        )}
      
      <ClientPage locale={params.locale} />
    </>
  );
}