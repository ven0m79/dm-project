"use client";

import React, { ReactNode, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { motion, Transition } from "framer-motion";
import { useSearchParams } from "next/navigation";

import LSidebar from "@app/[locale]/components/molecules/leftSidebar/leftSidebar";
import RSidebar from "@app/[locale]/components/molecules/rightSidebar/rightSidebar";
import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";
import { getCategoriesIds } from "@app/[locale]/components/constants";

import styles from "./Sub-catalog.module.css";

const flipTransition: Transition = {
  type: "spring",
  stiffness: 250,
  damping: 28,
};

type Props = {
  children: ReactNode;
  locale: string;
};

export default function ClientLayout({ children, locale }: Props) {
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();

  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const currentIdsData = useMemo(
    () => getCategoriesIds(locale),
    [locale]
  );

  const categoryFromUrl = searchParams?.get("category") ?? "";

  useEffect(() => {
    document.body.style.overflowY =
      isLeftSidebarOpen || isRightSidebarOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflowY = "auto";
    };
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

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: isLeftSidebarOpen ? "0%" : "-100%" }}
            transition={flipTransition}
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
          </motion.div>
        </>
      ) : (
        <div className="w-75 mt-5">
          <LSidebar locale={locale} changeURLParams />
        </div>
      )}

      <div className="w-full mt-5">{children}</div>

      {/* RIGHT SIDEBAR */}
      {!isMobile && (
        <div className="w-75 mt-5">
          <RSidebar locale={locale} changeURLParams />
        </div>
      )}
    </div>
  );
}
