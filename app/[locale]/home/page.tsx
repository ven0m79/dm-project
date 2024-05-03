"use client";

import classNames from "classnames";
import React from "react";
import { MainLayout } from "@app/[locale]/components/templates";
import Slider from "@app/[locale]/components/molecules/slider/slider";
import MapOfUkraine from "@app/[locale]/components/molecules/map/Map";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

import styles from "./Home.module.css";
const HomePage = () => {
  const t = useTranslations("Index");

  return (
    <MainLayout>
      {/* <div className="text-2xl text-blue-900 flex justify-center items-center valign-middle">{t('title')}</div> */}
      <div>
        <div className="flex flex-1 flex-col justify-center items-center">
          <Slider />

          <h2
            className={classNames(
              "justify-center items-center valign-middle mb-10",
              styles["serviceTextHeader"],
            )}
          >
            {t("in-Ukraine-2009").toUpperCase()}
          </h2>

          <div
            className="flex flex-1 flex-row justify-end items-center self-center"
            style={{ width: "85%", maxWidth: "1400px" }}
          >
            <div className={"text-2xl text-blue-800"}>
              <div className={classNames("font-bold", styles["textHeader"])}>
                {" "}
                {t("delivered").toUpperCase()}
              </div>
              <br />
              <div className="flex flex-1 flex-row items-center self-center">
                <div className="self-start" style={{ width: "50px" }}>
                  <Image
                    alt="Галочка"
                    width={25}
                    height={25}
                    src={"/galka.png"}
                  />
                </div>
                <div className={classNames("font-bold", styles["putText"])}>
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

                <div className={classNames("font-bold", styles["putText"])}>
                  {" "}
                  {t("more-then2")}
                </div>
              </div>
              <br />
              <div className={classNames("font-bold", styles["textHeader"])}>
                {" "}
                {t("integrated").toUpperCase()}
              </div>
              <br />
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
            <div>
              <MapOfUkraine />
            </div>
          </div>
        </div>

        <div
          className={classNames(
            "font-bold flex flex-1 flex-col text-slate-900 justify-center items-center m-auto p-10",
            styles["serviceTextHeader"],
          )}
          style={{ width: "1400px" }}
        >
          {" "}
          {/*Сервіс та Проєктування*/}
          <div className="flex flex-col self-start" style={{ width: "900px" }}>
            <div
              className={classNames(
                "flex flex-1 flex-col font-bold indent-5",
                styles["textHeader"],
              )}
            >
              {t("service")}
            </div>
            <div className="flex flex-1 flex-row text-slate-200">
              <Link href={"/services"}>
                <div
                  className={classNames(
                    "p-5 indent-5 text-justify",
                    styles["serviceText"],
                  )}
                >
                  {t("service-text")}
                </div>
              </Link>
              <div>
                <Link href={"/services"}>
                  <Image
                    src="/service.jpg"
                    alt={"Сервіс"}
                    width={250}
                    height={250}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col self-end" style={{ width: "1034px" }}>
            <div
              className={classNames(
                "font-bold self-end mt-10",
                styles["textHeader"],
              )}
            >
              {t("projectings")}
            </div>
            <div className="flex flex-1 flex-row text-slate-200">
              <div>
                <Link href={"/projects"}>
                  <Image
                    src="/projection.jpg"
                    alt={"Проектування"}
                    width={250}
                    height={250}
                  />
                </Link>
              </div>
              <Link href={"/projects"}>
                <div
                  className={classNames(
                    "p-5 text-left text-blue-200",
                    styles["serviceText"],
                  )}
                >
                  {t("projectings1")}
                  <br />
                  {t("projectings2")}
                  <br />
                  {t("projectings3")}
                  <br />
                  {t("projectings4")}
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center items-center">
          <div
            className={classNames(
              "font-bold justify-center items-center valign-middle mt-10",
              styles["textHeader"],
            )}
          >
            {t("partners").toUpperCase()}
          </div>
          <div className="flex flex-1 flex-row justify-center items-center valign-middle bg-white">
            <div className={classNames("m-10", styles["block-partners"])}>
              <Link href="https://www.draeger.com">
                <Image
                  className={styles.img}
                  src="/logo-partners/dreger-log-partner.jpg"
                  width={150}
                  height={150}
                  alt="Logo DM-Project"
                />
              </Link>
            </div>
            <div className={classNames("m-10", styles["block-partners"])}>
              <Link href="https://www.prohs.pt/en/home/">
                <Image
                  className={styles.img}
                  src="/logo-partners/prohs-log-partner.png"
                  width={150}
                  height={150}
                  alt="Logo Prohs"
                />
              </Link>
            </div>
            <div className={classNames("m-10", styles["block-partners"])}>
              <Link href="https://www.at-os.com">
                <Image
                  className={styles.img}
                  src="/logo-partners/atos-log-partner.jpg"
                  width={150}
                  height={150}
                  alt="Logo AT-OS"
                />
              </Link>
            </div>
            <div className={classNames("m-10", styles["block-partners"])}>
              <Link href="https://www.lojer.com">
                <Image
                  className={styles.img}
                  src="/logo-partners/lojer-log-partner.jpg"
                  width={150}
                  height={150}
                  alt="Logo Lojer"
                />
              </Link>
            </div>
            <div className={classNames("m-10", styles["block-partners"])}>
              <Link href="http://renosem.com">
                <Image
                  className={styles.img}
                  src="/logo-partners/renosem-log-partner.jpg"
                  width={150}
                  height={150}
                  alt="Logo Renosem"
                />
              </Link>
            </div>
          </div>
          {/* <div
            className={classNames(
              "justify-center items-center valign-middle mb-10",
              styles["serviceTextHeader"],
            )}
          >
            ДМ-Проект допомагає зберігати життя українців!
          </div> */}
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
