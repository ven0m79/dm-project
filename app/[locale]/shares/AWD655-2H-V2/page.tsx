import type { Metadata } from "next";

import  AWD655_2h_v2 from "./client-page";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return locale === "ua"
    ? {
        title: "Мийно-дезінфекційна машина AWD655-2H",
        description: "Обладнання AT-OS – це розумний вибір для дезінфекції стоматологічних інструментів. Мийно-дезінфекційні машини гарантують ідеальні результати завдяки використанню найвищих технологій і здатні задовольнити всі вимоги стоматологічної галузі, завдяки широкому асортименту аксесуарів в комплекті.",
      }
    : {
        title: "Мийно-дезінфекційна машина AWD655-2H",
        description: "Обладнання AT-OS – це розумний вибір для дезінфекції стоматологічних інструментів. Мийно-дезінфекційні машини гарантують ідеальні результати завдяки використанню найвищих технологій і здатні задовольнити всі вимоги стоматологічної галузі, завдяки широкому асортименту аксесуарів в комплекті.",
      };
}

export default function Page() {
  return <AWD655_2h_v2  />;
}
