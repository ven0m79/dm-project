import React, { FC, ReactNode, Suspense } from "react";
import { Nav, Footer } from "../../molecules";
import HeaderWrapper from "../../molecules/header/HeaderWrapper";
import "../../../globals.css";
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
      <main className={styles.main}>
        {noHeader ? null : <HeaderWrapper />}
        <div className="sm:h-12.5 h-0">
          {noNav ? null : <Suspense fallback={null}><Nav /></Suspense>}
        </div>
        <div className="flex flex-1 w-full items-center justify-center">
          {children}
        </div>
        <div className="">
          {noFooter ? null : <Footer />}
        </div>
      </main>
  );
};

export default MainLayout;