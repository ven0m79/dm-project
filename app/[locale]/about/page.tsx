import React from "react";
import classNames from "classnames";
import { MainLayout } from "@app/[locale]/components/templates";
import styles from "./About.module.css";
import {unstable_setRequestLocale} from 'next-intl/server';
import { useTranslations } from 'next-intl';



const AboutPage = ({params: {locale}}: {params: {locale: string}}) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('AboutPage');
  return (
    <MainLayout>
      <div
        className={classNames(
          "flex flex-1 justify-center items-start",
          styles["aboutContainer"],
        )}
      >
        <div
          className={classNames(
            "flex justify-center items-start rounded-xl w-30",
            styles["aboutMainPhoto"],
          )}
        />
        <div
          className={classNames(
            "flex flex-column justify-center items-start",
            styles["aboutText"],
          )}
        >
          <div className={classNames("m-2 indent-5 text-justify")}>
          {t('information1')}
          </div>
          <div className={classNames("m-2 indent-5 text-justify")}>
          {t('information2')}
          </div>
          <div className={classNames("m-2 indent-5 text-justify")}>
          {t('information3')}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
