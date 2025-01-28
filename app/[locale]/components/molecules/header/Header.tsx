"use client";
import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
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



const api = axios.create({
  baseURL: "https://api.dm-project.com.ua/wp-json/wc/v3/",
  headers: {
    Authorization: `Basic ${Buffer.from("ck_8dee30956004b4c7f467a46247004a2f4cd650e5:cs_1cf0a573275e5cafe5af6bddbb01f29b9592be20").toString("base64")}`,
  },
});

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
};

const Header = () => {
  const t = useTranslations("Header");
  const t2 = useTranslations("Index");
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const isMobile = useIsMobile();
  console.log({ isMobile });

  const handleSearch = async (term: string) => {
    if (term.length < 3) {
      setProducts([]);
      return;
    }

    setLoading(true);

    try {
      const response = await api.get("products?per_page=100", {
        params: {
          search: term,
          per_page: 20,
          lang: locale,
        },
      });

      console.log("API Response:", response.data);
      console.log("Total products fetched:", response.data.length);

      if (response.status === 200) {
        const filteredProducts = response.data.filter((product: Product) =>
          product.name.toLowerCase().includes(term.toLowerCase()),
        );
        setProducts(filteredProducts);
      }
    } catch (error) {
      console.error("Failed to fetch products:");
    } finally {
      setLoading(false);
    }
  };

  const debouncedHandleSearch = useMemo(() => debounce(handleSearch, 500), []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      debouncedHandleSearch(searchTerm);
    } else {
      setProducts([]);
    }
    return () => {
      debouncedHandleSearch.cancel();
    };
  }, [searchTerm, debouncedHandleSearch]);

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

  const selectedCategory = useMemo(() => {
    return searchParams?.get("category")
      ? `?category=${searchParams?.get("category")}`
      : "";
  }, [searchParams]);

  return (
    <header
      className={classNames("mt-top flex flex-col", styles["header"])}
    >
      {typeof window !== "undefined" && isMobile ? (
        <div className="flex flex-1 flex-col self-start  h-svh border-2 border-cyan-500">
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
                /> <span className="ml-2 font-bold">Продукти</span>
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
                  src="/go-menu.webp"
                  width={35}
                  height={35}
                  alt="Відкити меню"
                />
              </Link>
            </div>
          </div>
          <div className={classNames("flex justify-center items-center text-nowrap", styles["backText"])}>
            {t2("authorized-representativeDreger1")}<span className="font-bold mx-1">{t2("authorized-representativeDreger2")}</span> {t2("authorized-representativeDreger3")}
          </div>
          <div className={classNames("flex justify-center items-center pb-2 h-[50px] bg-[#0061AA]", styles["searchMob"])}>
            <Combobox value={searchTerm}>
              <div className="relative flex z-50 w-[90%]">
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

      ) :
        <>
          <div className={classNames("w-full", styles["lang"])}>
            <div className={styles.langText}>
              <Link href={`${pathname}${selectedCategory}`} locale="en">
                EN
              </Link>
              {"   "}
              <Link href={`${pathname}${selectedCategory}`} locale="ua">
                UA
              </Link>
            </div>
          </div>
          <div className={styles.containerWithLogo}>
            <div className={styles.logo}>
              <Link href={"/home"}>
                <Image
                  src="/logo-DM-project.png"
                  width={120}
                  height={75}
                  alt="Logo DM Project"
                />
              </Link>
            </div>
            <div className={styles.contactsGroupIcons}>
              <Image
                src="/telephone.png"
                width={40}
                height={40}
                alt="Logo DM Project"
              />
            </div>
            <div
              className={classNames(
                "text-[8px] sm:text-[10px] xl:text-[16px]",
                styles["contactsGroup"],
              )}
            >
              <div>+380 44 520-12-24</div>
              <div className="pt-1">+380 66 358-98-10</div>
              <div className="pl-10">(cервіс)</div>
            </div>
            <div className={styles.contactsGroupIcons}>
              <Image
                src="/email.png"
                width={40}
                height={40}
                alt="Logo DM Project"
              />
            </div>
            <div
              className={classNames(
                "text-[8px] sm:text-[10px] xl:text-[16px]",
                styles["contactsGroup"],
              )}
            >
              <div>allinfo@dm-project.com.ua</div>
              <div>sales@dm-project.com.ua</div>
              <div>service@dm-project.com.ua</div>
            </div>
            <div className={classNames("mx-auto max-w-76", styles["search"])}>
              <Combobox value={searchTerm}>
                <div className="relative flex z-50">
                  <ComboboxInput
                    className={clsx(
                      "w-full rounded-lg border-[#0061AA] border bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-black",
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
            <div className="flex flex-row pl-10">
              <div
                className={classNames(
                  "flex flex-row justify-center items-center",
                  styles["socialMedia"],
                )}
              >
                <Link href="http://youtube.com">
                  <Image
                    src="/youtube-ico.jpg"
                    width={30}
                    height={30}
                    alt="Logo Youtube"
                  />
                </Link>
              </div>
              <div
                className={classNames(
                  "flex flex-column justify-center items-center",
                  styles["socialMedia"],
                )}
              >
                <Link href="http://facebook.com">
                  <Image
                    src="/facebook-ico.jpg"
                    width={30}
                    height={30}
                    alt="Logo Facebook"
                  />
                </Link>
              </div>
            </div>
          </div>
        </>}
    </header>


  );
};

export default Header;
