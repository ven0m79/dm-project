import type { Metadata } from "next";
import { ClientPage } from "./client-page";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { locale } = await params;

  return locale === "ua"
    ? {
      title: "Проектування медичних закладів та лікарень | ДМ-Проект",
      description:
        "Проектування лікарень, клінік та діагностичних центрів в Києві та по Україні. Розробка проектної документації для медичних закладів, оснащення медичним обладнанням Dräger та авторський нагляд. Консультація та підтримка на dm-project.com.ua",
    }
    : {
      title: "Design of medical facilities and hospitals | DM-Project",
      description:
        "Design of hospitals, clinics and diagnostic centres in Kyiv and across Ukraine. Development of project documentation for medical facilities, equipping with Dräger medical equipment and author supervision. Consultation and support at dm-project.com.ua",
    };
}

export default function Page() {
  return <ClientPage />;
}
