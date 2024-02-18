import React from "react";
import styles from "./Catalog.module.css";

import { MainLayout } from "@app/[locale]/components/templates";
import { unstable_setRequestLocale } from "next-intl/server";
import { Link } from "config";
import Image from 'next/image';
import classNames from "classnames";
import  imgCons  from "./icons-photo/consumables.webp"
import  imgFurniture  from "./icons-photo/furniture-med.webp"
import  imgIntensive  from "./icons-photo/intencive-terapy.webp"
import  imgMedgaz  from "./icons-photo/med-gaz.webp"
import  imgNeonat  from "./icons-photo/neonat.webp"
import  imgOper  from "./icons-photo/oper.webp"
import  imgSteriliz  from "./icons-photo/sterilization.webp"

const CatalogPage = ({params: {locale}}: {params: {locale: string}}) => {
  unstable_setRequestLocale(locale);
  return (
    <MainLayout>
      <div className={classNames ("text-2xl flex flex-wrap justify-center mb-5 w-full px-5", [styles.catalogContainer])}>
            <Link href="#"><div
              className={classNames(
                "flex flex-row items-center rounded-xl",
                styles["block-decisions"],
              )}
            >Обладнання для операційних
            <Image
                  src={imgOper}
                  width={130}
                  height={130}
                  alt="Обладнання для операційних"
                /></div>
            </Link>
            <Link href="#"><div
              className={classNames(
                "flex flex-row justify-center items-center rounded-xl",
                styles["block-decisions"],
              )}
            >Обладнання для відділень інтенсивної терапії
            <Image
                  src={imgIntensive}
                  width={130}
                  height={130}
                  alt="Обладнання для відділень інтенсивної терапії"
                /></div>
            </Link>
            <Link href="#"><div
              className={classNames(
                "flex flex-row justify-center items-center rounded-xl",
                styles["block-decisions"],
              )}
            >Неонатальне обладнання
            <Image
                  src={imgNeonat}
                  width={130}
                  height={130}
                  alt="Неонатальне обладнання"
                /></div>
            </Link>
            <Link href="#"><div
              className={classNames(
                "flex flex-row justify-center items-center rounded-xl",
                styles["block-decisions"],
              )}
            >Стерилізаційне та дезінфекційне обладнання
            <Image
                  src={imgSteriliz}
                  width={130}
                  height={130}
                  alt="Стерилізаційне та дезінфекційне обладнання"
                /></div>
            </Link>
            <Link href="#"><div
              className={classNames(
                "flex flex-row justify-center items-center rounded-xl",
                styles["block-decisions"],
              )}
            >Медичне газопостачання
            <Image
                  src={imgMedgaz}
                  width={130}
                  height={130}
                  alt="Медичне газопостачання"
                /></div>
            </Link>
            <Link href="#"><div
              className={classNames(
                "flex flex-row justify-center items-center rounded-xl",
                styles["block-decisions"],
              )}
            >Медичні меблі
            <Image
                  src={imgFurniture}
                  width={130}
                  height={130}
                  alt="Медичні меблі"
                /></div>
            </Link>
            <Link href="#"><div
              className={classNames(
                "flex flex-row justify-center items-center rounded-xl",
                styles["block-decisions"],
              )}
            >Витратні матеріали та аксесуари
            <Image
                  src={imgCons}
                  width={130}
                  height={130}
                  alt="Витратні матеріали та аксесуари"
                /></div>
            </Link>
          </div>
    </MainLayout>
  );
};

export default CatalogPage;
