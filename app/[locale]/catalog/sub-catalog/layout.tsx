"use client";

import React, { FC, ReactNode, useEffect, useState } from "react";
import LSidebar from "@app/[locale]/components/molecules/leftSidebar/leftSidebar";
import RSidebar from "@app/[locale]/components/molecules/rightSidebar/rightSidebar";
import { MainLayout } from "@app/[locale]/components/templates";
import classNames from "classnames";
import styles from "./Sub-catalog.module.css";
import { SidebarProvider } from "@app/[locale]/components/contexts/products-sidebar/products-sidebar.context";
import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";
import { motion } from "framer-motion";

const Content: FC<{ children: ReactNode; locale: string; }> = ({
  children,
  locale,
}) => {
  const isMobile = useIsMobile();
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = isLeftSidebarOpen || isRightSidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "auto";
    };
  }, [isLeftSidebarOpen, isRightSidebarOpen]);

  // useEffect(() => {
  //   getData(locale);
  // }, [getData, locale]);

  return (
    <div className={classNames("flex flex-1 flex-row justify-between self-center mb-5 mt-5 mx-2", styles.subCatalog)}>
      {/* Ліва панель */}
      {typeof window !== "undefined" && isMobile ? (
        <>
          <button className={classNames("absolute top-52 left-2 z-30 bg-transparent text-[#0061AA] p-2 rounded-md", styles.buttons)}
            onClick={() => setIsLeftSidebarOpen(true)}>☰ По призначенню</button>

          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 200 }}
            initial={{ x: "-100%" }}
            animate={{ x: isLeftSidebarOpen ? "0%" : "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 w-full h-full bg-white/50 backdrop-blur-sm shadow-lg z-50 cursor-grab active:cursor-grabbing overflow-y-auto">
            <button className="absolute top-7 right-3 text-xl text-slate-800 font-bold text-[30px]" onClick={() => setIsLeftSidebarOpen(false)}>✕</button>
            <div className="p-4"><LSidebar locale={locale} changeURLParams /></div>
          </motion.div>

          {isLeftSidebarOpen && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30" onClick={() => setIsLeftSidebarOpen(false)} />}
        </>
      ) : (
        <div className="w-[300px]"><LSidebar locale={locale} changeURLParams /></div>
      )}

      {/* Основний контент */}
      <div className="w-full">
        {children}
      </div>

      {/* Права панель */}
      {typeof window !== "undefined" && isMobile ? (
        <>
          <button className={classNames("absolute top-52 right-2 z-30 bg-transparent text-[#0061AA] p-2 rounded-md", styles.buttons)}
            onClick={() => setIsRightSidebarOpen(true)}>☰ Тип обладнання</button>

          <motion.div drag="x" dragConstraints={{ left: 0, right: 200 }} initial={{ x: "-100%" }} animate={{ x: isRightSidebarOpen ? "0%" : "-100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed top-0 left-0 w-full h-full bg-white/50 backdrop-blur-sm shadow-lg z-50 cursor-grab active:cursor-grabbing overflow-y-auto">
            <button className="absolute top-4 right-4 text-xl text-slate-800" onClick={() => setIsRightSidebarOpen(false)}>✕</button>
            <div className="p-4"><RSidebar locale={locale} changeURLParams /></div>
          </motion.div>

          {isRightSidebarOpen && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30" onClick={() => setIsRightSidebarOpen(false)} />}
        </>
      ) : (
        <div className="w-[300px]"><RSidebar locale={locale} changeURLParams /></div>
      )}
    </div>
  );
};

export default function Layout({ children, params: { locale } }: { children: ReactNode; params: { locale: string } }) {
  return (
    <MainLayout>
      <SidebarProvider locale={locale} initialCategories={[]}>
        <Content locale={locale}>{children}</Content>
      </SidebarProvider>
    </MainLayout>
  );
}