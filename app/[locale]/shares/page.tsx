import React from "react";
import styles from "./Shares.module.css";

import { MainLayout } from "@app/[locale]/components/templates";
import { unstable_setRequestLocale } from "next-intl/server";
import { Link } from "config";
import Image from "next/image";
import classNames from "classnames";

import logo from "./shares-photo/DM-project-logo-transparent.png";
import linea from "./linea/linea-trans.webp";

const Shares = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  return (
    <MainLayout><div
      className={classNames(
        "flex flex-wrap justify-start mb-5 gap-5 mt-5",
        [styles.catalogContainer],
      )}
    >
      <Link
        href={{
          pathname: "/shares/linea",
        }}
      >
        <div
          className={classNames(
            "flex flex-row items-center rounded-xl justify-between",
            styles["block-decisions"],
          )}
        ><div className="flex w-[200px] h-[150px] bg-[#0d3d61] items-center justify-center rounded-l-lg rounded-r-none">
            <Image
              className={styles.img}
              src={logo}
              width={100}
              height={100}
              alt="logo"
            />
          </div>
          <div className="flex flex-col w-[350px] h-[150px] pl-5 mt-5">
            <div className="mb-3">
              <span className={classNames("text-black", styles.span)}>Акційна комерційна пропозиція</span>
            </div>
            <div>
              <span className={classNames("text-[#0d3d61] font-bold text-2xl", styles.span)}>Панель Linea</span>
            </div>
          </div>
          <div className="flex w-[150px] h-[150px] items-center justify-end mr-1">
            <Image
              className={styles.img}
              src={linea}
              width={225}
              height={150}
              alt="logo"
            />
          </div>
        </div>
      </Link>
      
      <Link
        href={{
          pathname: "/shares/linea",
        }}
      >
        <div
          className={classNames(
            "flex flex-row items-center rounded-xl justify-between",
            styles["block-decisions"],
          )}
        ><div className="flex w-[200px] h-[150px] bg-[#0d3d61] items-center justify-center rounded-l-lg rounded-r-none">
            <Image
              className={styles.img}
              src={logo}
              width={100}
              height={100}
              alt="logo"
            />
          </div>
          <div className="flex flex-col w-[350px] h-[150px] pl-5 mt-5">
            <div className="mb-3">
              <span className={classNames("text-black", styles.span)}>Акційна комерційна пропозиція</span>
            </div>
            <div>
              <span className={classNames("text-[#0d3d61] font-bold text-2xl", styles.span)}>Панель Linea</span>
            </div>
          </div>
          <div className="flex w-[150px] h-[150px] items-center justify-end mr-1">
            <Image
              className={styles.img}
              src={linea}
              width={225}
              height={150}
              alt="logo"
            />
          </div>
        </div>
      </Link>

    </div>
    </MainLayout>
  );
};

export default Shares;
