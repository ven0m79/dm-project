import React from "react";
import styles from "./Catalog.module.css";
import { Link } from "../../../i18n/navigation";
import Image from "next/image";
import classNames from "classnames";
import { getTranslations } from "next-intl/server";
import imgCons from "./icons-photo/consumables.webp";
import imgMri from "./icons-photo/mri.webp";
import imgFurniture from "./icons-photo/furniture-med.webp";
import imgIntensive from "./icons-photo/intencive-terapy.webp";
import imgMedgaz from "./icons-photo/med-gaz.webp";
import imgNeonat from "./icons-photo/neonat.webp";
import imgOper from "./icons-photo/oper.webp";
import imgSteriliz from "./icons-photo/sterilization.webp";

type Props = {
  locale: string;
};

export const ClientPage = async ({ locale }: Props) => {
  const t = await getTranslations({ locale, namespace: "Catalog1" });
  const makeHref = (category: string) => {
    const suffix = locale === "en" ? "-en" : "";
    return `/catalog/sub-catalog?category=${category}${suffix}`;
  };

  return (
    <div
      className={classNames(
        "text-2xl flex flex-wrap justify-start mb-5 gap-5 mt-5",
        [styles.catalogContainer],
      )}
    >
      <Link href={makeHref("or-equipment")}>
        <div className={classNames("flex flex-row items-center rounded-xl mx-1", styles["block-decisions"])}>
          <span className={styles.span}>{t("or-equipment")}</span>
          <Image className={styles.img} src={imgOper} width={130} height={130} priority alt={t("or-equipment")} />
        </div>
      </Link>
      <Link href={makeHref("icu-equipment")}>
        <div className={classNames("flex flex-row items-center rounded-xl mx-1", styles["block-decisions"])}>
          <span className={styles.span}>{t("icu-equipment")}</span>
          <Image className={styles.img} src={imgIntensive} width={130} height={130} alt={t("icu-equipment")} />
        </div>
      </Link>
      <Link href={makeHref("neonatal-equipment")}>
        <div className={classNames("flex flex-row items-center rounded-xl mx-1", styles["block-decisions"])}>
          <span className={styles.span}>{t("neonatal-equipment")}</span>
          <Image className={styles.img} src={imgNeonat} width={130} height={130} alt={t("neonatal-equipment")} />
        </div>
      </Link>
      <Link href={makeHref("cleaning-and-desinfecting-equipment")}>
        <div className={classNames("flex flex-row items-center rounded-xl mx-1", styles["block-decisions"])}>
          <span className={styles.span}>{t("candd-equipment")}</span>
          <Image className={styles.img} src={imgSteriliz} width={130} height={130} alt={t("candd-equipment")} />
        </div>
      </Link>
      <Link href={makeHref("gas-management-systems")}>
        <div className={classNames("flex flex-row items-center rounded-xl mx-1", styles["block-decisions"])}>
          <span className={styles.span}>{t("gas-systems")}</span>
          <Image className={styles.img} src={imgMedgaz} width={130} height={130} alt={t("gas-systems")} />
        </div>
      </Link>
      <Link href={makeHref("furniture")}>
        <div className={classNames("flex flex-row items-center rounded-xl mx-1", styles["block-decisions"])}>
          <span className={styles.span}>{t("other-equipment")}</span>
          <Image className={styles.img} src={imgFurniture} width={130} height={130} alt={t("other-equipment")} />
        </div>
      </Link>
      <Link href={makeHref("mri-equipment")}>
        <div className={classNames("flex flex-row items-center rounded-xl mx-1", styles["block-decisions"])}>
          <span className={styles.span}>{t("mrt")}</span>
          <Image className={styles.img} src={imgMri} width={130} height={130} alt={t("mrt")} />
        </div>
      </Link>
      <Link href={makeHref("accessories")}>
        <div className={classNames("flex flex-row items-center rounded-xl mx-1", styles["block-decisions"])}>
          <span className={styles.span}>{t("accessories")}</span>
          <Image className={styles.img} src={imgCons} width={130} height={130} alt={t("accessories")} />
        </div>
      </Link>
    </div>
  );
};

export default ClientPage;
