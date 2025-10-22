"use client";
import React from "react";
import styles from "./../Shares.module.css";
import { MainLayout } from "@app/[locale]/components/templates";
import Image from "next/image";
import classNames from "classnames";
import atlan300_1 from "./atlan300_1.webp";
import atlan300_2 from "./atlan300_2.webp";
import { useTranslations } from "next-intl";

const SharesAtlan = () => {
  const t = useTranslations("Shares");
  return (
    <MainLayout>
      <div
        className={classNames(
          "w-full flex flex-wrap justify-center mb-3 mt-3",
        )}
      >
        <div
          className={classNames(
            "flex flex-col justify-center mb-5 w-full",
            [styles.catalogContainerDeeper],)}>
          <h3 className="text-justify text-[18px] font-bold sm:text-[20px]">{t("shares-atlan300-title")}</h3>
          <p className="text-justify">{t("shares-atlan300-pehead")}{" "}<span className="font-bold">51 700,00 у.о.</span></p>
          <p><span className="font-bold">{t("shares-atlan300-pehead1")}</span></p>
          <div className="flex flex-col w-full lg:flex-row">
            <div className="lg:w-1/2 w-full  flex flax-wrap justify-center my-2">
              <Image
                className={"w-auto h-full"}
                src={atlan300_1}
                width={390}
                height={533}
                alt="Atlan300"
              />
            </div>
            <div className="lg:w-1/2 w-full pl-0 lg:pl-10">
              -{" "}
              <span className="font-bold">
                {t("shares-atlan300-specific1")}
              </span>
              <br />- {t("shares-atlan300-specific2")}
              <br />- {t("shares-atlan300-specific3")}
              <br />- {t("shares-atlan300-specific4")}
              <br />- {t("shares-atlan300-specific5")}
              <br />- {t("shares-atlan300-specific6")}
              <br />- {t("shares-atlan300-specific7")}
              <br />- {t("shares-atlan300-specific8")}
              <br />- {t("shares-atlan300-specific9")}
              <br />- {t("shares-atlan300-specific10")}
              <br />- {t("shares-atlan300-specific11")}
              <br />- {t("shares-atlan300-specific12")}
              <br />- {t("shares-atlan300-specific13")}
              <br />- {t("shares-atlan300-specific14")}
              <br />- {t("shares-atlan300-specific15")}
              <br />- {t("shares-atlan300-specific16")}
              <br />- {t("shares-atlan300-specific17")}
              <br />- {t("shares-atlan300-specific18")}
              <br />- {t("shares-atlan300-specific19")}
              <br />- {t("shares-atlan300-specific20")}
              <br />- {t("shares-atlan300-specific21")}
              <br />- {t("shares-atlan300-specific22")}
              <br />
              <br />-{" "}
              <span className="font-bold">{t("shares-vista120-specific1")}</span>
              <br />- {t("shares-vista120-specific1")}
              <br />- {t("shares-vista120-specific2")}
              <br />- {t("shares-vista120-specific3")}
              <br />- {t("shares-vista120-specific4")}
              <br />- {t("shares-vista120-specific5")}
              <br />- {t("shares-vista120-specific6")}
              <br />- {t("shares-vista120-specific7")}
              <br />- {t("shares-vista120-specific8")}
              <br />- {t("shares-vista120-specific9")}
              <br />- {t("shares-vista120-specific10")}
              <br />- {t("shares-vista120-specific11")}
              <br />
            </div>
          </div>
        </div>
        <div
          className={classNames(
            "self-center m-3 indent-5 text-justify",
            styles["catalogContainer"],
          )}
        >
          <p className="my-2">{t("shares-atlan300-text1")}</p>
          <p className="my-2">{t("shares-atlan300-text2")}</p>
          <Image
            className={"w-1/2 float-right mt-1 mb-3 mx-3"}
            src={atlan300_2}
            width={500}
            height={100}
            alt="Atlan300"
          />
          <p className="my-2">{t("shares-atlan300-text3")}</p>
          <p className="my-2">{t("shares-atlan300-text4")}</p>
          <p className="my-2">{t("shares-atlan300-text5")}</p>
          <p className="my-2">{t("shares-atlan300-text6")}</p>
          <p className="my-2 font-bold">{t("shares-atlan300-text7")}</p>
          <p className="my-2">{t("shares-atlan300-text8")}</p>
          <p className="my-2 font-bold">{t("shares-atlan300-text9")}</p>
          <p className="my-2">{t("shares-atlan300-text10")}</p>
          <p className="my-2 font-bold">{t("shares-atlan300-text11")}</p>
          <p className="my-2">{t("shares-atlan300-text12")}</p>
          <p className="my-2">{t("shares-atlan300-text13")}</p>
          <p className="my-2">{t("shares-atlan300-text14")}</p>
          <p className="my-2">{t("shares-atlan300-text15")}</p>
        </div>
      </div>
    </MainLayout >
  );
};

export default SharesAtlan;
