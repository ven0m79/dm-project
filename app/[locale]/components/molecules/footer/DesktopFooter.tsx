
import classNames from "classnames";
import React, { FC } from "react";
import { Link } from "../../../../../config";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { useNavigateTo } from "@app/[locale]/components/hooks/useNavigateTo";
import styles from "./Footer.module.css";


const DesktopFooter: FC<{}> = ({ }) => {
    const { navigateWithDelay } = useNavigateTo();
    const t = useTranslations("Footer");
    

    return (
        <><div className={styles.footerContainer}>
            <div
                className={classNames(
                    "flex flex-column justify-top items-center",
                    styles["column"]
                )}
            >
                <Image
                    src="/DM-project-logo-transparent.png"
                    width={186}
                    height={117}
                    alt="Logo DM Project" />
                <div className={styles.socialMedia}>
                    <div
                        className={classNames(
                            "flex flex-row justify-center items-center",
                            styles["socialMedia"]
                        )}
                    >
                        <Link href="https://youtube.com/@draeger?si=cNuSHUm57sHZvnkI">
                            <Image
                                src="/youtube3.png"
                                width={30}
                                height={30}
                                alt="Logo Youtube" />
                        </Link>
                    </div>
                    <div
                        className={classNames(
                            "flex flex-column justify-center items-center",
                            styles["socialMedia"]
                        )}
                    >
                        <Link href="https://m.facebook.com/dmprojectdrager/">
                            <Image
                                src="/facebook3.png"
                                width={30}
                                height={30}
                                alt="Logo Facebook" />
                        </Link>
                    </div>
                    <div
                        className={classNames(
                            "flex flex-row justify-center items-center",
                            styles["socialMedia"]
                        )}
                    >
                        <Link href="https://www.instagram.com/dmproject_drager?igsh=MWJuaWRidnJ5dTM2Zg==">
                            <Image
                                src="/instagram_white.webp"
                                width={30}
                                height={30}
                                alt="Logo Instagram" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className={classNames("font-bold", styles["column"])}>
                <div className={classNames("font-bold mb-4 text-[20px] ml-10")}>
                    {" "}
                    {t("information")}
                </div>
                <Link href="/about">
                    <div
                        className={classNames(
                            "font-normal mt-1 ml-10 hover:text-green-600"
                        )}
                    >
                        {t("about-company")}
                    </div>
                </Link>
                <Link href="/services">
                    <div
                        className={classNames(
                            "font-normal mt-1 ml-10 hover:text-green-600"
                        )}
                    >
                        {t("service")}
                    </div>
                </Link>
                {/* <Link href="/decisions"><div className={classNames('font-normal mt-1 ml-16 hover:text-green-600')}>{t('decisions')}</div></Link> */}
                <Link href="/projects">
                    <div
                        className={classNames(
                            "font-normal mt-1 ml-10 hover:text-green-600"
                        )}
                    >
                        {t("projects")}
                    </div>
                </Link>
                <Link href="/shares">
                    <div
                        className={classNames(
                            "font-normal mt-1 ml-10 hover:text-green-600"
                        )}
                    >
                        {t("shares")}
                    </div>
                </Link>
            </div>

            <div className={classNames("font-bold", styles["column"])}>
                <div className={classNames("font-bold mb-4 text-[20px] ml-5")}>
                    {t("catalog")}
                </div>
                <Link
                    href="/catalog/sub-catalog?category=or-equipment"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/catalog/sub-catalog?category=or-equipment`;
                      }}
                >
                    <div
                        className={classNames(
                            "font-normal mt-1 ml-5 hover:text-green-600"
                        )}
                    >
                        {t("or-equipment")}
                    </div>
                </Link>

                <Link
                    href="/catalog/sub-catalog?category=icu-equipment"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/catalog/sub-catalog?category=icu-equipment`;
                      }}
                >
                    <div
                        className={classNames(
                            "font-normal mt-1 ml-5 hover:text-green-600"
                        )}
                    >
                        {t("icu-equipment")}
                    </div>
                </Link>
                <Link
                    href="/catalog/sub-catalog?category=neonatal-equipment"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/catalog/sub-catalog?category=neonatal-equipment`;
                      }}
                >
                    <div
                        className={classNames(
                            "font-normal mt-1 ml-5 hover:text-green-600"
                        )}
                    >
                        {t("neonatal-equipment")}
                    </div>
                </Link>
                {/* додати функцію */}
                <Link
                    href="/catalog/sub-catalog?category=cleaning-and-desinfecting-equipment"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/catalog/sub-catalog?category=cleaning-and-desinfecting-equipment`;
                      }}
                >
                    <div
                        className={classNames(
                            "font-normal mt-1 ml-5 hover:text-green-600"
                        )}
                    >
                        {t("candd-equipment")}
                    </div>
                </Link>
                <Link
                    href="/catalog/sub-catalog?category=category=gas-management-systems"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/catalog/sub-catalog?category=gas-management-systems`;
                      }}
                >
                    <div
                        className={classNames(
                            "font-normal mt-1 ml-5 hover:text-green-600"
                        )}
                    >
                        {t("gas-systems")}
                    </div>
                </Link>
                <Link
                    href="/catalog/sub-catalog?category=furniture"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/catalog/sub-catalog?category=furniture`;
                      }}
                >
                    <div
                        className={classNames(
                            "font-normal mt-1 ml-5 hover:text-green-600"
                        )}
                    >
                        {t("other-equipment")}
                    </div>
                </Link>
                <Link
                    href="/catalog/sub-catalog?category=mri-equipment"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/catalog/sub-catalog?category=mri-equipment`;
                      }}
                >
                    <div
                        className={classNames(
                            "font-normal mt-1 ml-5 hover:text-green-600"
                        )}
                    >
                        {t("mri-equipment")}
                    </div>
                </Link>
                <Link
                    href="/catalog/sub-catalog?category=accessories"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/catalog/sub-catalog?category=accessories`;
                      }}
                >
                    <div
                        className={classNames(
                            "font-normal mt-1 ml-5 hover:text-green-600"
                        )}
                    >
                        {t("accessories")}
                    </div>
                </Link>
            </div>
            <div
                className={classNames("font-bold flex flex-column", styles["column"])}
            >
                <div>
                    <p className={classNames("font-bold mb-4 ml-1 text-[20px]")}>
                        {t("contacts")}
                    </p>
                </div>
                <div
                    className={classNames(
                        "font-bold flex flex-row ml-0",
                        styles["row"]
                    )}
                >
                    <div className={classNames("font-normal mt-1 w-10")}>
                        <p className={classNames("font-normal mt-1")}>
                            <Image
                                src="/locationFooter.png"
                                width={26}
                                height={26}
                                alt="Logo DM Project" />
                        </p>
                        <p className={classNames("font-normal mt-5")}>
                            <Image
                                src="/telephoneFooter.png"
                                width={26}
                                height={26}
                                alt="Logo DM Project" />
                        </p>
                        <p className={classNames("font-normal mt-6")}>
                            <Image
                                src="/emailFooter.png"
                                width={26}
                                height={26}
                                alt="Logo DM Project" />
                        </p>
                    </div>
                    <div>
                        <div className={classNames("font-normal mt-1 ml-1")}>
                            {t("adress")}
                        </div>
                        <br />
                        <div className={classNames("font-normal mt-1 ml-1")}>
                            <a href="tel:+380445201224" className="block hover:none">{t("fax")}</a>
                        </div>
                        <br />
                        <div className={classNames("font-normal mt-1 ml-1")}>
                            <a href="mailto:allinfo@dm-project.com.ua" className="block hover:none">allinfo@dm-project.com.ua</a>
                            <a href="mailto:sales@dm-project.com.ua" className="block hover:none">sales@dm-project.com.ua</a>
                            <a href="mailto:service@dm-project.com.ua" className="block hover:none">service@dm-project.com.ua</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div className={styles.stroke}></div>
            <div
                className={classNames(
                    "mt-3 mb-3 text-white justify-center items-center",
                    styles["footerContainer"]
                )}
            >
                © {new Date().getFullYear()} {t("all-right")}
            </div></>
    )
}
export default DesktopFooter;