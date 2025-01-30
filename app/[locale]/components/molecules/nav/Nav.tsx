"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import classNames from "classnames";
import React from "react";

import styles from "./Nav.module.css";

import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";

import { Link, usePathname } from "../../../../../config";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const NavLinks: {
  [key: string]: {
    title: string;
    link: string;
  };
} = {
  home: {
    title: "menu-main",
    link: "/home",
  },
  about: {
    title: "menu-about-us",
    link: "/about",
  },
  catalog: {
    title: "menu-catalog",
    link: "/catalog",
  },
  services: {
    title: "menu-service",
    link: "/services",
  },
  // decisions: {
  //   title: "menu-decisions",
  //   link: "/decisions",
  // },
  projects: {
    title: "menu-projects",
    link: "/projects",
  },
  shares: {
    title: "menu-shares",
    link: "/shares",
  },
  about_us: {
    title: "menu-contacts",
    link: "/contacts",
  },
};

const Nav = () => {
  const pathname = usePathname();
  const t = useTranslations("Menu");
  const t2 = useTranslations("Index");

  const isMobile = useIsMobile();
  console.log({ isMobile });

  return (
    <nav className={classNames("flex flex-1 w-screen justify-center max-h-[50px]", styles["navigation"])}>
      {typeof window !== "undefined" && isMobile ? 
        <MobileNav />
        :
        <DesktopNav />
      }
    </nav >
  );
};

export default Nav;
