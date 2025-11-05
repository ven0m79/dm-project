import classNames from "classnames";
import React, { FC } from "react";
import { Link } from "../../../../../config";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { useNavigateTo } from "@app/[locale]/components/hooks/useNavigateTo";
import styles from "./Footer.module.css";

import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";

const MobileFooter: FC<{ t: any }> = ({ t }) => {
    
    return (
        <>
            <div className="items-center bottom-0 flex flex-1 flex-row justify-around max-h-[100px] mx-2 w-screen">
                <Link
                    href={"/catalog"}
                    className="flex flex-col items-center">
                    <Image
                        src="/go-products-footer.webp"
                        width={35}
                        height={35}
                        alt="Каталогу продуктів"
                    /> <span className="mt-2 text-sm">{t("productsMob")}</span>
                </Link>
                <Link
                    href={"/"}
                    className="flex flex-col items-center"
                    onClick={(e) => {
                        e.preventDefault();
                        window.dispatchEvent(new Event("focusSearch"));
                    }}>
                    <Image
                        src="/search-footer.webp"
                        width={35}
                        height={35}
                        alt="Пошук"
                    /> <span className="mt-2 text-sm">{t("searchMob")}</span>
                </Link>
                <Link
                    href={"/contacts"}
                    className="flex flex-col items-center">
                    <Image
                        src="/contacts-footer.webp"
                        width={35}
                        height={35}
                        alt="Контакти"
                    /> <span className="mt-2 text-sm">{t("contactsMob")}</span>
                </Link>
            </div>
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