'use client'
import React from "react";

import { useState } from 'react';
import Head from 'next/head';
import styles from './Project.module.css';
import classNames from "classnames";
import imgProj from '../../../public/projectings.webp';


import { MainLayout } from "@app/[locale]/components/templates";
import { unstable_setRequestLocale } from "next-intl/server";

import { useTranslations } from 'next-intl';
import { useIsMobile } from "../components/hooks/useIsMobile";
import Image from "next/image";

export const ClientPage = () => {
  const t = useTranslations('ProjectPage');
  const isMobile = useIsMobile();
  console.log({ isMobile });

  return (
    <MainLayout>
      <div className={classNames("flex flex-1 flex-col self-center", styles.main)}>
        <div className={styles.sendUsMessage}>
          {t('title')}
        </div>
        <div className={styles.stroke}></div>

        <div className={classNames("flex flex-1 flex-row justify-normal items-start")}>
          <div className={classNames("flex flex-col justify-center items-start", styles.leftContainer)}>

            <div className={classNames("justify-normal items-start indent-4 mt-8")}>
              <p className=" pb-4">{t('project-head1')}</p>
                            <Image
                className="float-left mr-5 mt-2 w-full h-auto"
                src={imgProj}
                alt="photo"
              />
            </div>

            <div className={classNames("justify-normal items-start indent-4 mt-8")}>
              <p className="text-bold pb-4">{t('project-head2')}</p>

            </div>

            <div className={classNames("justify-normal items-start indent-4 mt-8")}>
              <p className="text-2xl pb-4">{t('project-prehead1')}</p>
            </div>

            <div className={classNames("")}>
              {t('project-paragraph1')}
            </div>
            <div className={classNames("")}>
              {t('project-paragraph2')}
            </div>
            <div className={classNames("")}>
              {t('project-paragraph3')}
            </div>
            <div className={classNames("")}>
              {t('project-paragraph4')}
            </div>

            <div className={classNames("justify-normal items-start indent-4 mt-8")}>
              <p className="text-2xl pb-4">{t('project-prehead2')}</p>
            </div>
            <div className={classNames("")}>
              {t('project-paragraph5')}
            </div>
            <div className={classNames("")}>
              {t('project-paragraph6')}
            </div>

            <div className={classNames("justify-normal items-start indent-4 mt-8")}>
              <p className="text-2xl pb-4">{t('project-prehead3')}</p>
            </div>
            <div className={classNames("")}>
              {t('project-paragraph7')}
            </div>
            <div className={classNames("")}>
              {t('project-paragraph8')}
            </div>
            <div className={classNames("")}>
              {t('project-paragraph9')}
            </div>            <div className={classNames("")}>
              {t('project-paragraph10')}
            </div>            <div className={classNames("")}>
              {t('project-paragraph11')}
            </div>            <div className={classNames("")}>
              {t('project-paragraph12')}
            </div>            <div className={classNames("")}>
              {t('project-paragraph13')}
            </div>            <div className={classNames("")}>
              {t('project-paragraph14')}
            </div>            <div className={classNames("")}>
              {t('project-paragraph15')}
            </div>            <div className={classNames("")}>
              {t('project-paragraph16')}
            </div>

            <div className={classNames("justify-normal items-start indent-4 mt-8")}>
              <p className="text-2xl pb-4">{t('project-prehead4')}</p>
            </div>
            <div className={classNames("")}>
              {t('project-paragraph17')}
            </div>
            <div className={classNames("")}>
              {t('project-paragraph18')}
            </div>
            <div className={classNames("")}>
              {t('project-paragraph19')}
            </div>
            <div className={classNames("")}>
              {t('project-paragraph20')}
            </div>
            <div className={classNames("")}>
              {t('project-paragraph21')}
            </div>
            <div className={classNames("")}>
              {t('project-paragraph22')}
            </div>
            <div className={classNames("")}>
              {t('project-paragraph23')}
            </div>

            <div className={classNames("justify-normal items-start indent-4 mt-8")}>
              <p className="text-2xl pb-4">{t('project-prehead5')}</p>
            </div>
            <div className={classNames("")}>
              {t('project-paragraph24')}
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
};

