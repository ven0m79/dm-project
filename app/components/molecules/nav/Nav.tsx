import { usePathname } from "next/navigation";
import classNames from "classnames";
import Link from "next/link";
import React from "react";

import styles from "./Nav.module.css";
import { link } from "fs";

const NavLinks: {
  [key: string]: {
    title: string;
    link: string;
  };
} = {
  home: {
    title: "ГОЛОВНА",
    link: "/",
  },
  about: {
    title: "ПРО КОМПАНІЮ",
    link: "/about",
  },
  catalog: {
    title: "КАТАЛОГ",
    link: "/catalog",
  },
  services: {
    title: "СЕРВІС",
    link: "/services",
  },
  decisions: {
    title: "РІШЕННЯ",
    link: "/decisions",
  },
  projects: {
    title: "ПРОЕКТУВАННЯ",
    link: "/projects",
  },
  shares: {
    title: "АКЦІЇ",
    link: "/shares",
  },
  about_us: {
    title: "КОНТАКТИ",
    link: "/about-us",
  },
};  

const Nav = () => {
 const pathname = usePathname();
 //const isActive = true;
  return (
    <nav className={styles["navigation"]}>
      <ul className="flex ms-left ml-5 me-5">
        {Object.keys(NavLinks).map((el) => (
          <li key={el} className={
            classNames('mx-1', styles["link"], {[styles["active"]]: pathname === NavLinks[el].link})}>
            <Link href={NavLinks[el].link}>{NavLinks[el].title}
            </Link>
          </li>
        ))}
      </ul>
      <div className={classNames('flex justify-center items-center ml-14', styles["back"])}>
        <img src="/drager-side.svg" width="90" alt="Logo DM Project"></img>
      </div>
      <div className={styles["back"]}>Уповноважений представник в Україні</div>
    </nav>
  );
};

export default Nav;
