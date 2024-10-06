"use client";

import React, { Suspense } from "react";
import classNames from "classnames";
import { MainLayout } from "@app/[locale]/components/templates";
import styles from "./Kardio.module.css";
import { useTranslations } from 'next-intl';
import { Link } from "config";
import Image from 'next/image';

const KardioPage = ({ params: { locale } }: { params: { locale: string } }) => {
  const t = useTranslations('AboutPage');

  return (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="text-black self-center h-96 text-5xl">
          Вінницький Кардіоцентр
        </div>
      </Suspense>
    </MainLayout>
  );
};

export default KardioPage;
