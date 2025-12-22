import React, { FC, ReactNode, Suspense } from "react";

import { Nav, Footer } from "@app/[locale]/components/molecules";
import HeaderWrapper from "@app/[locale]/components/molecules/header/HeaderWrapper";
import "@app/[locale]/globals.css";
import "@app/[locale]/reset.css";

import styles from "./MainLayout.module.css";

type MainLayoutProps = {
  children: ReactNode;
  noHeader?: boolean;
  noNav?: boolean;
  noFooter?: boolean;
};

// type Props = {
//   locale: string;
// };

const MainLayout: FC<MainLayoutProps> = ({
  children,
  noHeader = false,
  noNav = false,
  noFooter = false,
}) => {
  return (
    <Suspense fallback="Loading">
      <main className={styles.main}>
        {noHeader ? null : <HeaderWrapper />}
        <div className="h-[50px]">
          {noNav ? null : <Nav />}
        </div>
        <div className="flex flex-1 w-full items-center justify-center">
          {children}
        </div>
        <div className="h-[319px]">
          {noFooter ? null : <Footer />}
        </div>
      </main>
    </Suspense>
  );
};

export default MainLayout;
