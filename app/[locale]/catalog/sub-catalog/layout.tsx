"use client";

import React, { FC, ReactNode, useContext, useEffect } from "react";
import LSidebar from "@app/[locale]/components/molecules/leftSidebar/leftSidebar";
import RSidebar from "@app/[locale]/components/molecules/rightSidebar/rightSidebar";
import { MainLayout } from "@app/[locale]/components/templates";
import classNames from "classnames";
import styles from "./Sub-catalog.module.css";
import {
  SidebarContext,
  SidebarContextProps,
  SidebarProvider,
} from "@app/[locale]/components/contexts/products-sidebar/products-sidebar.context";
import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";

const Content: FC<{
  children: ReactNode;
  locale: string;
}> = ({ children, locale }) => {
  const { getData } = useContext(SidebarContext) as SidebarContextProps;
  const isMobile = useIsMobile();

  useEffect(() => {
    getData(locale);
  }, [getData, locale]);

  return (
    <div
      className={classNames(
        "flex flex-1 flex-row justify-between self-center mb-5 mt-5",
        styles.subCatalog,
      )}
    >
      {typeof window !== "undefined" && isMobile ?
        null
        :
        <div className="w-[300px]">
        {/* Компонента1 */}
        <LSidebar locale={locale} changeURLParams />
      </div>
      }
 
      {/* Основное содержимое */}
      <div className="w-full">{children}</div>

      {typeof window !== "undefined" && isMobile ?
        null
        :
        <div className="w-[300px]">
        {/* Компонента1 */}
        <RSidebar locale={locale} changeURLParams />
      </div>
      }
    </div>
  );
};

export default function Layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <MainLayout>
      <SidebarProvider>
        <Content locale={locale}>{children}</Content>
      </SidebarProvider>
    </MainLayout>
  );
}
