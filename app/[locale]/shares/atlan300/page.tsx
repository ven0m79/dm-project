import type { Metadata } from "next";

import  SharesAtlan from "./client-page";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return locale === "ua"
    ? {
        title: "Апарат наркозно-дихальний Atlan A300 та Монітор пацієнта Vista 120S",
        description: "Поєднання наркозного апарата Atlan А300 та мультипараметричного монітора Vista 120S забезпечує справжню інтегровану функціональність робочої станції. Наркозно-дихальний апарат Atlan А300 призначений для інгаляційної анестезії з низьким та мінімальним потоком у дорослих, дітей та новонароджених.",
      }
    : {
        title: "Anesthesia workstation Atlan A300 and Patient monitor Vista 120S",
        description: "The combination of Atlan A300 anaesthesia machine and Vista 120S multi-parameter monitor provides true integrated workstation functionality. Atlan A300 is designed for low-flow and minimal-flow inhalation anaesthesia in adults, pediatric patients and neonates.",
      };
}

export default function Page() {
  return <SharesAtlan  />;
}
