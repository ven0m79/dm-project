import React from "react";
import { useTranslations } from 'next-intl';

import { MainLayout } from "@app/[locale]/components/templates";
import { unstable_setRequestLocale } from "next-intl/server";

const Decisions = ({params: {locale}}: {params: {locale: string}}) => {
  unstable_setRequestLocale(locale);
  return (
    <MainLayout>
      <div className="flex flex-1 justify-center items-center text-red-900">
      </div>
    </MainLayout>
  );
};

export default Decisions;
