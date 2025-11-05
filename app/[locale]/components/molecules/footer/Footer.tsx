import { useTranslations } from "next-intl";
import DesktopFooter from "./DesktopFooter";
import MobileFooterWrapper from "./MobileFooterWrapper";
import classNames from "classnames";
import styles from "./Footer.module.css";

export default function Footer() {
  const t = useTranslations("Footer");

  // Server component — нічого клієнтського тут не має бути
  return (
        <footer
      className={classNames(
        "mt-auto flex flex-1 flex-col justify-center items-center w-screen bottom-0",
        styles["footer"],
      )}
    >
      {/* MobileFooterWrapper вирішує, що рендерити */}
      <MobileFooterWrapper t={t} />

    </footer>
  );
}
