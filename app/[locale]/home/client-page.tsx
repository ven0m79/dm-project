"use client";

import classNames from "classnames";
import React from "react";
import { MainLayout } from "@app/[locale]/components/templates";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "./Home.module.css";
import { useIsMobile } from "../components/hooks/useIsMobile";
import dynamic from "next/dynamic";
import CaruselBrands from "@app/[locale]/components/atoms/carusel-brands/carusel-brands";

// Динамічні імпорти без SSR
const Slider = dynamic(
  () => import("@app/[locale]/components/molecules/slider/slider"),
  {
    ssr: false,
    loading: () => <div style={{ width: "100%", height: "400px" }} />, // резервуємо місце
  },
);
const SliderMobile = dynamic(
  () => import("@app/[locale]/components/molecules/slider/sliderMobile"),
  {
    ssr: false,
    loading: () => <div style={{ width: "100%", height: "200px" }} />,
  },
);
const MapOfUkraine = dynamic(
  () => import("@app/[locale]/components/molecules/map/Map"),
  { ssr: false },
);
const MapOfUkraineMobile = dynamic(
  () => import("@app/[locale]/components/molecules/map/Map"),
  { ssr: false },
);

export const ClientPage = ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const t = useTranslations("Index");
  const isMobile = useIsMobile();

  // Використовуємо hydration лише для умовного рендеру (уникнення помилок на сервері)
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => setHydrated(true), []);

  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center">
        {/* --- SLIDER --- */}
        {hydrated ? (
          isMobile ? (
            <SliderMobile locale={locale} />
          ) : (
            <Slider locale={locale} />
          )
        ) : (
          <div
            style={{ width: "100%", height: isMobile ? "200px" : "400px" }}
          />
        )}

        {/* --- HEADER --- */}
        <h2
          className={classNames(
            "w-full text-center mb-5 sm:mb-10",
            styles["serviceTextHeader"],
          )}
        >
          {t("in-Ukraine-2009").toUpperCase()}
        </h2>

        {/* --- MAP + TEXT --- */}
        <div
          className="flex flex-1 flex-col justify-end items-center self-center sm:flex-row min-w-75"
          style={{ width: "85%", maxWidth: "1400px" }}
        >
          {/* Ліва колонка з текстом */}
          <div className="text-2xl text-blue-800">
            <div className={classNames("font-bold", styles["textHeader"])}>
              {t("delivered").toUpperCase()}
            </div>

            <div className="flex flex-row items-center self-center">
              <Image
                alt=""
                src="/galka.png"
                width={25}
                height={25}
                style={{ width: "25px", height: "25px" }}
              />
              <div className={styles["putText"]}>{t("more-then")}</div>
            </div>

            <div className="flex flex-row">
              <Image
                alt=""
                src="/galka.png"
                width={25}
                height={25}
                style={{ width: "25px", height: "25px" }}
              />
              <div className={styles["putText"]}>{t("more-then2")}</div>
            </div>

            <div className={classNames("font-bold mt-4", styles["textHeader"])}>
              {t("integrated").toUpperCase()}
            </div>
            <div className={styles["putText"]}>
              {t("integrated1")} <br />
              {t("integrated2")} <br />
              {t("integrated3")} <br />
              {t("integrated4")}
            </div>
          </div>

          {/* Карта України */}
          <div className="flex justify-center items-center w-full">
            <div
              className="min-w-[320px] w-full flex justify-center"
              style={{ height: isMobile ? "250px" : "400px" }}
            >
              {isMobile ? (
                <MapOfUkraineMobile locale={locale} />
              ) : (
                <MapOfUkraine locale={locale} />
              )}
            </div>
          </div>
        </div>

        {/* --- СЕРВІС --- */}
        <div
          className={classNames(
            "font-bold flex flex-col text-slate-900 justify-center items-center m-auto py-7",
            styles["serviceTextHeader"],
          )}
          style={{ width: "100%", maxWidth: "1400px" }}
        >
          <div className={styles.stroke}></div>
          <br />
          <br />

          {/* Сервіс */}
          <div
            className="flex flex-col"
            style={{ width: "100%", maxWidth: "1400px" }}
          >
            <div
              className={classNames(
                "flex flex-col font-bold pl-2",
                styles["textHeader"],
              )}
            >
              {t("service")}
            </div>
            <div className="flex flex-row">
              <Link href="/services">
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
                <Link href="/services">
                  <Image
                    src="/service.jpg"
                    alt="Сервіс"
                    width={isMobile ? 150 : 250}
                    height={isMobile ? 150 : 250}
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Проєктування */}
          <div
            className="flex flex-col self-end"
            style={{ maxWidth: "1050px", width: "100%" }}
          >
            <div
              className={classNames(
                "self-end mt-10 sm:mr-5 mr-2",
                styles["serviceTextHeader"],
              )}
            >
              {t("projectings")}
            </div>
            <div className="flex flex-row">
              <div className="p-2">
                <Link href="/projects">
                  <Image
                    src="/projection.jpg"
                    alt="Проектування"
                    width={isMobile ? 150 : 250}
                    height={isMobile ? 150 : 250}
                  />
                </Link>
              </div>
              <div>
                <Link href="/projects">
                  <div
                    className={classNames(
                      "pr-2 text-justify sm:mr-5 mr-0",
                      styles["serviceText"],
                    )}
                  >
                    <span className="text-[#0061AA] mr-2.5">•</span>
                    {t("projectings1")}
                    <br />
                    <span className="text-[#0061AA] mr-2.5">•</span>
                    {t("projectings2")}
                    <br />
                    <span className="text-[#0061AA] mr-2.5">•</span>
                    {t("projectings3")}
                    <br />
                    <span className="text-[#0061AA] mr-2.5">•</span>
                    {t("projectings4")}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* --- ПАРТНЕРИ --- */}
        <div className="flex flex-col justify-center items-center">
          <div
            className={classNames(
              "font-bold justify-center items-center valign-middle sm:mt-10 mt-0",
              styles["textHeader"],
            )}
          >
            {t("partners").toUpperCase()}
          </div>

          {/* Логотипи партнерів */}
          <div className="flex my-5 flex-wrap justify-center items-center bg-white w-[90%] max-w-250 gap-3 sm:gap-10">
            <CaruselBrands />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
