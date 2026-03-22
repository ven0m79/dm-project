import type { Metadata } from "next";

import SharesPolaris2002 from "./client-page";


type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { locale } = await params;
  return locale === "ua"
    ? {
      title: "Акція на Світильник операційний Polaris 200 двокупольний | ДМ-Проект",
      description: "Акційна пропозиція на Світильник операційний Polaris 200 двокупольний від виробника Dräger у Києві. Актуальні акції та знижки на медичне обладнання з гарантією та сервісним обслуговуванням. Вигідні умови для медичних закладів на dm-project.com.ua",
    }
    : {
      title: "Promotion on Double operating light Polaris 200 | DM-Project",
      description: "Special offer on Double operating light Polaris 200 from manufacturer Dräger in Kyiv. Current promotions and discounts with warranty and service support. Favourable terms for medical institutions at dm-project.com.ua",
    };

}

export default function Page() {
  return <SharesPolaris2002 />; 
}
