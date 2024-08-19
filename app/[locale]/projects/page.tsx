'use client'
import React from "react";

import { useState } from 'react';
import Head from 'next/head';
import styles from './Project.module.css';
import classNames from "classnames";


import { MainLayout } from "@app/[locale]/components/templates";
import { unstable_setRequestLocale } from "next-intl/server";

import { useTranslations } from 'next-intl';
import { Link } from "config";
import Image from 'next/image';
import { title } from "process";

const ProjectPage = ({ params: { locale } }: { params: { locale: string } }) => {
  //unstable_setRequestLocale(locale);
  const t = useTranslations('ProjectPage');
  return (
    <MainLayout>
      <div className={classNames("flex flex-1 flex-col self-center", styles.main)}>
        <div className={styles.sendUsMessage}>
          {t('title')}
        </div>
        <div className={styles.stroke}></div>
        <div className={classNames("flex flex-1 flex-row justify-normal items-start w-full")}>
          <div className={classNames("flex flex-col justify-normal items-start w-full", styles.leftContainer)}>
            <div className={classNames("justify-normal items-start indent-4 w-full mt-8")}>
              <p className="text-2xl pb-4">{t('contact-prehead1')}</p>
            </div>
            <div className={classNames("")}>
              {t('contact-paragraph1')}
            </div>
            <div className={classNames("")}>
              {t('contact-paragraph2')}
            </div>
            <div className={classNames("")}>
              {t('contact-paragraph3')}
            </div>
            <div className={classNames("")}>
              {t('contact-paragraph4')}
            </div>
            <div className={classNames("justify-normal items-start indent-4 w-full mt-8")}>
              <p className="text-2xl pb-4">{t('contact-prehead2')}</p>
            </div>
            <div className={classNames("")}>
              {t('contact-paragraph5')}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectPage;
