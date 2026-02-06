'use client';

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";
import MobileFooter from "./MobileFooter";
import DesktopFooter from "./DesktopFooter";
import classNames from "classnames";
import styles from "./Footer.module.css";

export default function Footer() {
  const t = useTranslations("Footer");
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <footer
      className={classNames(
        "mt-auto flex flex-1 flex-col justify-center items-center w-screen bottom-0",
        styles["footer"],
      )}
    >
      {/* MobileFooterWrapper вирішує, що рендерити */}
      {isMobile ? <MobileFooter t={t} /> : <DesktopFooter t={t} />}
    </footer>
  );

}
