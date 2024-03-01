"use client";

import { Sidebar } from "flowbite-react";
import styles from "./Sub-catalog.module.css";
import React, { useCallback, useEffect, useState } from "react";
import { MainLayout } from "@app/[locale]/components/templates";
//import { unstable_setRequestLocale } from "next-intl/server";
// import { useRouter } from 'next/router'
import { useTranslations } from "next-intl";
import classNames from "classnames";

import { fetchWooCommerceProducts } from "../../../../utils/woocommerce.setup";
//import { fetchWooCommerceMonitors } from "../../../../utils/woocommerce.setup";

import Link from "next/link";


const SubCatalog = ({ params: { locale } }: { params: { locale: string } }) => {
  const t = useTranslations("Footer");
  // unstable_setRequestLocale(locale);
  // const router = useRouter();
  // const data = router.query;

  // useEffect(() => {
  //   fetchWooCommerceProducts();
  // }, []);


  
  return (
    <MainLayout>
      <div
        className={classNames(
          "flex flex-1 flex-row justify-between self-center",
          styles.subCatalog,
        )}
      >
        <div className={classNames("mt-4", styles.subMenu)}>
          <div className={classNames("mt-3", styles.subMenuDashHead)}>Каталог по типу призначення</div>
          <Sidebar aria-label="Catalog" className="">
            <Sidebar.ItemGroup>
              <Sidebar.Collapse className={classNames('', styles.subCollapse)} label={t('or-equipment')} open>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={fetchWooCommerceProducts}>{"Наркозно-дихальні апарати "}</Sidebar.Item>
                {/* <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={fetchWooCommerceMonitors}>{"Монітори пацієнта"}</Sidebar.Item> */}
              </Sidebar.Collapse>
            </Sidebar.ItemGroup>
          </Sidebar>
          <div className={classNames("", styles.subMenuDash)}></div>
        </div>
        <div className='text-gray-400 mx-4'>
          <ul>
          {}
          </ul>          
        </div>
        <div className={classNames("mt-4", styles.subMenu)}>
          <div className={classNames("mt-3", styles.subMenuDashHead)}>Каталог по типу обладнання</div>
          <Sidebar aria-label="Catalog">
            <Sidebar.ItemGroup>
            </Sidebar.ItemGroup>
          </Sidebar>
          <div className={classNames("", styles.subMenuDash)}></div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SubCatalog;
