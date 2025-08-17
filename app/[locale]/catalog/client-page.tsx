"use client";

import React from "react";
import styles from "./Catalog.module.css";
import { MainLayout } from "@app/[locale]/components/templates";
import { Link } from "config";
import Image from "next/image";
import classNames from "classnames";
import imgCons from "./icons-photo/consumables.webp";
import imgMri from "./icons-photo/mri.webp";
import imgFurniture from "./icons-photo/furniture-med.webp";
import imgIntensive from "./icons-photo/intencive-terapy.webp";
import imgMedgaz from "./icons-photo/med-gaz.webp";
import imgNeonat from "./icons-photo/neonat.webp";
import imgOper from "./icons-photo/oper.webp";
import imgSteriliz from "./icons-photo/sterilization.webp";
import { useTranslations } from "next-intl";
import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";
import { useRouter } from "next/navigation"; // ✅ новий імпорт

export const ClientPage = () => {
  const t = useTranslations("Catalog1");
  const isMobile = useIsMobile();
  console.log({ isMobile });
  const router = useRouter(); // ✅ тут працює

  return (
    <MainLayout>
      <div
        className={classNames(
          "text-2xl flex flex-wrap justify-start mb-5 gap-5 mt-5",
          [styles.catalogContainer],
        )}
      >
        <Link
          href="/catalog/sub-catalog?category=or-equipment"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/catalog/sub-catalog?category=or-equipment`;
          }}
        >
          <div className={classNames("flex flex-row items-center rounded-xl mx-1", styles["block-decisions"])}>
            <span className={styles.span}>{t("or-equipment")}</span>
            <Image className={styles.img} src={imgOper} width={130} height={130} alt={t("or-equipment")} />
          </div>
        </Link>
        <Link
          href="/catalog/sub-catalog?category=icu-equipment"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/catalog/sub-catalog?category=icu-equipment`;
          }}
        >
          <div className={classNames("flex flex-row items-center rounded-xl mx-1", styles["block-decisions"])}>
            <span className={styles.span}>{t("icu-equipment")}</span>
            <Image className={styles.img} src={imgIntensive} width={130} height={130} alt={t("icu-equipment")} />
          </div>
        </Link>
        <Link
          href="/catalog/sub-catalog?category=neonatal-equipment"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/catalog/sub-catalog?category=neonatal-equipment`;
          }}
        >
          <div className={classNames("flex flex-row items-center rounded-xl mx-1", styles["block-decisions"])}>
            <span className={styles.span}>{t("neonatal-equipment")}</span>
            <Image className={styles.img} src={imgNeonat} width={130} height={130} alt={t("neonatal-equipment")} />
          </div>
        </Link>
        <Link
          href="/catalog/sub-catalog?category=cleaning-and-desinfecting-equipment"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/catalog/sub-catalog?category=cleaning-and-desinfecting-equipment`;
          }}
        >
          <div className={classNames("flex flex-row items-center rounded-xl mx-1", styles["block-decisions"])}>
            <span className={styles.span}>{t("candd-equipment")}</span>
            <Image className={styles.img} src={imgSteriliz} width={130} height={130} alt={t("candd-equipment")} />
          </div>
        </Link>
        <Link
          href="/catalog/sub-catalog?category=category=gas-management-systems"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/catalog/sub-catalog?category=gas-management-systems`;
          }}
        >
          <div className={classNames("flex flex-row items-center rounded-xl mx-1", styles["block-decisions"])}>
            <span className={styles.span}>{t("gas-systems")}</span>
            <Image className={styles.img} src={imgMedgaz} width={130} height={130} alt={t("gas-systems")} />
          </div>
        </Link>
        <Link
          href="/catalog/sub-catalog?category=furniture"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/catalog/sub-catalog?category=furniture`;
          }}
        >
          <div className={classNames("flex flex-row items-center rounded-xl mx-1", styles["block-decisions"])}>
            <span className={styles.span}>{t("other-equipment")}</span>
            <Image className={styles.img} src={imgFurniture} width={130} height={130} alt={t("other-equipment")} />
          </div>
        </Link>
        <Link
          href="/catalog/sub-catalog?category=mri-equipment"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/catalog/sub-catalog?category=mri-equipment`;
          }}
        >
          <div className={classNames("flex flex-row items-center rounded-xl mx-1", styles["block-decisions"])}>
            <span className={styles.span}>{t("mrt")}</span>
            <Image className={styles.img} src={imgMri} width={130} height={130} alt={t("mrt")} />
          </div>
        </Link>
        <Link
          href="/catalog/sub-catalog?category=accessories"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/catalog/sub-catalog?category=accessories`;
          }}>
          <div className={classNames("flex flex-row items-center rounded-xl mx-1", styles["block-decisions"])}>
            <span className={styles.span}>{t("accessories")}</span>
            <Image className={styles.img} src={imgCons} width={130} height={130} alt={t("accessories")} />
          </div>
        </Link>
      </div>
    </MainLayout>
  );
};

export default ClientPage;