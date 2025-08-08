"use client";
import classNames from "classnames";
import React, { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import { Link, usePathname } from "../../../../../config";
import { useTranslations, useLocale } from "next-intl";
import clsx from "clsx";
import Loader from "@app/[locale]/components/atoms/loader/loaderSearch";
import {
    Combobox,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from "@headlessui/react";
import debounce from "lodash.debounce";
import { useSearchParams } from "next/navigation";
import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";

type TagType = {
    id: number;
    name: string;
    slug: string;
};

type Product = {
    tags: TagType[];
    id: number;
    name: string;
    price: string;
    permalink: string;
}

const DesktopHeader: FC<{ searchTerm: string, loading: boolean, setSearchTerm: Dispatch<SetStateAction<string>>, products: Product[] }> = ({ searchTerm, setSearchTerm, loading, products }) => {
    const t = useTranslations("Header");


    // **Создаём локальное состояние для ввода и debounce**
    const [inputValue, setInputValue] = useState(searchTerm);

    // **Debounce функция, обновляет setSearchTerm с задержкой**
    const debouncedSearch = useMemo(
        () => debounce((query) => setSearchTerm(query), 300),
        [setSearchTerm]
    );

    // **Обновляем значение при вводе текста**
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        debouncedSearch(event.target.value);
    };

    useEffect(() => {
        return () => {
            debouncedSearch.cancel(); // Очищаем debounce при размонтировании
        };
    }, [debouncedSearch]);

    const highlightText = (text: string, highlight: string) => {
        const parts = text.split(new RegExp(`(${highlight})`, "gi"));
        return (
            <>
                {parts.map((part, i) => (
                    <span
                        key={i}
                        style={{
                            color:
                                part.toLowerCase() === highlight.toLowerCase() ? "blue" : "",
                        }}
                    >
                        {part}
                    </span>
                ))}
            </>
        );
    };


    const pathname = usePathname();
    const searchParams = useSearchParams();

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

   return <>
        <div className={classNames("w-screen", styles["lang"])}>
            <div className={styles.langText}>
                {otherLocales.map(({ code, label }) => (
                    <Link key={code} href={`${pathname}${selectedCategory}`}  locale={code}>
                        {label}
                    </Link>
                ))}
            </div>
        </div>
        <div className={styles.containerWithLogo}>
            <div className={styles.logo}>
                <Link href={"/"}>
                    <Image
                        src="/logo-DM-project.png"
                        width={120}
                        height={75}
                        alt="Logo DM Project" />
                </Link>
            </div>
            <div className={styles.contactsGroupIcons}>
                <Image
                    src="/telephone.png"
                    width={40}
                    height={40}
                    alt="Logo DM Project" />
            </div>
            <div
                className={classNames(
                    "text-[8px] sm:text-[10px] xl:text-[16px]",
                    styles["contactsGroup"]
                )}
            >
                <div><a href="tel:+380754482535" className="block hover:none">+380 75-448-25-35</a></div>
                <div className="pl-0">{t("sale-department")}</div>
                <div className="pt-1"><a href="tel:+380665044403" className="block hover:none">+380 66 358-98-10</a></div>
                <div className="pl-0">{t("service-department")}</div>
            </div>
            <div className={styles.contactsGroupIcons}>
                <Image
                    src="/email.png"
                    width={40}
                    height={40}
                    alt="Logo DM Project" />
            </div>
            <div
                className={classNames(
                    "text-[8px] sm:text-[10px] xl:text-[16px]",
                    styles["contactsGroup"]
                )}
            >
                <div>  <a href="mailto:allinfo@dm-project.com.ua" className="block hover:none">
                    allinfo@dm-project.com.ua
                </a></div>
                <div>  <a href="mailto:sales@dm-project.com.ua" className="block hover:none">
                    sales@dm-project.com.ua
                </a></div>
                <div>  <a href="mailto:service@dm-project.com.ua" className="block hover:none">
                    service@dm-project.com.ua
                </a></div>
            </div>
            <div className={classNames("mx-auto max-w-76", styles["search"])}>
                <Combobox value={searchTerm}>
                    <div className="relative flex z-50">
                        <ComboboxInput
                            className={clsx(
                                "w-full rounded-lg border-[#0061AA] border bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-black",
                                "focus: outline-none data-[focus]:outline-none data-[focus]:-outline-offset-2 data-[focus]:bg-sky-50"
                            )}
                            placeholder={t("placeholder")}
                            onChange={handleChange} />

                        {loading && (
                            <div className="absolute right-5 mt-4">
                                <Loader />
                            </div>
                        )}

                        {products.length > 0 && (
                            <ComboboxOptions
                                anchor="bottom start"
                                transition
                                style={{ width: "calc(var(--input-width) * 2)" }}
                                className={clsx(
                                    "rounded-xl border-2 border-[#0061AA] bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible z-50",
                                    "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                                )}
                            >
                                {products.map((product) => (
                                    <ComboboxOption
                                        key={product.id}
                                        value={product.name}
                                        className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-sky-100"
                                    >
                                        <a
                                            className={clsx("block, text-black")}
                                            href={`/catalog/sub-catalog/product/${product.id}?category=${product.tags[0].name}`}
                                        >
                                            <div className="text-sm/6 text-black">
                                                {highlightText(product.name, searchTerm)}
                                            </div>
                                        </a>
                                    </ComboboxOption>
                                ))}
                            </ComboboxOptions>
                        )}
                    </div>
                </Combobox>
            </div>
            <div className="flex flex-row pl-10">
                <div
                    className={classNames(
                        "flex flex-row justify-center items-center",
                        styles["socialMedia"]
                    )}
                >
                    <Link href="https://youtube.com/@draeger?si=cNuSHUm57sHZvnkI">
                        <Image
                            src="/youtube-ico.jpg"
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
                            src="/facebook-ico.jpg"
                            width={30}
                            height={30}
                            alt="Logo Facebook" />
                    </Link>
                </div>
                <div
                    className={classNames(
                        "flex flex-column justify-center items-center",
                        styles["socialMedia"]
                    )}
                >
                    <Link href="https://www.instagram.com/dmproject_drager?igsh=MWJuaWRidnJ5dTM2Zg==">
                        <Image
                            src="/instagram.webp"
                            width={30}
                            height={30}
                            alt="Logo Instagram" />
                    </Link>
                </div>
            </div>
        </div></>

}

export default DesktopHeader;