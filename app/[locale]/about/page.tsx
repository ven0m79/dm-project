// app/[locale]/about/page.tsx
import type { Metadata } from "next";
import { ClientPage } from "./client-page";
import { setRequestLocale } from 'next-intl/server';
import { getAlternates } from "../components/atoms/hreflang/hreflang";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  
  const { locale } = await params;

  // 💡 ОПЦІЙНО: Можна додати setRequestLocale, але зазвичай це роблять у компоненті Page або Layout
  setRequestLocale(locale); 

  return locale === "ua"
    ? {
        metadataBase: new URL("https://dm-project.com.ua"),
        alternates: getAlternates("/about", locale),
        title: "Медичне обладнання, проектування та сервіс | ДМ-Проект",
        description: "ДМ-Проект лідер у сфері проектування та оснащення медичних закладів сучасним обладнанням Dräger. Гарантія якості, сервісне обслуговування медичного обладнання та навчання персоналу. Надійний партнер українських лікарів dm-project.com.ua",
      }
    : {
        metadataBase: new URL("https://dm-project.com.ua"),
        alternates: getAlternates("/about", locale),
        title: "Medical equipment, design and service | DM-Project",
        description: "DM-Project is a leader in the design and equipping of medical facilities with modern Dräger equipment. Quality assurance, medical equipment servicing and staff training. A reliable partner for Ukrainian doctors dm-project.com.ua",
      };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  
  const { locale } = await params;
  
  // 💡 ОБОВ'ЯЗКОВО: Встановлюємо локаль для коректної роботи next-intl у Server Components.
  setRequestLocale(locale); 

  // Це дозволить передати синхронний об'єкт локалі у ClientPage
  return <ClientPage params={{ locale }} />; 
}