import classNames from "classnames";
import React, { FC } from "react";
import { Link } from "../../../../../i18n/navigation";
import Image from "next/image";
import styles from "./Footer.module.css";

const MobileFooter: FC<{ t: (key: string) => string }> = ({ t }) => {
    
    return (
        <>
            <div className="items-center bottom-0 flex flex-row justify-around w-full text-white">
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
                className={"flex mt-3 mb-3 text-white justify-center items-center self-center"}
            >
                © {new Date().getFullYear()} {t("all-right")}
            </div>
        </>
    )
}
export default MobileFooter;