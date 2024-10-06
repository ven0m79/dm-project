"use client"
import React from "react";
import classNames from "classnames";
import { MainLayout } from "@app/[locale]/components/templates";
import styles from "./Kardio.module.css";
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from "config";
import Image from 'next/image';


const KardioPage = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('AboutPage');
  return (
    <MainLayout>
      <div className=" text-black self-center h-96 text-5xl">Вінницький Кардіоцентр</div>
    </MainLayout>
  );
};

export default KardioPage;
