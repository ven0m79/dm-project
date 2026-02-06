import type { Metadata } from "next";

import { ClientPage } from "./client-page";

export async function generateMetadata(props: {
  // Залишаємо тип як об'єкт, але обробляємо його як Promise всередині функції
  params: { locale: string }; 
}): Promise<Metadata> {
  
  // 🟢 КРИТИЧНЕ ВИПРАВЛЕННЯ: Явно очікуємо розгортання params, як вимагає Next.js
  // Next.js розглядає "params" як Promise або об'єкт, який потрібно "розгорнути"
  // в контексті Server Components.
  const { locale } = await props.params; // <--- ДОДАНО `await`
    
  return locale === "ua"
    ? {
        title: "Основні категорії продуктів | ДМ-Проект",
        description:
          "Сьогодні основними видами діяльності компанії є не тільки продаж медичного обладнання високого класу, а й розробка та впровадження комплексних рішень для медичних закладів, починаючи з проектування і закінчуючи сервісом та навчанням персоналу.",
      }
    : {
        title: "Main product categories | DM-Project",
        description:
          "Today, the company's main activities include not only the sale of high-quality medical equipment, but also the development and implementation of integrated solutions for medical institutions, from design to service and staff training.",
      };
}

export default function Page() {
  return <ClientPage />;
}