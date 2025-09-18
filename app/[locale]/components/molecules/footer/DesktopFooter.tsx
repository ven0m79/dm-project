"use client";

import classNames from "classnames";
import React, { FC } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

import { Link } from "../../../../../config";
import { useNavigateTo } from "@app/[locale]/components/hooks/useNavigateTo";
import styles from "./Footer.module.css";

const DesktopFooter: FC = () => {
  const { navigateWithDelay } = useNavigateTo();
  const t = useTranslations("Footer");
  const locale = useLocale(); // "ua" | "en"

  const makeCatalogHref = (category: string) => {
    const suffix = locale === "en" ? "-en" : "";
    return {
      pathname: "/catalog/sub-catalog",
      query: { category: `${category}${suffix}` },
    } as const;
  };

  return (
      <>
        <div className={styles.footerContainer}>
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
                alt="Logo DM Project"
            />

            <div className={styles.socialMedia}>
              <div
                  className={classNames(
                      "flex flex-row justify-center items-center",
                      styles["socialMedia"]
                  )}
              >
                <Link href="https://youtube.com/@draeger?si=cNuSHUm57sHZvnkI" target="_blank">
                  <Image src="/youtube3.png" width={30} height={30} alt="Logo Youtube" />
                </Link>
              </div>
              <div
                  className={classNames(
                      "flex flex-column justify-center items-center",
                      styles["socialMedia"]
                  )}
              >
                <Link href="https://m.facebook.com/dmprojectdrager/" target="_blank">
                  <Image src="/facebook3.png" width={30} height={30} alt="Logo Facebook" />
                </Link>
              </div>
              <div
                  className={classNames(
                      "flex flex-row justify-center items-center",
                      styles["socialMedia"]
                  )}
              >
                <Link
                    href="https://www.instagram.com/dmproject_drager?igsh=MWJuaWRidnJ5dTM2Zg=="
                    target="_blank"
                >
                  <Image src="/instagram_white.webp" width={30} height={30} alt="Logo Instagram" />
                </Link>
              </div>
            </div>
          </div>

          {/* Info column */}
          <div className={classNames("font-bold", styles["column"])}>
            <div className={classNames("font-bold mb-4 text-[20px] ml-10")}>
              {t("information")}
            </div>

            <Link prefetch={false} href="/about">
              <div className="font-normal mt-1 ml-10 hover:text-green-600">
                {t("about-company")}
              </div>
            </Link>

            <Link prefetch={false} href="/services">
              <div className="font-normal mt-1 ml-10 hover:text-green-600">
                {t("service")}
              </div>
            </Link>

            <Link prefetch={false} href="/projects">
              <div className="font-normal mt-1 ml-10 hover:text-green-600">
                {t("projects")}
              </div>
            </Link>

            <Link prefetch={false} href="/shares">
              <div className="font-normal mt-1 ml-10 hover:text-green-600">
                {t("shares")}
              </div>
            </Link>
          </div>

          {/* Catalog column */}
          <div className={classNames("font-bold", styles["column"])}>
            <div className={classNames("font-bold mb-4 text-[20px] ml-5")}>
              {t("catalog")}
            </div>

            <Link prefetch={false} href={makeCatalogHref("or-equipment")}>
              <div className="font-normal mt-1 ml-5 hover:text-green-600">
                {t("or-equipment")}
              </div>
            </Link>

            <Link prefetch={false} href={makeCatalogHref("icu-equipment")}>
              <div className="font-normal mt-1 ml-5 hover:text-green-600">
                {t("icu-equipment")}
              </div>
            </Link>

            <Link prefetch={false} href={makeCatalogHref("neonatal-equipment")}>
              <div className="font-normal mt-1 ml-5 hover:text-green-600">
                {t("neonatal-equipment")}
              </div>
            </Link>

            <Link
                prefetch={false}
                href={makeCatalogHref("cleaning-and-desinfecting-equipment")}
            >
              <div className="font-normal mt-1 ml-5 hover:text-green-600">
                {t("candd-equipment")}
              </div>
            </Link>

            <Link prefetch={false} href={makeCatalogHref("gas-management-systems")}>
              <div className="font-normal mt-1 ml-5 hover:text-green-600">
                {t("gas-systems")}
              </div>
            </Link>

            <Link prefetch={false} href={makeCatalogHref("furniture")}>
              <div className="font-normal mt-1 ml-5 hover:text-green-600">
                {t("other-equipment")}
              </div>
            </Link>

            <Link prefetch={false} href={makeCatalogHref("mri-equipment")}>
              <div className="font-normal mt-1 ml-5 hover:text-green-600">
                {t("mri-equipment")}
              </div>
            </Link>

            <Link prefetch={false} href={makeCatalogHref("accessories")}>
              <div className="font-normal mt-1 ml-5 hover:text-green-600">
                {t("accessories")}
              </div>
            </Link>
          </div>

          {/* Contacts */}
          <div className={classNames("font-bold flex flex-column", styles["column"])}>
            <div>
              <p className={classNames("font-bold mb-4 ml-1 text-[20px]")}>
                {t("contacts")}
              </p>
            </div>

            <div className={classNames("font-bold flex flex-row ml-0", styles["row"])}>
              <div className="font-normal mt-1 w-10">
                <p className="font-normal mt-1">
                  <Image src="/locationFooter.png" width={26} height={26} alt="Location" />
                </p>
                <p className="font-normal mt-5">
                  <Image src="/telephoneFooter.png" width={26} height={26} alt="Telephone" />
                </p>
                <p className="font-normal mt-6">
                  <Image src="/emailFooter.png" width={26} height={26} alt="Email" />
                </p>
              </div>

              <div>
                <div className="font-normal mt-1 ml-1">
                  <Link href="https://share.google/OF6z6AYY01nQkUYRX">{t("adress")}</Link>
                </div>
                <br />
                <div className="font-normal mt-1 ml-1">
                  <a href="tel:+380445201224" className="block hover:none">
                    {t("fax")}
                  </a>
                </div>
                <br />
                <div className="font-normal mt-1 ml-1">
                  <a href="mailto:allinfo@dm-project.com.ua" className="block hover:none">
                    allinfo@dm-project.com.ua
                  </a>
                  <a href="mailto:sales@dm-project.com.ua" className="block hover:none">
                    sales@dm-project.com.ua
                  </a>
                  <a href="mailto:service@dm-project.com.ua" className="block hover:none">
                    service@dm-project.com.ua
                  </a>
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
        </div>
      </>
  );
};

export default DesktopFooter;
