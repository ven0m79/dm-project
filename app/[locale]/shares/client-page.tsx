"use client";
import React from "react";
import styles from "./Shares.module.css";

import { MainLayout } from "@app/[locale]/components/templates";

import { Link } from "config";
import Image from "next/image";
import classNames from "classnames";

import linea from "./linea/linea-trans.webp";
import polaris from "./polaris200/polaris200-trans.webp";
import polaris2 from "./polaris200-2/polaris200-2-trans.webp";
import fabiusplusxl from "./fabiusplusxl/Fabius_plus_XL-trans.webp";
import atlan from "./atlan300/atlan300-trans.webp";
import awd655_h2_v1 from "./AWD655-2H-V1/awd655-2h-v1-trans.webp";
import awd655_h2_v2 from "./AWD655-2H-V2/awd655-2h-v2-trans.webp";
import { useTranslations } from "next-intl";
import { useIsMobile } from "../components/hooks/useIsMobile";



export const ClientPage = () => {
  const t = useTranslations('Shares');

  const isMobile = useIsMobile();
  console.log({ isMobile });

  return (
    <MainLayout>
      <div
        className={classNames(
          "flex flex-wrap mb-5 gap-5 mt-5",
          [styles.catalogContainerMain],
        )}
      >
        <Link
          href={{
            pathname: "/shares/linea",
          }}
        >
          <div
            className={classNames(
              "flex flex-row items-center rounded-xl justify-between h-full",
              styles["block-decisions"],
            )}
          >
            <div className="flex flex-col w-4/5 h-full pl-10 justify-center">
              <div className="">
                <span className={classNames("text-black", styles.span)}>{t("shares-title-main")}</span>
              </div>
              <div>
                <span className={classNames("text-[#0d3d61] font-bold text-base sm:text-2xl", styles.span)}>{t("shares-title1")}</span>
              </div>
            </div>
            <div className="flex w-1/5 h-full items-center justify-center mr-1">
              <Image
                className={classNames("h-full w-auto object-contain", styles.img)}
                src={linea}
                width={140}
                height={140}
                alt="logo"
              />
            </div>
          </div>
        </Link>

        <Link
          href={{
            pathname: "/shares/polaris200",
          }}
        >
          <div
            className={classNames(
              "flex flex-row items-center rounded-xl justify-between",
              styles["block-decisions"],
            )}
          >
            <div className="flex flex-col w-4/5 h-full pl-10 justify-center">
            <div className="">
                <span className={classNames("text-black", styles.span)}>{t("shares-title-main")}</span>
              </div>
              <div>
                <span className={classNames("text-[#0d3d61] font-bold text-base sm:text-2xl", styles.span)}>{t("shares-title2")}</span>
              </div>
            </div>
            <div className="flex w-1/5 h-full items-center justify-center mr-1">
              <Image
                className={classNames("h-full w-auto object-contain", styles.img)}
                src={polaris}
                width={140}
                height={140}
                alt="logo"
              />
            </div>
          </div>
        </Link>

        <Link
          href={{
            pathname: "/shares/polaris200-2",
          }}
        >
          <div
            className={classNames(
              "flex flex-row items-center rounded-xl justify-between",
              styles["block-decisions"],
            )}
          >
            <div className="flex flex-col w-4/5 h-full pl-10 justify-center">
            <div className="">
                <span className={classNames("text-black", styles.span)}>{t("shares-title-main")}</span>
              </div>
              <div>
                <span className={classNames("text-[#0d3d61] font-bold text-base sm:text-2xl", styles.span)}>{t("shares-title3")}</span>
              </div>
            </div>
            <div className="flex w-1/5 h-full items-center justify-center mr-1">
              <Image
                className={classNames("h-full w-auto object-contain", styles.img)}
                src={polaris2}
                width={140}
                height={140}
                alt="logo"
              />
            </div>
          </div>
        </Link>

        <Link
          href={{
            pathname: "/shares/fabiusplusxl",
          }}
        >
          <div
            className={classNames(
              "flex flex-row items-center rounded-xl justify-between",
              styles["block-decisions"],
            )}
          >
            <div className="flex flex-col w-4/5 h-full pl-10 justify-center">
            <div className="">
                <span className={classNames("text-black", styles.span)}>{t("shares-title-main")}</span>
              </div>
              <div>
                <span className={classNames("text-[#0d3d61] font-bold text-base sm:text-2xl", styles.span)}>{t("shares-title4")}</span>
              </div>
            </div>
            <div className="flex w-1/5 h-full items-center justify-center mr-1">
              <Image
                className={classNames("h-full w-auto object-contain", styles.img)}
                src={fabiusplusxl}
                width={140}
                height={140}
                alt="logo"
              />
            </div>
          </div>
        </Link>

        <Link
          href={{
            pathname: "/shares/atlan300",
          }}
        >
          <div
            className={classNames(
              "flex flex-row items-center rounded-xl justify-between",
              styles["block-decisions"],
            )}
          >
            <div className="flex flex-col w-4/5 h-full pl-10 justify-center">
            <div className="">
                <span className={classNames("text-black", styles.span)}>{t("shares-title-main")}</span>
              </div>
              <div>
                <span className={classNames("text-[#0d3d61] font-bold text-base sm:text-2xl", styles.span)}>{t("shares-title5")}</span>
              </div>
            </div>
            <div className="flex w-1/5 h-full items-center justify-center mr-1">
              <Image
                className={classNames("h-full w-auto object-contain", styles.img)}
                src={atlan}
                width={140}
                height={140}
                alt="logo"
              />
            </div>
          </div>
        </Link>
        {/* <Link
          href={{
            pathname: "/shares/AWD655-2H-V1",
          }}
        >
          <div
            className={classNames(
              "flex flex-row items-center rounded-xl justify-between",
              styles["block-decisions"],
            )}
          >
            <div className="flex flex-col w-4/5 h-full pl-10 justify-center">
            <div className="">
                <span className={classNames("text-black", styles.span)}>{t("shares-title-main")}</span>
              </div>
              <div>
                <span className={classNames("text-[#0d3d61] font-bold text-base sm:text-2xl", styles.span)}>{t("shares-title6")}</span>
              </div>
            </div>
            <div className="flex w-1/5 h-full items-center justify-center mr-1">
              <Image
                className={classNames("h-full w-auto object-contain", styles.img)}
                src={awd655_h2_v1}
                width={140}
                height={140}
                alt="logo"
              />
            </div>
          </div>
        </Link> */}
        <Link
          href={{
            pathname: "/shares/AWD655-2H-V2",
          }}
        >
          <div
            className={classNames(
              "flex flex-row items-center rounded-xl justify-between",
              styles["block-decisions"],
            )}
          >
            <div className="flex flex-col w-4/5 h-full pl-10 justify-center">
            <div className="">
                <span className={classNames("text-black", styles.span)}>{t("shares-title-main")}</span>
              </div>
              <div>
                <span className={classNames("text-[#0d3d61] font-bold text-base sm:text-2xl", styles.span)}>{t("shares-title7")}</span>
              </div>
            </div>
            <div className="flex w-1/5 h-full items-center justify-center mr-1">
              <Image
                className={classNames("h-full w-auto object-contain", styles.img)}
                src={awd655_h2_v2}
                width={140}
                height={140}
                alt="logo"
              />
            </div>
          </div>
        </Link>

      </div>
    </MainLayout>
  );
};