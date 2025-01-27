"use client";
import React from "react";
import styles from "./Catalog.module.css";

import { MainLayout } from "@app/[locale]/components/templates";

import { Link } from "config";
import Image from "next/image";
import classNames from "classnames";
import imgCons from "./icons-photo/consumables.webp";
import imgFurniture from "./icons-photo/furniture-med.webp";
import imgIntensive from "./icons-photo/intencive-terapy.webp";
import imgMedgaz from "./icons-photo/med-gaz.webp";
import imgNeonat from "./icons-photo/neonat.webp";
import imgOper from "./icons-photo/oper.webp";
import imgSteriliz from "./icons-photo/sterilization.webp";
import { useTranslations } from "next-intl";
import Seo from "@app/[locale]/components/atoms/seo/Seo";
import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";

const CatalogPage = ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const t = useTranslations("Catalog1");

  const isMobile = useIsMobile();

  console.log({ isMobile });

  return (
    <MainLayout>
      <Seo
        title="ДМ-ПРОЕКТ: Продукти"
        description="Сьогодні основними видами діяльності компанії є не тільки продаж медичного обладнання високого класу, а й розробка та впровадження комплексних рішень для медичних закладів, починаючи з проектування і закінчуючи сервісом та навчанням персоналу."
      />
      <div
        className={classNames(
          "text-2xl flex flex-wrap justify-start mb-5 gap-5 mt-5",
          [styles.catalogContainer],
        )}
      >
        <Link
          href={{
            pathname: "/catalog/sub-catalog",
            query: "category=or-equipment",
          }}
        >
          {/* sm:bg-amber-800 in classnames */}
          <div
            className={classNames(
              "flex flex-row items-center rounded-xl",
              styles["block-decisions"],
            )}
          >
            <span className={styles.span}>{t("or-equipment")}</span>
            <Image
              className={styles.img}
              src={imgOper}
              width={130}
              height={130}
              alt={t("or-equipment")}
            />
          </div>
        </Link>
        <Link
          href={{
            pathname: "/catalog/sub-catalog",
            query: "category=icu-equipment",
          }}
        >
          <div
            className={classNames(
              "flex flex-row items-center rounded-xl",
              styles["block-decisions"],
            )}
          >
            <span className={styles.span}>{t("icu-equipment")}</span>
            <Image
              className={styles.img}
              src={imgIntensive}
              width={130}
              height={130}
              alt={t("icu-equipment")}
            />
          </div>
        </Link>
        <Link
          href={{
            pathname: "/catalog/sub-catalog",
            query: "category=neonatal-equipment",
          }}
        >
          <div
            className={classNames(
              "flex flex-row items-center rounded-xl",
              styles["block-decisions"],
            )}
          >
            <span className={styles.span}>{t("neonatal-equipment")}</span>
            <Image
              className={styles.img}
              src={imgNeonat}
              width={130}
              height={130}
              alt={t("neonatal-equipment")}
            />
          </div>
        </Link>
        <Link
          href={{
            pathname: "/catalog/sub-catalog",
            query: "category=cleaning-and-desinfecting-equipment",
          }}
        >
          <div
            className={classNames(
              "flex flex-row items-center rounded-xl",
              styles["block-decisions"],
            )}
          >
            <span className={styles.span}>{t("candd-equipment")}</span>
            <Image
              className={styles.img}
              src={imgSteriliz}
              width={130}
              height={130}
              alt={t("candd-equipment")}
            />
          </div>
        </Link>
        <Link
          href={{
            pathname: "/catalog/sub-catalog",
            query: "category=gas-management-systems",
          }}
        >
          <div
            className={classNames(
              "flex flex-row items-center rounded-xl",
              styles["block-decisions"],
            )}
          >
            <span className={styles.span}>{t("gas-systems")}</span>
            <Image
              className={styles.img}
              src={imgMedgaz}
              width={130}
              height={130}
              alt={t("gas-systems")}
            />
          </div>
        </Link>
        <Link
          href={{
            pathname: "/catalog/sub-catalog",
            query: "category=furniture",
          }}
        >
          <div
            className={classNames(
              "flex flex-row items-center rounded-xl",
              styles["block-decisions"],
            )}
          >
            <span className={styles.span}>{t("other-equipment")}</span>
            <Image
              className={styles.img}
              src={imgFurniture}
              width={130}
              height={130}
              alt={t("other-equipment")}
            />
          </div>
        </Link>
        <Link
          href={{
            pathname: "/catalog/sub-catalog",
            query: "category=accessories",
          }}
        >
          <div
            className={classNames(
              "flex flex-row items-center rounded-xl",
              styles["block-decisions"],
            )}
          >
            <span className={styles.span}>{t("accessories")}</span>
            <Image
              className={styles.img}
              src={imgCons}
              width={130}
              height={130}
              alt={t("accessories")}
            />
          </div>
        </Link>
      </div>
    </MainLayout>
  );
};

export default CatalogPage;
