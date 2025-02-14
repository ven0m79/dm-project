"use client";
import React, { useState } from "react";
import classNames from "classnames";
import { MainLayout } from "@app/[locale]/components/templates";
import styles from "./About.module.css";
import { useTranslations } from "next-intl";
import Image from "next/image";
import SliderAbout from "../components/molecules/sliderAbout/slider";
import roman from "../../../public/roman.webp";
import vystavka from "../../../public/vystavka.webp";
import { useIsMobile } from "../components/hooks/useIsMobile";

export const ClientPage = ({ params: { locale } }: { params: { locale: string } }) => {
  const t = useTranslations("AboutPage");
  const isMobile = useIsMobile();

  return (
    <MainLayout>
      {typeof window !== "undefined" && isMobile ?
        <div className={classNames("flex flex-1 flex-col w-full", styles.aboutContainer)}>
          <div className={"flex flex-1 flex-row w-full px-1 sm:px-5"}>
            <div>
              <Image
                src={vystavka}
                className="float-left w-full mr-2 mt-2 max-w-[430px]"
                width={640}
                height={480}
                alt={""}
              />
            </div>
            <div className={classNames("flex flex-1 flex-col min-w-[200px] max-w-full text-[10px]", styles.aboutText)}>
              <div className={classNames("ml-2 my-0 mt-2 indent-5 text-justify")}>
                {t("information1")}
              </div>
              <div className={classNames("ml-2 my-0 indent-5 text-justify")}>
                {t("information2")}
              </div>
            </div>
          </div>
          <div>
            <div className={classNames("flex flex-1 flex-row max-w-full", styles.aboutText)}>
              <div className={classNames("flex flex-1 flex-col max-w-full min-w-[200px] text-[10px]", styles.aboutText)}>
                <div className={classNames("mx-2 my-0 lg:my-2 md:my-1 indent-5 text-justify")}>
                  {t("information3")}
                </div>
                <div className={classNames("mx-2 my-0 lg:my-2 md:my-1 indent-5 text-justifyy")}>
                  {t("information4")}
                </div>
              </div>
              <div>
                <Image
                  className="float-right w-full ml-2 mt-2 max-w-[240px]"
                  src={roman}
                  width={384}
                  height={518}
                  alt={""}
                />
              </div>

            </div>
          </div>
          <div>
            <div className={styles.stroke}></div>
            <div className="text-2xl text-blue-900 flex justify-center self-center mb-5">
              {t("implemented")}
            </div>
          </div>
        </div>
        :
        <div className={classNames("flex flex-1 flex-col w-full", styles.aboutContainer)}>
          <div className={"flex flex-1 flex-row w-full px-5"}>
            <div>
              <Image
                src={vystavka}
                className="float-left w-full mr-2 mt-2 max-w-[430px]"
                width={640}
                height={480}
                alt={""}
              />
            </div>
            <div className={classNames("flex flex-1 flex-col max-w-full min-w-[500px] text-[10px] lg:text-[14px] xl:text-[18px]", styles.aboutText)}>
              <div className={classNames("mx-2 my-0 lg:my-2 md:my-1 indent-5 text-justify")}>
                {t("information1")}
              </div>
              <div className={classNames("mx-2 my-0 lg:my-2 md:my-1 indent-5 text-justify")}>
                {t("information2")}
              </div>
              <div className={classNames("mx-2 my-0 lg:my-2 md:my-1 indent-5 text-justify")}>
                {t("information3")}
              </div>
              <div className={classNames("mx-2 my-0 lg:my-2 md:my-1 indent-5 text-justifyy")}>
                {t("information4")}
              </div>
            </div>
            <div>
              <Image
                className="float-right w-full ml-2 mt-2 max-w-[240px]"
                src={roman}
                width={384}
                height={518}
                alt={""}
              />
            </div>
          </div>
          <div>
            <div className={styles.stroke}></div>
            <div className="text-2xl text-blue-900 flex justify-center self-center mb-5">
              {t("implemented")}
            </div>
          </div>
        </div>
      }{
        <div className="">
          <SliderAbout locale={locale} />
        </div>}
    </MainLayout>
  );
};
