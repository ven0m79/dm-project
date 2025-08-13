"use client";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import classNames from "classnames";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Nav.module.css";
import { Link, usePathname } from "../../../../../config";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

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

const MobileNav: FC<{}> = ({ }) => {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations("Menu");
    const searchParams = useSearchParams();
    const pathname = usePathname();


    const selectedCategory = useMemo(() => {
        return searchParams?.get("category")
            ? `?category=${searchParams?.get("category")}`
            : "";
    }, [searchParams]);

    const currentLocale = useLocale();
    const otherLocales = [
        { code: "ua", label: "UA" },
        { code: "en", label: "EN" },
    ].filter(({ code }) => code !== currentLocale);

    return (

        <div className="">
            <motion.button
                className="absolute top-10 right-5 h-10 w-10 rounded-xl bg-[#0061AA]/100 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                title="Гамбургер основного меню">
                <motion.span
                    style={{
                        left: "50%",
                        top: "30%",
                        x: "-50%",
                        y: "-50%",
                    }}
                    className="absolute h-1 w-6 bg-white rounded-md"
                >
                </motion.span>
                <motion.span
                    style={{
                        left: "50%",
                        top: "50%",
                        x: "-50%",
                        y: "-50%",
                    }}
                    className="absolute h-1 w-6 bg-white rounded-md"
                >
                </motion.span>
                <motion.span
                    style={{
                        left: "50%",
                        top: "70%",
                        x: "-50%",
                        y: "-50%",
                    }}
                    className="absolute h-1 w-6 bg-white rounded-md"
                >
                </motion.span>
            </motion.button>


            <motion.div
                initial={{ x: "100%", opacity: 0 }} // Начальное состояние (спрятано)
                animate={isOpen ? { x: "0%", opacity: 1 } : { x: "100%", opacity: 0 }} // Анимация появления и скрытия
                transition={{ type: "tween", duration: 0.5 }} // Плавная анимация
                className="fixed top-0 right-0 h-full w-1/2 bg-[#4E5A63E5]/90 shadow-lg backdrop-blur-lg p-5 z-50"
            >
                <div className="flex flex-col ml-3 mb-7">
                    <div className="p-2 hover:text-white cursor-pointer text-[#D3DDE4]">
                        {otherLocales.map(({ code, label }) => (
                            <Link key={code} href={`${pathname}${selectedCategory}`} locale={code}>
                                {label}
                            </Link>
                        ))}
                    </div>
                    <ul className="mt-4 text-white">
                        {Object.keys(NavLinks).map((el) => {
                            const href = NavLinks[el].link;

                            // Обработка для iOS-тач
                            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

                            const handleTouchStart = () => {
                                if (isIOS) {
                                    window.location.href = href;
                                }
                            };

                            return (
                                <li
                                    key={el}
                                    className={classNames(
                                        "text-[14px] sm:text-[14px] xl:text-[16px]",
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
                                </li>
                            );
                        })}

                        <Link
                            className="absolute top-5 right-4"
                            href={""}
                            onClick={() => setIsOpen(false)}>
                            <li className="text-white cursor-pointer text-2xl">✖</li>
                        </Link>
                    </ul>
                </div>
            </motion.div>
        </div>
    )
}

export default MobileNav;