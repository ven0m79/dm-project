import type { Metadata } from "next";
import { getAlternates } from "../../components/atoms/hreflang/hreflang";
import  AWD655_2h_v1 from "./client-page";


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
        alternates: getAlternates("/shares/AWD655-2H-V1", locale),
        title: "Мийно-дезінфекційна машина AWD655-2H",
        description: "Обладнання AT-OS – це розумний вибір для дезінфекції стоматологічних інструментів. Мийно-дезінфекційні машини гарантують ідеальні результати завдяки використанню найвищих технологій і здатні задовольнити всі вимоги стоматологічної галузі, завдяки широкому асортименту аксесуарів в комплекті.",
      }
    : {
        metadataBase: new URL("https://dm-project.com.ua"),
        alternates: getAlternates("/shares/AWD655-2H-V1", locale),
        title: "Мийно-дезінфекційна машина AWD655-2H",
        description: "Обладнання AT-OS – це розумний вибір для дезінфекції стоматологічних інструментів. Мийно-дезінфекційні машини гарантують ідеальні результати завдяки використанню найвищих технологій і здатні задовольнити всі вимоги стоматологічної галузі, завдяки широкому асортименту аксесуарів в комплекті.",
      };
}

export default function Page() {
  return <AWD655_2h_v1  />;
}
