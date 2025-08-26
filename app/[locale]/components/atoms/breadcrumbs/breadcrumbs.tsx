"use client";
import React, { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";
import Link from "next/link";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

type BreadcrumbItem = {
  position: number;
  name: string;
  item?: string; // може бути відсутнім для останнього елемента
};

type BreadcrumbsProps = {
  locale: string;
  productOrCategoryId: number; // id продукту або категорії
  type: "product" | "category"; // щоб знати, який ендпоінт
};

const api = new WooCommerceRestApi({
  url: "https://api.dm-project.com.ua",
  consumerKey: "ck_8dee30956004b4c7f467a46247004a2f4cd650e5",
  consumerSecret: "cs_1cf0a573275e5cafe5af6bddbb01f29b9592be20",
  version: "wc/v3",
  queryStringAuth: true,
});

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  locale,
  productOrCategoryId,
  type,
}) => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    async function fetchBreadcrumbs() {
      try {
        let endpoint =
          type === "product"
            ? `products/${productOrCategoryId}?lang=${locale}`
            : `products/categories/${productOrCategoryId}?lang=${locale}`;

        const response = await api.get(endpoint);

        if (response.status === 200) {
          const data = response.data;

          // ✅ шукаємо BreadcrumbList у Yoast SEO JSON
          const breadcrumbGraph = data?.yoast_head_json?.schema?.["@graph"]?.find(
            (el: any) => el["@type"] === "BreadcrumbList"
          );

          if (breadcrumbGraph?.itemListElement) {
            const parsed: BreadcrumbItem[] =
              breadcrumbGraph.itemListElement.map((el: any) => ({
                position: el.position,
                name: el.name,
                item: el.item,
              }));

            setBreadcrumbs(parsed);
          }
        }
      } catch (err) {
        console.error("Failed to fetch breadcrumbs:", err);
      }
    }

    fetchBreadcrumbs();
  }, [productOrCategoryId, locale, type]);

  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  // --- Мобільна версія ---
  if (isMobile) {
    const mobileItem =
      breadcrumbs.length > 1
        ? breadcrumbs[breadcrumbs.length - 2]
        : breadcrumbs[0];

    return (
      <nav className="text-sm breadcrumbs mb-1 mt-2 ml-2">
        {mobileItem.item ? (
          <Link
            href={mobileItem.item}
            className="underline text-blue-600 hover:text-blue-800"
          >
            {mobileItem.name}
          </Link>
        ) : (
          <span className="text-gray-500">{mobileItem.name}</span>
        )}
      </nav>
    );
  }

  // --- Десктопна версія ---
  return (
    <nav className="text-sm breadcrumbs mb-4 ml-6">
      {breadcrumbs.map((item, idx) => {
        const isLast = idx === breadcrumbs.length - 1;
        return (
          <React.Fragment key={idx}>
            {!isLast && item.item ? (
              <Link
                href={item.item}
                className="underline text-blue-600 hover:text-blue-800"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-gray-500">{item.name}</span>
            )}
            {!isLast && " / "}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
