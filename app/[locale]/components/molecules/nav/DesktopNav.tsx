import Image from "next/image";
import { useTranslations } from "next-intl";
import classNames from "classnames";
import React, { FC } from "react";
import styles from "./Nav.module.css";
import { Link, usePathname } from "../../../../../i18n/navigation";

const catalogSubLinks = [
    { titleKey: "or-equipment",      link: "/catalog/sub-catalog?category=or-equipment" },
    { titleKey: "icu-equipment",     link: "/catalog/sub-catalog?category=icu-equipment" },
    { titleKey: "neonatal-equipment",link: "/catalog/sub-catalog?category=neonatal-equipment" },
    { titleKey: "candd-equipment",   link: "/catalog/sub-catalog?category=cleaning-and-desinfecting-equipment" },
    { titleKey: "gas-systems",       link: "/catalog/sub-catalog?category=gas-management-systems" },
    { titleKey: "other-equipment",   link: "/catalog/sub-catalog?category=furniture" },
    { titleKey: "mri-equipment",     link: "/catalog/sub-catalog?category=mri-equipment" },
    { titleKey: "accessories",       link: "/catalog/sub-catalog?category=accessories" },
] as const;

const NavLinks: {
    [key: string]: {
        title: string;
        link: string;
    };
} = {
    home: {
        title: "menu-main",
        link: "/",
    },
    about: {
        title: "menu-about-us",
        link: "/about",
    },
    catalog: {
        title: "menu-catalog",
        link: "/catalog",
    },
    services: {
        title: "menu-service",
        link: "/services",
    },
     blog: {
       title: "menu-blog",
       link: "/info",
     },
    projects: {
        title: "menu-projects",
        link: "/projects",
    },
    shares: {
        title: "menu-shares",
        link: "/info/aktsii",
    },
    about_us: {
        title: "menu-contacts",
        link: "/contacts",
    },
};

const DesktopNav: FC<{}> = ({ }) => {
    const pathname = usePathname();
    const t = useTranslations("Menu");
    const tFooter = useTranslations("Footer");
    const t2 = useTranslations("Index");
    return <div className="items-center right-0 flex flex-1 flex-row justify-center mx-0 shrink-0 max-h-12.5">
        <div className="">
            <ul className="flex ms-center">
                {Object.keys(NavLinks).map((el) => (
                    <li
                        key={el}
                        className={classNames(
                            "text-[10px] sm:text-[12px] xl:text-[16px]",
                            styles["link"],
                            {
                                [styles["active"]]:
                                    NavLinks[el].link === "/"
                                        ? pathname === "/"
                                        : pathname.startsWith(NavLinks[el].link),
                            }
                        )}
                    >
                        <Link href={NavLinks[el].link}>{t(NavLinks[el].title)}</Link>
                        {el === "catalog" && (
                            <div className={styles.dropdown}>
                                {catalogSubLinks.map((sub) => (
                                    <Link key={sub.link} href={sub.link} className={styles.dropdownItem}>
                                        {tFooter(sub.titleKey)}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
        <div
            className={classNames(
                "hidden lg:flex justify-center items-center",
                styles["back"]
            )}
        >
            <Image
                src="/drager-side.svg"
                width={90}
                height={36}
                alt="Logo DM Project" />
        </div>
        <div className={classNames(
            "hidden lg:flex text-[10px] sm:text-[12px] xl:text-[16px] text-wrap", styles["backText"])}>{t2("authorized-representative")}</div>
    </div>
}

export default DesktopNav;