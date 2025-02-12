import type { Metadata } from "next";

import  SharesPolaris2002 from "./client-page";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return locale === "ua"
    ? {
        title: "Світильник операційний Polaris 200 двокупольний",
        description: "Системи хірургічного освітлення Polaris®200 забезпечують прохолодне світло з природними кольорами та насиченим контрастом для тисяч годин безтурботної роботи без навантаження на бюджет вашої лікарні.",
      }
    : {
        title: "Double operating light Polaris 200",
        description: "Polaris®200 surgical lighting systems provide cool light with natural colors and rich contrast for thousands of hours of worry-free work without straining your hospital budget.",
      };
}

export default function Page() {
  return <SharesPolaris2002  />;
}
