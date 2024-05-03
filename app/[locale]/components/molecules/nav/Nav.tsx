"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import classNames from "classnames";
import React from "react";

import styles from "./Nav.module.css";

import { Link, usePathname } from "../../../../../config";

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
    link: "/contacts",
  },
};

const Nav = () => {
  const pathname = usePathname();
  const t = useTranslations("Menu");
  const t2 = useTranslations("Index");

  return (
    <div className={classNames(
      "flex flex-1 w-full justify-center max-h-[50px]",
      styles["colorBlue"])}>
    <nav className={styles["navigation"]}>
      <ul className="flex ms-center">
        {Object.keys(NavLinks).map((el) => (
          <li
            key={el}
            className={classNames("", styles["link"], {
              [styles["active"]]: pathname === '/lll'? pathname === NavLinks[el].link : pathname.includes(NavLinks[el].link),
            })}
          >
            <Link href={NavLinks[el].link}>{t(NavLinks[el].title)}</Link>
          </li>
        ))}
      </ul>
      <div className="items-end right-0 flex flex-1 flex-row w-full justify-end mx-2">
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
        <div className={styles["backText"]}>{t2("authorized-representative")}</div>
      </div>
    </nav>
    </div>
  );
};

export default Nav;
