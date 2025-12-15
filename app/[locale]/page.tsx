import type { Metadata } from "next";
import { ClientPage } from "./home/client-page";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { locale } = await params;

  return locale === "ua"
    ? {
        title: "Медичне обладнання, представник Dräger в Україні | ДМ-Проект",
        description:
          "Купити медичне обладнання в Києві та Україні від виробника Dräger за кращими цінами. Замовити медичне оснащення для реанімаційних, операційних, неонатальних відділень та кабінетів МРТ. Надійне рішення на dm-project.com.ua",
      }
    : {
        title: "Medical Equipment, Dräger representative in Ukraine | DM-Project",
        description:
          "Buy medical equipment in Kyiv and across Ukraine from Dräger at the best prices. Order medical supplies for intensive care, operating rooms, neonatal units, and MRI suites. Reliable solutions at dm-project.com.ua",
      };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  return <ClientPage params={{ locale }} />;
}
