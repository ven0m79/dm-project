import classNames from "classnames";
import { Inter } from "next/font/google";
import React, { FC, ReactNode } from "react";

import { Nav, Footer, Header  } from "@app/components/molecules";
import "@app/globals.css";
import "@app/reset.css";

import styles from "./MainLayout.module.css";

type MainLayoutProps = {
  children: ReactNode;
  noHeader?: boolean;
  noNav?: boolean;
  noFooter?: boolean;
};

const inter = Inter({ subsets: ["latin"] });

const MainLayout: FC<MainLayoutProps> = ({
  children,
  noHeader = false,
  noNav = false,
  noFooter = false,
}) => {
  return (
    <main className={classNames(inter.className, styles.main)}>
      {noHeader ? null : <Header />}
      {noNav ? null : <Nav />}
      {children}
      {noFooter ? null : <Footer />}
    </main>
  );
};

export default MainLayout;
