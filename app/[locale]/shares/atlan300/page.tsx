import type { Metadata } from "next";
import { getAlternates } from "../../components/atoms/hreflang/hreflang";
import  SharesAtlan from "./client-page";


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
        alternates: getAlternates("/shares/atlan300", locale),
        title: "Акція на Апарат наркозно-дихальний Dräger Atlan A300 та Монітор пацієнта Dräger Vista 120S | ДМ-Проект",
        description: "Акційна пропозиція на Апарат наркозно-дихальний Dräger Atlan A300 та Монітор пацієнта Dräger Vista 120S від виробника Dräger у Києві. Актуальні акції та знижки на медичне обладнання з гарантією та сервісним обслуговуванням. Вигідні умови для медичних закладів на dm-project.com.ua",
      }
    : {
        metadataBase: new URL("https://dm-project.com.ua"),
        alternates: getAlternates("/shares/atlan300", locale),
        title: "Promotion on Anesthesia workstation Dräger Atlan A300 and Patient monitor Dräger Vista 120S | DM-Project",
        description: "Special offer on the combination of Dräger Atlan A300 anaesthesia machine and Dräger Vista 120S from manufacturer Dräger in Kyiv. Current promotions and discounts with warranty and service support. Favourable terms for medical institutions at dm-project.com.ua",
      };
}

export default function Page() {
  return <SharesAtlan  />;
}
