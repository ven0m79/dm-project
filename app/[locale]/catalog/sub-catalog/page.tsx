
'use client'

import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import styles from "./Sub-catalog.module.css";
import React from "react";

import { MainLayout } from "@app/[locale]/components/templates";
//import { unstable_setRequestLocale } from "next-intl/server";

// import { useRouter } from 'next/router'


import { useTranslations } from 'next-intl';
import classNames from 'classnames';

const SubCatalog = ({ params: { locale } }: { params: { locale: string } }) => {
  const t = useTranslations('Footer');
  // unstable_setRequestLocale(locale);
  // const router = useRouter();
  // const data = router.query;
  return (
    <MainLayout>
      <div className={classNames("flex flex-1 justify-left self-center", styles.subCatalog)}>
        <div className={classNames("h-auto font-bold", styles.subMenu)}>
          <Sidebar aria-label="Catalog">
            <Sidebar.Items>
              <Sidebar.ItemGroup className='flex flex-1 flex-col items-start'>
                <Sidebar.Item>{t('catalog')}</Sidebar.Item>
                <Sidebar.Collapse className={classNames('', styles.subItem)} label={t('or-equipment')} open>
                  <Sidebar.Item href="#">{t('or-equipment')} №1</Sidebar.Item>
                  <Sidebar.Item href="#">{t('or-equipment')} №2</Sidebar.Item>
                  <Sidebar.Item href="#">{t('or-equipment')} №3</Sidebar.Item>
                  <Sidebar.Item href="#">{t('or-equipment')} №4</Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Collapse className={classNames('', styles.subItem)} label={t('icu-equipment')}>
                  <Sidebar.Item href="#">{t('icu-equipment')} №1</Sidebar.Item>
                  <Sidebar.Item href="#">{t('icu-equipment')} №2</Sidebar.Item>
                  <Sidebar.Item href="#">{t('icu-equipment')} №3</Sidebar.Item>
                  <Sidebar.Item href="#">{t('icu-equipment')} №4</Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Collapse className={classNames('', styles.subItem)} label={t('neonatal-equipment')}>
                  <Sidebar.Item href="#">{t('neonatal-equipment')} №1</Sidebar.Item>
                  <Sidebar.Item href="#">{t('neonatal-equipment')} №2</Sidebar.Item>
                  <Sidebar.Item href="#">{t('neonatal-equipment')} №3</Sidebar.Item>
                  <Sidebar.Item href="#">{t('neonatal-equipment')} №4</Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Collapse className={classNames('', styles.subItem)} label={t('candd-equipment')}>
                  <Sidebar.Item href="#">{t('candd-equipment')} №1</Sidebar.Item>
                  <Sidebar.Item href="#">{t('candd-equipment')} №2</Sidebar.Item>
                  <Sidebar.Item href="#">{t('candd-equipment')} №3</Sidebar.Item>
                  <Sidebar.Item href="#">{t('candd-equipment')} №4</Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Collapse className={classNames('', styles.subItem)} label={t('gas-systems')}>
                  <Sidebar.Item href="#">{t('gas-systems')} №1</Sidebar.Item>
                  <Sidebar.Item href="#">{t('gas-systems')} №2</Sidebar.Item>
                  <Sidebar.Item href="#">{t('gas-systems')} №3</Sidebar.Item>
                  <Sidebar.Item href="#">{t('gas-systems')} №4</Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Collapse className={classNames('', styles.subItem)} label={t('other-equipment')}>
                  <Sidebar.Item href="#">{t('other-equipment')} №1</Sidebar.Item>
                  <Sidebar.Item href="#">{t('other-equipment')} №2</Sidebar.Item>
                  <Sidebar.Item href="#">{t('other-equipment')} №3</Sidebar.Item>
                  <Sidebar.Item href="#">{t('other-equipment')} №4</Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Collapse className={classNames('', styles.subItem)} label={t('accessories')}>
                  <Sidebar.Item href="#">{t('accessories')} №1</Sidebar.Item>
                  <Sidebar.Item href="#">{t('accessories')} №2</Sidebar.Item>
                  <Sidebar.Item href="#">{t('accessories')} №3</Sidebar.Item>
                  <Sidebar.Item href="#">{t('accessories')} №4</Sidebar.Item>
                </Sidebar.Collapse>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>
      </div>
      <div>

      </div>
    </MainLayout>
  );
};

export default SubCatalog;
