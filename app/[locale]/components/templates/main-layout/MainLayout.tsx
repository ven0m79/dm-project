import React, { FC, ReactNode, Suspense } from "react";
import Script from "next/script";

import { Nav, Footer } from "@app/[locale]/components/molecules";
import HeaderWrapper from "@app/[locale]/components/molecules/header/HeaderWrapper";
import "../../../globals.css";

import styles from "./MainLayout.module.css";

type BinotelWidgetVariant = "default" | "services" | "none";

const BINOTEL_WIDGET_HASHES: Record<Exclude<BinotelWidgetVariant, "none">, string> = {
  default: "41zcyas3q551sr3dvq5x",
  services: "iwuxcf4pbms1bjtplqjy",
};

type MainLayoutProps = {
  children: ReactNode;
  noHeader?: boolean;
  noNav?: boolean;
  noFooter?: boolean;
  binotelWidget?: BinotelWidgetVariant;
};

// type Props = {
//   locale: string;
// };

const MainLayout: FC<MainLayoutProps> = ({
  children,
  noHeader = false,
  noNav = false,
  noFooter = false,
  binotelWidget = "default",
}) => {
  const binotelScriptHash =
    binotelWidget === "none" ? null : BINOTEL_WIDGET_HASHES[binotelWidget];

  return (
      <main className={styles.main}>
        {noHeader ? null : <HeaderWrapper />}
        <div className="sm:h-12.5 h-0">
          {noNav ? null : <Nav />}
        </div>
        <div className="flex flex-1 w-full items-center justify-center">
          {children}
        </div>
        <div className="">
          {noFooter ? null : <Footer />}
        </div>
        {binotelScriptHash ? (
          <Script
            id={`binotel-widget-${binotelScriptHash}`}
            src={`https://widgets.binotel.com/getcall/widgets/${binotelScriptHash}.js`}
            strategy="afterInteractive"
          />
        ) : null}
      </main>
  );
};

export default MainLayout;
