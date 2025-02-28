import classNames from "classnames";
import React from "react";
import { Link } from "../../../../../config";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { useNavigateTo } from "@app/[locale]/components/hooks/useNavigateTo";
import styles from "./Footer.module.css";

import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";
import MobileFooter from "./MobileFooter";
import DesktopFooter from "./DesktopFooter";


const Footer = () => {
  const { navigateWithDelay } = useNavigateTo();

  const t = useTranslations("Footer");
  const isMobile = useIsMobile();
  console.log({ isMobile });

  return (
    <footer
      className={classNames(
        "mt-auto flex flex-1 flex-col justify-center items-center w-screen max-h-[154px]",
        styles["footer"],
      )}
    >
      {typeof window !== "undefined" && isMobile ?
        <MobileFooter />
        :
        <DesktopFooter />
      }
    </footer>

  );
};

export default Footer;
