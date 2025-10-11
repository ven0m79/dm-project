"use client";

import React, { FC, ReactNode, useEffect, useState } from "react";
import LSidebar from "@app/[locale]/components/molecules/leftSidebar/leftSidebar";
import RSidebar from "@app/[locale]/components/molecules/rightSidebar/rightSidebar";
import { MainLayout } from "@app/[locale]/components/templates";
import classNames from "classnames";
import styles from "./Sub-catalog.module.css";
import { SidebarProvider } from "@app/[locale]/components/contexts/products-sidebar/products-sidebar.context";
import { motion } from "framer-motion";

/** ----------------
 *  Вміст сторінки
 *  ---------------- */
const Content: FC<{ children: ReactNode; locale: string }> = ({ children, locale }) => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  // Забороняємо прокрутку фону при відкритих sidebar
  useEffect(() => {
    document.body.style.overflowY = isLeftSidebarOpen || isRightSidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isLeftSidebarOpen, isRightSidebarOpen]);

  return (
    <div
      className={classNames(
        "flex flex-row justify-between self-center mb-5 mt-5 mx-2 w-full max-w-[1600px]",
        styles.subCatalog
      )}
    >
      {/* ----- Ліва панель (Desktop) ----- */}
      <div className="hidden md:block w-[300px] shrink-0">
        <LSidebar locale={locale} changeURLParams />
      </div>

      {/* ----- Ліва панель (Mobile з анімацією) ----- */}
      <button
        className={classNames(
          "md:hidden fixed top-52 left-3 z-30 bg-white text-[#0061AA] border border-[#0061AA] px-3 py-1 rounded-md shadow-sm",
          styles.buttons
        )}
        onClick={() => setIsLeftSidebarOpen(true)}
      >
        ☰ По призначенню
      </button>

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

      {isLeftSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsLeftSidebarOpen(false)}
        />
      )}

      {/* ----- Основний контент ----- */}
      <div className="flex-1 min-w-0 px-2">
        {children}
      </div>

      {/* ----- Права панель (Desktop) ----- */}
      <div className="hidden md:block w-[300px] shrink-0">
        <RSidebar locale={locale} changeURLParams />
      </div>

      {/* ----- Права панель (Mobile) ----- */}
      <button
        className={classNames(
          "md:hidden fixed top-52 right-3 z-30 bg-white text-[#0061AA] border border-[#0061AA] px-3 py-1 rounded-md shadow-sm",
          styles.buttons
        )}
        onClick={() => setIsRightSidebarOpen(true)}
      >
        ☰ Тип обладнання
      </button>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 200 }}
        initial={{ x: "-100%" }}
        animate={{ x: isRightSidebarOpen ? "0%" : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 w-full h-full bg-white/50 backdrop-blur-sm shadow-lg z-50 cursor-grab active:cursor-grabbing overflow-y-auto">
        <button className="absolute top-4 right-4 text-xl text-slate-800" onClick={() => setIsRightSidebarOpen(false)}>✕</button>
        <div className="p-4"><RSidebar locale={locale} changeURLParams /></div>
      </motion.div>

      {isRightSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsRightSidebarOpen(false)}
        />
      )}
    </div>
  );
};

/** ----------------
 *  Основний Layout
 *  ---------------- */
export default function Layout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <MainLayout>
      <SidebarProvider locale={locale}>
        <Content locale={locale}>{children}</Content>
      </SidebarProvider>
    </MainLayout>
  );
}
