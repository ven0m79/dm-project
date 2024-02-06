import React from "react";
import classNames from "classnames";
import { MainLayout } from "@app/[locale]/components/templates";
import styles from "./Feofania.module.css";
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from "config";
import Image from 'next/image';


const OhmatdetPage = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('AboutPage');
  return (
    <MainLayout>
      <div className=" text-black self-center h-96 text-5xl">НДСЛ “Охматдит”</div>
    </MainLayout>
  );
};

export default OhmatdetPage;
