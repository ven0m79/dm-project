import Image from "next/image";
import { useTranslations } from "next-intl";
import classNames from "classnames";
import React, { FC } from "react";
import styles from "./Nav.module.css";
import { Link, usePathname } from "../../../../../config";

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
    // decisions: {
    //   title: "menu-decisions",
    //   link: "/decisions",
    // },
    projects: {
        title: "menu-projects",
        link: "/projects",
    },
    shares: {
        title: "menu-shares",
        link: "/shares",
    },
    about_us: {
        title: "menu-contacts",
        link: "/contacts",
    },
};

const DesktopNav: FC<{}> = ({ }) => {
    const pathname = usePathname();
    const t = useTranslations("Menu");
    const t2 = useTranslations("Index");
    return <div className="items-center right-0 flex flex-1 flex-row justify-center mx-0">
        <div className="">
            <ul className="flex ms-center">
                {Object.keys(NavLinks).map((el) => (
                    <li
                        key={el}
                        className={classNames("text-[10px] sm:text-[12px] xl:text-[16px]", styles["link"], {
                            [styles["active"]]: pathname === '/lll' ? pathname === NavLinks[el].link : pathname.includes(NavLinks[el].link),
                        })}
                    >
                        <Link href={NavLinks[el].link}>{t(NavLinks[el].title)}</Link>
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