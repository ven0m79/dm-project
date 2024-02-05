"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import classNames from "classnames";
import React from "react";

import styles from "./Nav.module.css";

import { Link, usePathname } from "../../../../../config";
import { unstable_setRequestLocale } from "next-intl/server";

const NavLinks: {
  [key: string]: {
    title: string;
    link: string;
  };
} = {
  home: {
    title: "menu-main",
    link: "/",
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
  decisions: {
    title: "menu-decisions",
    link: "/decisions",
  },
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
    link: "/about-us",
  },
};

const Nav = ({params: {locale}}:any) => {
  unstable_setRequestLocale(locale);
  const pathname = usePathname();
  const t = useTranslations("Menu");
  const t2 = useTranslations("Index");

  return (
    <nav className={styles["navigation"]}>
      <ul className="flex ms-left ml-5 me-5">
        {Object.keys(NavLinks).map((el) => (
          <li
            key={el}
            className={classNames("mx-1", styles["link"], {
              [styles["active"]]: pathname === NavLinks[el].link,
            })}
          >
            <Link href={NavLinks[el].link}>{t(NavLinks[el].title)}</Link>
          </li>
        ))}
      </ul>
      <div className="items-end right-0 flex flex-1 flex-row w-full justify-end">
        <div
          className={classNames(
            "flex justify-center items-center",
            styles["back"],
          )}
        >
          <Image
            src="/drager-side.svg"
            width={90}
            height={36}
            alt="Logo DM Project"
          />
        </div>
        <div className={styles["back"]}>{t2("authorized-representative")}</div>
      </div>
    </nav>
  );
};

export default Nav;
