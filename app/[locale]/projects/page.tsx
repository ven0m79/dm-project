import type { Metadata } from "next";

import { ClientPage } from "./client-page";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return locale === "ua"
    ? {
        title: "ДМ-ПРОЕКТ: Проектування",
        description:
          "Проектування медичних закладів на сьогоднішній день є досить важливою відокремленою галуззю медичного бізнесу, що досить швидко розвивається. Далеко не кожна проектна компанія здатна виконати документацію сучасного медичного закладу на гідному рівні. ДМ-ПРОЕКТ пропонує своїм замовникам повний спектр послуг з виготовлення проектної документації 'під ключ' на створення чи переоснащення медичного закладу",
      }
    : {
        title: "DM-PROJECT: Projects",
        description:
          "The design of medical facilities today is a fairly important separate branch of the medical business, which is developing quite quickly. Not every project company is able to complete the documentation of a modern medical facility at a decent level. DM-PROJECT offers its customers a full range of services for the production of turnkey project documentation for the creation or re-equipment of a medical facility",
      };
}

export default function Page() {
  return <ClientPage />;
}
