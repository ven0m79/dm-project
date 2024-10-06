"use client";
import classNames from "classnames";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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

const api = axios.create({
  baseURL: "https://dm-project.com.ua/wp-json/wc/v3/",
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
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

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
    <Suspense fallback={<div>Loading...</div>}>
    <header
      className={classNames("mt-top flex flex-col w-full", styles["header"])}
    >
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
        <div className={styles.contactsGroup}>
          <div>+380 44 520-12-24</div>
        </div>
        <div className={styles.contactsGroupIcons}>
          <Image
            src="/email.png"
            width={40}
            height={40}
            alt="Logo DM Project"
          />
        </div>
        <div className={styles.contactsGroup}>
          <div>allinfo@dm-project.com.ua</div>
          <div>sales@dm-project.com.ua</div>
          <div>service@dm-project.com.ua</div>
        </div>
        <div className={classNames("mx-auto w-72", styles["search"])}>
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
    </header>
    </Suspense>
  );
};

export default Header;
