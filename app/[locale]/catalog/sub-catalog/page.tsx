'use client'
import React from "react";

import { MainLayout } from "@app/[locale]/components/templates";
import { unstable_setRequestLocale } from "next-intl/server";

import { useRouter } from 'next/router'



const SubCatalog = ({ params: { locale } }: { params: { locale: string } }) => {

//  unstable_setRequestLocale(locale);
  const router = useRouter();
  const data = router.query;
  return (
    <MainLayout>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-6xl text-gray-900">Ви на сторінці Підкаталог</h1>
      </div>
    </MainLayout>
  );
};

export default SubCatalog;
