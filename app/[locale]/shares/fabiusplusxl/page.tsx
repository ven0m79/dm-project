import type { Metadata } from "next";

import  SharesFabiusXL from "./client-page";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return locale === "ua"
    ? {
        title: "Апарат наркозно-дихальний Fabius plus XL та Монітор пацієнта Vista 120S",
        description: "Ми пропонуємо готове рішення для вашої операційної – анестезіологічну станцію Fabius plus XL / Vista 120S. Поєднання наркозного апарата Fabius plus XL та мультипараметричного монітора Vista 120S забезпечує справжню інтегровану функціональність робочої станції.",
      }
    : {
        title: "Anesthesia workstation Fabius plus XL and Patient monitor Vista 120S",
        description: "We offer a complete solution for your operating room - the Fabius plus XL / Vista 120S Аnesthesia Station. The combination of the Fabius plus XL anesthesia machine and the Vista 120S multiparameter monitor provides true integrated workstation functionality.",
      };
}

export default function Page() {
  return <SharesFabiusXL  />;
}
