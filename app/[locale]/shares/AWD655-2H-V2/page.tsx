import type { Metadata } from "next";

import  AWD655_2h_v2 from "./client-page";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return locale === "ua"
    ? {
        title: "Акція на Мийно-дезінфекційну машину AWD655-2H",
        description: "Акційна пропозиція на Мийно-дезінфекційну машину AWD655-2H від виробника AT-OS у Києві. Актуальні акції та знижки на медичне обладнання з гарантією та сервісним обслуговуванням. Вигідні умови для медичних закладів на dm-project.com.ua",
      }
    : {
        title: "Promotion on Washing-disinfecting machines AT-OS AWD655-2 | DM-Project",
        description: "Special offer on the Washing-disinfecting machines AT-OS AWD655-2 from manufacturer AT-OS in Kyiv. Current promotions and discounts with warranty and service support. Favourable terms for medical institutions at dm-project.com.ua",
      };
}

export default function Page() {
  return <AWD655_2h_v2  />;
}
