"use client"
import React, { Suspense } from "react";
import { useTranslations } from 'next-intl';

import { MainLayout } from "@app/[locale]/components/templates";

const Decisions = ({ params: { locale } }: { params: { locale: string } }) => {
  return (
    <MainLayout>
      <Suspense fallback="Loading">
        <div className="flex flex-1 justify-center items-center text-red-900">
        </div>
      </Suspense>
    </MainLayout>
  );
};

export default Decisions;
