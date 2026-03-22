"use client";
import classNames from "classnames";
import React from "react";
import styles from "./Nav.module.css";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Nav = () => {

  return (
    <>
      <nav className={classNames("sm:hidden max-h-[0px]", styles["navigation"])}>
        <MobileNav />
      </nav>
      <nav className={classNames("hidden sm:flex flex-1 w-screen justify-center h-[50px]", styles["navigation"])}>
        <DesktopNav />
      </nav>
    </>
  );
};

export default Nav;
