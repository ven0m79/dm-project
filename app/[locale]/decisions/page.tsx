import React from "react";
import { useTranslations } from 'next-intl';

import { MainLayout } from "@app/[locale]/components/templates";

const Decisions = () => {
  return (
    <MainLayout>
      <div className="flex flex-1 justify-center items-center text-red-900">
Рішення
      </div>
    </MainLayout>
  );
};

export default Decisions;
