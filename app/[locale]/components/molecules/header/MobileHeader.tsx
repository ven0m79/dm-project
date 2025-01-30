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
  
  const MobileHeader: FC<{searchTerm: string, loading: boolean, setSearchTerm: Dispatch<SetStateAction<string>>, products: Product[]}> = ({searchTerm, setSearchTerm, loading, products}) => {
    const t = useTranslations("Header");
    const t2 = useTranslations("Index");
    
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
  

    return <div className="flex flex-1 flex-col self-start  h-svh border-2 border-cyan-500">
      <div className={classNames("flex flex-1 flex-row justify-center w-screen", [styles.logo])}>
        <div className="ml-4 w-1/4">
          <Link
            href={"/catalog"}
            className="flex items-center">
            <Image
              src="/go-products.webp"
              width={25}
              height={25}
              alt="Перейти до каталогу продуктів"
            /> <span className="ml-2 text-sm">Продукти</span>
          </Link>
        </div>
        <div className="flex justify-center w-1/2">
          <Link href={"/home"}>
            <Image
              src="/logo-DM-project.png"
              width={120}
              height={75}
              alt="Logo DM Project"
            />
          </Link>
        </div>
        <div className="flex justify-center w-1/4">
          <Link href={"/catalog"}>
            <Image
            className="opacity-0"
              src="/go-menu.webp"
              width={35}
              height={35}
              alt="Відкити меню"
            />
          </Link>
        </div>
      </div>
      <div className={classNames("flex justify-center items-center h-[30px] text-white text-nowrap bg-[#0061AA]", styles["backText"])}>
        {t2("authorized-representativeDreger1")}<span className="font-bold mx-1">{t2("authorized-representativeDreger2")}</span> {t2("authorized-representativeDreger3")}
      </div>
      <div className={classNames("flex justify-center items-center pb-2 h-[50px] bg-[#0061AA]", styles["searchMob"])}>
        <Combobox value={searchTerm}>
          <div className="relative flex z-49 w-[90%]">
            <ComboboxInput
              className={clsx(
                "w-full rounded-lg border-[#0061AA] border bg-white py-1 pr-8 pl-3 text-sm/6 text-black",
                "focus: outline-none data-[focus]:outline-none data-[focus]:-outline-offset-2 data-[focus]:bg-sky-50",
              )}
              placeholder={t("placeholder")}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
  
            {loading && (
              <div className="absolute right-5 mt-4">
                <Loader />
              </div>
            )}
  
            {products.length > 0 && (
              <ComboboxOptions
                anchor="bottom"
                transition
                className={clsx(
                  "w-[var(--input-width)] rounded-xl border-2 border-[#0061AA] bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible z-50",
                  "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
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
    </div>
  
  }

  
export default MobileHeader;