import React from "react";
import styles from "./Catalog.module.css";

import { MainLayout } from "@app/[locale]/components/templates";
import { unstable_setRequestLocale } from "next-intl/server";
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

const CatalogPage = ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);

  return (
    <MainLayout>
      <div
        className={classNames(
          "text-2xl flex flex-wrap justify-center mb-5 px-5 gap-5 mt-5",
          [styles.catalogContainer],
        )}
      >
        <Link
          href={{
            pathname: "/catalog/sub-catalog",
            // ось тут треба конфігурувати параметр, який буде значенням для відкриття порібного бару
            // він бає бути унікальним для всіх категорій
            query: "category=operations",
          }}
        >
          <div
            className={classNames(
              "flex flex-row items-center rounded-xl",
              styles["block-decisions"],
            )}
          >
            <span className={styles.span}>Обладнання для операційних</span>
            <Image
              className={styles.img}
              src={imgOper}
              width={130}
              height={130}
              alt="Обладнання для операційних"
            />
          </div>
        </Link>
        <Link
          href={{
            pathname: "/catalog/sub-catalog",
            query: "category=intensive-therapy",
          }}
        >
          <div
            className={classNames(
              "flex flex-row items-center rounded-xl",
              styles["block-decisions"],
            )}
          >
            <span className={styles.span}>
              Обладнання для відділень інтенсивної терапії
            </span>
            <Image
              className={styles.img}
              src={imgIntensive}
              width={130}
              height={130}
              alt="Обладнання для відділень інтенсивної терапії"
            />
          </div>
        </Link>
        <Link
          href={{
            pathname: "/catalog/sub-catalog",
            query: "category=neonathal",
          }}
        >
          <div
            className={classNames(
              "flex flex-row items-center rounded-xl",
              styles["block-decisions"],
            )}
          >
            <span className={styles.span}>Неонатальне обладнання</span>
            <Image
              className={styles.img}
              src={imgNeonat}
              width={130}
              height={130}
              alt="Неонатальне обладнання"
            />
          </div>
        </Link>
        <Link
          href={{
            pathname: "/catalog/sub-catalog",
            query: "category=sterilization",
          }}
        >
          <div
            className={classNames(
              "flex flex-row items-center rounded-xl",
              styles["block-decisions"],
            )}
          >
            <span className={styles.span}>
              Стерилізаційне та дезінфекційне обладнання
            </span>
            <Image
              className={styles.img}
              src={imgSteriliz}
              width={130}
              height={130}
              alt="Стерилізаційне та дезінфекційне обладнання"
            />
          </div>
        </Link>
        <Link
          href={{
            pathname: "/catalog/sub-catalog",
            query: "category=gaz",
          }}
        >
          <div
            className={classNames(
              "flex flex-row items-center rounded-xl",
              styles["block-decisions"],
            )}
          >
            <span className={styles.span}>Медичне газопостачання</span>
            <Image
              className={styles.img}
              src={imgMedgaz}
              width={130}
              height={130}
              alt="Медичне газопостачання"
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
            <span className={styles.span}>Медичні меблі</span>
            <Image
              className={styles.img}
              src={imgFurniture}
              width={130}
              height={130}
              alt="Медичні меблі"
            />
          </div>
        </Link>
        <Link
          href={{
            pathname: "/catalog/sub-catalog",
            query: "category=accessories&per_page=100",
          }}
        >
          <div
            className={classNames(
              "flex flex-row items-center rounded-xl",
              styles["block-decisions"],
            )}
          >
            <span className={styles.span}>Витратні матеріали та аксесуари</span>
            <Image
              className={styles.img}
              src={imgCons}
              width={130}
              height={130}
              alt="Витратні матеріали та аксесуари"
            />
          </div>
        </Link>
      </div>
    </MainLayout>
  );
};

export default CatalogPage;
