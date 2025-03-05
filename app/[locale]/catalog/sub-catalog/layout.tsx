"use client";

import React, { FC, ReactNode, useContext, useEffect, useState } from "react";
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
import { AnimatePresence, motion } from "framer-motion";

const Content: FC<{
  children: ReactNode;
  locale: string;
}> = ({ children, locale }) => {
  const { getData } = useContext(SidebarContext) as SidebarContextProps;
  const isMobile = useIsMobile();
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflowX = "hidden"; // Убираем горизонтальный скроллбар всегда
  
    if (isLeftSidebarOpen || isRightSidebarOpen) {
      document.body.style.overflowY = "hidden"; // Блокируем вертикальный скролл при открытых сайдбарах
    } else {
      document.body.style.overflowY = "auto"; // Возвращаем вертикальный скролл
    }
  
    return () => {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "auto";
    };
  }, [isLeftSidebarOpen, isRightSidebarOpen]);

  useEffect(() => {
    getData(locale);
  }, [getData, locale]);

  return (
    <div
      className={classNames(
        "flex flex-1 flex-row justify-between self-center mb-5 mt-5 mx-2",
        styles.subCatalog,
      )}
    >
      {typeof window !== "undefined" && isMobile ? (
        <>
          {/* Кнопка для открытия бокового меню */}
          <button
            className={classNames("absolute top-52 left-2 z-30 bg-transparent text-[#0061AA] p-2 rounded-md", styles.buttons)}
            onClick={() => setIsLeftSidebarOpen(true)}
          >
            ☰ По призначенню
          </button>

          {/* Всплывающее меню */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 200 }} 
            initial={{ x: "-100%" }} 
            animate={{ x: isLeftSidebarOpen ? "0%" : "-100%" }} 
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 w-full h-full bg-white/50 backdrop-blur-lg shadow-lg z-50 cursor-grab active:cursor-grabbing overflow-y-auto"
          >
            {/* Кнопка закрытия */}
            <button
              className="absolute top-7 right-3 text-xl text-slate-800 font-bold text-[30px]"
              onClick={() => setIsLeftSidebarOpen(false)}
            >
              ✕
            </button>

            {/* Контент внутри окна */}
            <div className="p-4">
              <LSidebar locale={locale} changeURLParams />
            </div>
          </motion.div>

          {/* Затемнение фона при открытом меню */}
          {isLeftSidebarOpen && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30"
              onClick={() => setIsLeftSidebarOpen(false)}
            />
          )}
        </>
      ) : (
        <div className="w-[300px]">
          <LSidebar locale={locale} changeURLParams />
        </div>
      )}

      {/* Основное содержимое */}
      <div className="w-screen">{children}</div>

      {typeof window !== "undefined" && isMobile ?
        <>
          {/* Кнопка для открытия бокового меню */}
          <button
            className={classNames("absolute top-52 right-2 z-30 bg-transparent text-[#0061AA] p-2 rounded-md", styles.buttons)}
            onClick={() => setIsRightSidebarOpen(true)}
          >
            ☰ Тип обладнання
          </button>

          {/* Всплывающее меню */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 200 }}
            initial={{ x: "-100%" }}
            animate={{ x: isRightSidebarOpen ? "0%" : "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 w-full h-full bg-white shadow-lg z-50 cursor-grab active:cursor-grabbing overflow-y-auto"
          >
            {/* Кнопка закрытия */}
            <button
              className="absolute top-4 right-4 text-xl text-slate-800"
              onClick={() => setIsRightSidebarOpen(false)}
            >
              ✕
            </button>

            {/* Контент внутри окна */}
            <div className="p-4">
              <RSidebar locale={locale} changeURLParams />
            </div>
          </motion.div>

          {/* Затемнение фона при открытом меню */}
          {isRightSidebarOpen && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30"
              onClick={() => setIsRightSidebarOpen(false)}
            />
          )}
        </>
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
