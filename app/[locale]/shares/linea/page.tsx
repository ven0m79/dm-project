import type { Metadata } from "next";

import  SharesLinea from "./client-page";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return locale === "ua"
    ? {
        title: "Консоль медична з настінним кріпленням Лінеа IM2",
        description: "Лінійка продуктів Linea розроблена для використання практично у всіх сферах. У звичайних палатах, відділеннях інтенсивної терапії, наркозних/операційних, реабілітації – завдяки своїй модульній конструкції сімейство Linea є індивідуальним рішенням для подачі медіа для багатьох застосувань у лікарні.",
      }
    : {
        title: "Wall medical supply unit Linea",
        description: "The Linea product range is designed for use in almost all areas. In conventional wards, intensive care units, anesthesia/operating rooms, rehabilitation – thanks to its modular design, the Linea family is a customized media supply solution for many applications in the hospital.",
      };
}

export default function Page() {
  return <SharesLinea  />;
}
