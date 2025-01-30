import classNames from "classnames";
import React, { FC } from "react";
import { Link } from "../../../../../config";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { useNavigateTo } from "@app/[locale]/components/hooks/useNavigateTo";
import styles from "./Footer.module.css";

import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";

const MobileFooter: FC<{}> = ({ }) => {
    const t = useTranslations("Footer");

    return (
        <>
            <div className="items-center right-0 flex flex-1 flex-row justify-center mx-2"></div>
            <div className={styles.stroke}></div>
            <div
                className={classNames(
                    "mt-3 mb-3 text-white justify-center items-center",
                    styles["footerContainer"]
                )}
            >
                © {new Date().getFullYear()} {t("all-right")}
            </div>
        </>
    )
}
export default MobileFooter;