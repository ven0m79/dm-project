import React from "react";
import classNames from "classnames";
import { MainLayout } from "@app/[locale]/components/templates";
import styles from "./About.module.css";
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from "config";
import Image from 'next/image';


const AboutPage = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
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
            "flex flex-1 flex-row justify-center items-start",
          )}
        >
          <div
            className={classNames(
              "flex justify-center items-start rounded-xl w-30 m-5",
              styles["aboutMainPhoto"],
            )}
          />
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
            <div className={classNames("my-2 m indent-5 text-justify")}>
              {t('information5')}
            </div>
          </div>
        </div>
        <div
          className={classNames(
            "flex flex-1 flex-col justify-between items-center",
            styles["aboutDecisions"],
          )}
        >
          <div className="text-2xl text-blue-900 flex justify-between mb-5">
            Реалізовані проєкти
          </div>
          <div className="text-2xl flex flex-row justify-between mb-5 w-full px-5">
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
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
