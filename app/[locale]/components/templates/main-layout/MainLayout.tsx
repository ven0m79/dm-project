import classNames from "classnames";
import React, { FC, ReactNode, Suspense } from "react";

import { Nav, Footer, Header } from "@app/[locale]/components/molecules";
import "@app/[locale]/globals.css";
import "@app/[locale]/reset.css";

import styles from "./MainLayout.module.css";

type MainLayoutProps = {
  children: ReactNode;
  noHeader?: boolean;
  noNav?: boolean;
  noFooter?: boolean;
};

type Props = {
  locale: string;
}


const MainLayout: FC<MainLayoutProps> = ({
  children,
  noHeader = false,
  noNav = false,
  noFooter = false,
}) => {
  return (
    <main className={(styles.main)}>
      <Suspense fallback="Loading">
        {noHeader ? null : <Header />}
      </Suspense>
      {noNav ? null : <Nav />}
      {children}
      {noFooter ? null : <Footer />}
    </main>
  );
};

export default MainLayout;
