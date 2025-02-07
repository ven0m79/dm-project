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
  return params.locale === "ua"
    ? {
        title: `ДМ-ПРОЕКТ: ${searchParams.category}`,
        description:
          "Пропонуємо Вам сучасне обладнання різних типів та призначень.",
      }
    : {
        title: `DM-PROJECT: ${searchParams.category}`,
        description:
          "Today, the company's main activities include not only the sale of high-quality medical equipment, but also the development and implementation of integrated solutions for medical institutions, from design to service and staff training.",
      };
}

export default function Page({ params }: Props) {
  return <ClientPage locale={params.locale} />;
}
