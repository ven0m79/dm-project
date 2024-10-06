"use client"
import React from "react";
import classNames from "classnames";
import { MainLayout } from "@app/[locale]/components/templates";
import styles from "./About.module.css";
import { useTranslations } from 'next-intl';
import { Link } from "config";
import Image from 'next/image';
import SliderAbout from "../components/molecules/sliderAbout/slider";
import roman from "../../../public/roman.webp";
import vystavka from "../../../public/vystavka.webp";


const AboutPage = ({ params: { locale } }: { params: { locale: string } }) => {
  //unstable_setRequestLocale(locale);
  const t = useTranslations('AboutPage');
  return (
    <MainLayout>
      <div
        className={classNames(
          "flex flex-1 flex-col justify-center items-start",
          styles["aboutContainer"],
        )}
      >
        <div
          className={classNames(
            "flex flex-1 flex-row justify-center items-start w-[1400px]",
          )}
        >
          <Image
            src={vystavka}
            className="p-5 float-left"
            width={550}
            height={750}
            alt={""}>
          </Image>

          <div
            className={classNames(
              "flex flex-column justify-center items-start my-3",
              styles["aboutText"],
            )}
          >
            <div className={classNames("my-2 indent-5 text-justify")}>
              {t('information1')}
            </div>
            <div className={classNames("my-2 indent-5 text-justify")}>
              {t('information2')}
            </div>
            <div className={classNames("my-2 m indent-5 text-justify")}>
              {t('information3')}
            </div>
            <div className={classNames("my-2 m indent-5 text-justify")}>
              {t('information4')}
            </div>


          </div>
          <Image
            className="p-5 float-right"
            src={roman}
            width={330}
            height={480}
            alt={""}>
          </Image>
        </div>
        <div className={classNames("my-2 m indent-5 text-justify", styles["aboutText"])}>
          {t('information5')}
        </div>

        <div
          className={classNames(
            "flex flex-1 flex-col items-start",
            styles["aboutDecisions"],
          )}
        >
          <div className={styles.stroke}></div>
          <div className="text-2xl text-blue-900 flex justify-center self-center mb-5">
            {t('implemented')}
          </div>
          <div className="flex flex-row justify-between items-start self-start h-[650px] w-[850px]">
            <div>
              <SliderAbout locale={locale} />
            </div>
            <div>
              <div className={classNames("px-5 indent-5 text-justify w-[548x]", styles["aboutText1"])}>
                <p>{t('information1')}</p><br />
                <p>{t('information1')}</p><br />
                <p>{t('information1')}</p><br />
                <p>{t('information1')}</p><br />
                <p>{t('information1')}</p><br />
              </div>
            </div>
          </div>


          {/* <div className="text-2xl flex flex-row justify-between mb-5 w-full px-5">
            <Link href="/about/ohmatdet"><div
              className={classNames(
                "flex flex-col justify-center items-center rounded-xl",
                styles["block-decisions"],
              )}
            ><span className={styles.span}>НДСЛ “Охматдит”</span>
              <Image
                className={styles.img}
                src="/decisions/ohmatdet.jpg"
                width={220}
                height={130}
                alt="НДСЛ “Охматдит"
              /></div>
            </Link>
            <Link href="/about/feofania"><div
              className={classNames(
                "flex flex-col justify-center items-center rounded-xl",
                styles["block-decisions"],
              )}
            ><span className={styles.span}>Лікарня “Феофанія”</span>
              <Image
                className={styles.img}
                src="/decisions/feofania.jpg"
                width={220}
                height={130}
                alt="Лікарня “Феофанія"
              /></div>
            </Link>
            <Link href="/about/kardiovinnitsa"><div
              className={classNames(
                "flex flex-col justify-center items-center rounded-xl",
                styles["block-decisions"],
              )}
            ><span className={styles.span}>Вінницький Кардіоцентр</span>
              <Image
                className={styles.img}
                src="/decisions/kardioVinnitsa.jpg"
                width={220}
                height={130}
                alt="Вінницький Кардіоцентр"
              /></div>
            </Link>
          </div> */}
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
