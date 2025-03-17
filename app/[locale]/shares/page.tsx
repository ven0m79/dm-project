import type { Metadata } from "next";

import { ClientPage } from "./client-page";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return locale === "ua"
    ? {
        title: "ДМ-ПРОЕКТ: Акційні пропозиції",
        description:
          "«ДМ-ПРОЕКТ», уповноважений представник Drägerwerk AG & Co. KGaA (Німеччина) в Україні, пропонує до поставки наступні Акційні пропозиції медичне обладнання",
      }
    : {
        title: "DM-PROJECT: Special offers",
        description:
          "«DM-PROEKT», an authorized representative of Drägerwerk AG & Co. KGaA (Germany) in Ukraine, offers the following promotional offers for medical equipment for delivery",
      };
}

export default function Page() {
  return <ClientPage />;
}
