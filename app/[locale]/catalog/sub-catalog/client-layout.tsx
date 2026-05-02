"use client";

import React, { ReactNode, useEffect, useState } from "react";
import classNames from "classnames";

import LSidebar from "../../components/molecules/leftSidebar/leftSidebar";
import RSidebar from "../../components/molecules/rightSidebar/rightSidebar";
import { useIsMobile } from "../../components/hooks/useIsMobile";

import styles from "./Sub-catalog.module.css";

const slideStyle = (open: boolean): React.CSSProperties => ({
  transform: open ? "translateX(0)" : "translateX(-100%)",
  transition: "transform 0.28s cubic-bezier(0.25, 0.1, 0.25, 1)",
});

type Props = {
  children: ReactNode;
  locale: string;
};

export default function ClientLayout({ children, locale }: Props) {
  const isMobile = useIsMobile();

  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflowY =
      isLeftSidebarOpen || isRightSidebarOpen ? "hidden" : "auto";
    return () => { document.body.style.overflowY = "auto"; };
  }, [isLeftSidebarOpen, isRightSidebarOpen]);

  return (
    <div
      className={classNames(
        "flex flex-1 flex-row justify-between self-center mb-5 mx-2",
        styles.subCatalog
      )}
    >
      {/* LEFT SIDEBAR */}
      {isMobile ? (
        <>
          <button
            className={classNames(
              "absolute top-52 left-2 z-30 bg-transparent text-[#0061AA] p-2 rounded-md",
              styles.buttons
            )}
            onClick={() => setIsLeftSidebarOpen(true)}
          >
            ☰ По призначенню
          </button>

          <div
            style={slideStyle(isLeftSidebarOpen)}
            className="fixed top-0 left-0 w-full h-full bg-white/50 backdrop-blur-sm z-50 overflow-y-auto"
          >
            <button
              className="absolute top-7 right-3 text-[30px]"
              onClick={() => setIsLeftSidebarOpen(false)}
            >
              ✕
            </button>
            <div className="p-4">
              <LSidebar locale={locale} changeURLParams />
            </div>
          </div>
        </>
      ) : (
        <div className="w-75 mt-5">
          <LSidebar locale={locale} changeURLParams />
        </div>
      )}

      <div className="w-full mt-5">
        {children}
      </div>

      {/* RIGHT SIDEBAR */}
      {!isMobile && (
        <div className="w-75 mt-5">
          <RSidebar locale={locale} changeURLParams />
        </div>
      )}
    </div>
  );
}
