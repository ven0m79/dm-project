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
  const [isOpen, setIsOpen] = useState(false);

  // Блокировка скролла фона при открытом окне
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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
      {typeof window !== "undefined" && isMobile ? (
        <>
          {/* Кнопка для открытия бокового меню */}
          <button
            className="fixed top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded-md"
            onClick={() => setIsOpen(true)}
          >
            ☰ Меню
          </button>

          {/* Всплывающее меню */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 200 }} // Можно немного потянуть влево
            initial={{ x: "-100%" }} // Начальное состояние (спрятано слева)
            animate={{ x: isOpen ? "0%" : "-100%" }} // Анимация открытия/закрытия
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 w-full h-full bg-white shadow-lg z-50 cursor-grab active:cursor-grabbing overflow-y-auto"
          >
            {/* Кнопка закрытия */}
            <button
              className="absolute top-4 right-4 text-xl text-slate-800"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            {/* Контент внутри окна */}
            <div className="p-4">
              <LSidebar locale={locale} changeURLParams />
            </div>
          </motion.div>

          {/* Затемнение фона при открытом меню */}
          {isOpen && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30"
              onClick={() => setIsOpen(false)}
            />
          )}
        </>
      ) : (
        <div className="w-[300px]">
          <LSidebar locale={locale} changeURLParams />
        </div>
      )}

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
