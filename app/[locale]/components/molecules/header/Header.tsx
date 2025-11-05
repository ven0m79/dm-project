"use client";
import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import styles from "./Header.module.css";
import Image from "next/image";
import { Link, usePathname } from "../../../../../config";
import { useTranslations, useLocale } from "next-intl";

import debounce from "lodash.debounce";
import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";


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
}

const Header = () => {
  const locale = useLocale();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();
  //const [mounted, setMounted] = useState(false);

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

  // useEffect(() => setMounted(true), []);
  // if (!mounted) return null;

  return (
    <header className={classNames("mt-top flex flex-col", styles["header"])}>
      { isMobile ? 
      <MobileHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} loading={loading} products={products} /> 
      :
      <DesktopHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} loading={loading} products={products} /> }
    </header >
  );
};

export default Header;
