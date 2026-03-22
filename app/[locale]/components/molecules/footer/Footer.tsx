'use client';

import { useTranslations } from "next-intl";
import classNames from "classnames";

import MobileFooter from "./MobileFooter";
import DesktopFooter from "./DesktopFooter";
import styles from "./Footer.module.css";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer
      className={classNames(
        "mt-auto flex flex-1 flex-col justify-center items-center w-screen bottom-0",
        styles.footer,
      )}
    >
      <div className="w-full sm:hidden">
        <MobileFooter t={t} />
      </div>
      <div className="hidden w-full sm:block">
        <DesktopFooter t={t} />
      </div>
    </footer>
  );
}
