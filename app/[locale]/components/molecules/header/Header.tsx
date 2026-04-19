"use client";
import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./Header.module.css";
import { useLocale } from "next-intl";

import debounce from "lodash.debounce";
import { useIsMobile } from "../../hooks/useIsMobile";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";

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
      const res = await fetch(
        `/api/woocommerce/search?search=${encodeURIComponent(term)}&locale=${encodeURIComponent(locale)}`,
      );

      if (res.ok) {
        const data = await res.json();
        const filteredProducts = data.filter((product: Product) =>
          product.name.toLowerCase().includes(term.toLowerCase()),
        );
        setProducts(filteredProducts);
      }
    } catch {
      // search failed silently
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
