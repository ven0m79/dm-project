import type { Metadata } from "next";
import { getAlternates } from "../../components/atoms/hreflang/hreflang";
import  SharesPolaris200 from "./client-page";


type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { locale } = await params;
  return locale === "ua"
    ? {
        metadataBase: new URL("https://dm-project.com.ua"),
        alternates: getAlternates("/shares/polaris200", locale),
        title: "Акція на Світильник операційний Polaris 200 однокупольний | ДМ-Проект",
        description: "Акційна пропозиція на Світильник операційний Polaris 200 однокупольний від виробника Dräger у Києві. Актуальні акції та знижки на медичне обладнання з гарантією та сервісним обслуговуванням. Вигідні умови для медичних закладів на dm-project.com.ua",
      }
    : {
        metadataBase: new URL("https://dm-project.com.ua"),
        alternates: getAlternates("/shares/polaris200", locale),
        title: "Promotion on Single operating light Polaris 200 | DM-Project",
        description: "Special offer on Single operating light Polaris 200 from manufacturer Dräger in Kyiv. Current promotions and discounts with warranty and service support. Favourable terms for medical institutions at dm-project.com.ua",
      };
}

export default function Page() {
  return <SharesPolaris200  />;
}
