import type { Metadata } from "next";

import { ClientPage } from "./home/client-page";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return locale === "ua"
    ? {
        title: "Медичне обладнання та оснащення для медзакладів | ДМ-Проект",
        description:
          "Купити медичне обладнання в Києві та Україні від виробника Dräger за кращими цінами. Замовити медичне оснащення для реанімаційних, операційних, неонатальних відділень та кабінетів мрт. Надійне рішення на dm-project.com.ua",
      }
    : {
        title: "Medical Equipment and Supplies for Healthcare Facilities | DM-Project",
        description:
          "Buy medical equipment in Kyiv and across Ukraine from Dräger at the best prices. Order medical supplies for intensive care, operating rooms, neonatal units, and MRI suites. Reliable solutions at dm-project.com.ua",
      };
}

export default function Root({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return <ClientPage params={{ locale }} />;
}
