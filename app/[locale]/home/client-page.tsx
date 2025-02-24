"use client";

import classNames from "classnames";
import React from "react";
import { MainLayout } from "@app/[locale]/components/templates";
import Slider from "@app/[locale]/components/molecules/slider/slider";
import SliderMobile from "../components/molecules/slider/sliderMobile";
import MapOfUkraine from "@app/[locale]/components/molecules/map/Map";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

import styles from "./Home.module.css";
import { useIsMobile } from "../components/hooks/useIsMobile";



export const ClientPage = ({ params: { locale } }: { params: { locale: string } }) => {
  const t = useTranslations("Index");
  const isMobile = useIsMobile();

  return (
    <MainLayout>
      <div>
        <div className="flex flex-1 flex-col justify-center items-center">
          {typeof window !== "undefined" && isMobile ?
            <SliderMobile locale={locale} />
            :
            <Slider locale={locale} />
          }
          <h2
            className={classNames(
              "w-full text-center mb-5 sm:mb-10",
              styles["serviceTextHeader"],
            )}
          >
            {t("in-Ukraine-2009").toUpperCase()}
          </h2>

          <div
            className="flex flex-1 flex-col justify-end items-center self-center sm:flex-row min-w-[300px]"
            style={{ width: "85%", maxWidth: "1400px" }}
          >
            <div className={"text-2xl text-blue-800"}>
              <div className={classNames("font-bold", styles["textHeader"])}>
                {" "}
                {t("delivered").toUpperCase()}
              </div>
              <div className="flex flex-1 flex-row items-center self-center">
                <div className="self-start" style={{ width: "50px" }}>
                  <Image
                    alt="Галочка"
                    width={25}
                    height={25}
                    src={"/galka.png"}
                  />
                </div>
                <div className={classNames("", styles["putText"])}>
                  {" "}
                  {t("more-then")}
                </div>
              </div>
              <div className="flex flex-1 flex-row">
                <div className="self-start align-top" style={{ width: "50px" }}>
                  <Image
                    alt="Галочка"
                    width={25}
                    height={25}
                    src={"/galka.png"}
                  />
                </div>

                <div className={classNames("", styles["putText"])}>
                  {" "}
                  {t("more-then2")}
                </div>
              </div>
              <div className={classNames("font-bold mt-4", styles["textHeader"])}>
                {" "}
                {t("integrated").toUpperCase()}
              </div>
              <div className={classNames("", styles["putText"])}>
                {t("integrated1")}
                <br />
                {t("integrated2")}
                <br />
                {t("integrated3")}
                <br />
                {t("integrated4")}
              </div>
            </div>
            <div className="flex justify-center items-center w-full">
              <div className="min-w-[320px] w-full h-auto flex justify-center">
                <MapOfUkraine locale={locale} />
              </div>
            </div>
          </div>
        </div>

        <div
          className={classNames(
            "font-bold flex flex-1 flex-col text-slate-900 justify-center items-center m-auto py-7",
            styles["serviceTextHeader"],
          )}
          style={{ width: "100%", maxWidth: "1400px" }}
        >
          {" "}
          <div className={styles.stroke}></div>
          <br />
          <br />
          {/*Сервіс та Проєктування*/}
          <div className="flex flex-col" style={{ width: "100%", maxWidth: "1400px" }}>
            <div
              className={classNames(
                "flex flex-1 flex-col font-bold pl-2",
                styles["textHeader"],
              )}
            >
              {t("service")}
            </div>
            <div className="flex flex-1 flex-row ">
              <Link href={"/services"}>
                <div
                  className={classNames(
                    "sm:p-5 p-2 indent-5 text-justify",
                    styles["serviceText"],
                  )}
                >
                  {t("service-text")}
                </div>
              </Link>
              <div className="pr-2">
                <Link href={"/services"}>
                  <Image
                    src="/service.jpg"
                    alt={"Сервіс"}
                    width={isMobile ? 150 : 250}
                    height={isMobile ? 150 : 250}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col self-end" style={{ maxWidth: "1050px", width: "100%" }}>
            <div
              className={classNames(
                "self-end mt-10 sm:mr-5 mr-2",
                styles["serviceTextHeader"],
              )}
            >
              {t("projectings")}
            </div>
            <div className="flex flex-1 flex-row">
              <div className="pr-2">
                <Link href={"/projects"}>
                  <Image
                    src="/projection.jpg"
                    alt={"Проектування"}
                    width={isMobile ? 150 : 250}
                    height={isMobile ? 150 : 250}
                  />
                </Link>
              </div>
              <div className="">
                <Link href={"/projects"}>
                  <div
                    className={classNames(
                      "p-2 text-justify  mt-10 sm:mr-5 mr-2",
                      styles["serviceText"],
                    )}
                  >
                    <span className="text-[#0061AA] mr-[10px]">•</span>{t("projectings1")}
                    <br />
                    <span className="text-[#0061AA] mr-[10px]">•</span>{t("projectings2")}
                    <br />
                    <span className="text-[#0061AA] mr-[10px]">•</span>{t("projectings3")}
                    <br />
                    <span className="text-[#0061AA] mr-[10px]">•</span>{t("projectings4")}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <br />

        <div className="flex flex-1 flex-col justify-center items-center">
          <div
            className={classNames(
              "font-bold justify-center items-center valign-middle sm:mt-10 mt-0",
              styles["textHeader"],
            )}
          >
            {t("partners").toUpperCase()}
          </div>
          <div className="flex flex-wrap justify-center items-center bg-white w-[90%] max-w-[1000px] gap-1 sm:gap-10">
            {[
              { href: "https://www.draeger.com", src: "/logo-partners/dreger-log-partner.jpg", alt: "Logo DM-Project" },
              { href: "https://www.prohs.pt/en/home/", src: "/logo-partners/prohs-log-partner.png", alt: "Logo Prohs" },
              { href: "https://www.at-os.com", src: "/logo-partners/atos-log-partner.jpg", alt: "Logo AT-OS" },
              { href: "https://www.lojer.com", src: "/logo-partners/lojer-log-partner.jpg", alt: "Logo Lojer" },
              { href: "http://renosem.com", src: "/logo-partners/renosem-log-partner.jpg", alt: "Logo Renosem" }
            ].map(({ href, src, alt }, index) => (
              <div key={index} className="flex-1 min-w-[60px] max-w-[120px] sm:max-w-[200px]">
                <Link href={href} target="_blank">
                  <Image
                    className="w-full h-auto"
                    src={src}
                    width={200}
                    height={200}
                    alt={alt}
                  />
                </Link>
              </div>
            ))}
          </div>


        </div>
      </div>
    </MainLayout>
  );
};
