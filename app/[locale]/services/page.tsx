import type { Metadata } from "next";

import { ClientPage } from "./client-page";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return locale === "ua"
    ? {
        title: "ДМ-ПРОЕКТ: Сервісне обслуговування",
        description:
          "Компанія ДМ-ПРОЕКТ проводить планомірну роботу з підтримки обладнання Dräger у робочому стані. В Україні налічується понад 4200 одиниць медичної апаратури Dräger, і для кожної з них існує індивідуальний план обслуговування, розроблений сервісною службою ДМ-ПРОЕКТ.",
      }
    : {
        title: "DM-PROJECT: Service",
        description:
          "The company DM-PROJECT carries out systematic work to maintain Dräger equipment in working condition. There are more than 4200 units of Dräger medical devices in Ukraine, and for each of them there is an individual service plan developed by the DM-PROJECT service department.",
      };
}

export default function Page() {
  return <ClientPage />;
}
