import React from "react";
import styles from "./../Shares.module.css";

import { MainLayout } from "@app/[locale]/components/templates";
import { unstable_setRequestLocale } from "next-intl/server";
import { Link } from "config";
import Image from "next/image";
import classNames from "classnames";


const SharesLinea = ({ params: { locale } }: { params: { locale: string } }) => {
    unstable_setRequestLocale(locale);
    return (
        <MainLayout>
            <div
                className={classNames(
                    "text-2xl flex flex-wrap justify-start mb-5 gap-5 mt-5 text-slate-950",
                    [styles.catalogContainer],
                )}
            >
                <span className={styles.span}>Панель Linea</span>
                <p>ТОВ «ДМ-ПРОЕКТ», уповноважений представник Drägerwerk AG & Co. KGaA (Німеччина) в Україні, пропонує до поставки наступне медичне обладнання для стоматології:</p>
            </div>
        </MainLayout>
    );
};

export default SharesLinea;
