"use client"
import React, { useState, useEffect, useMemo } from "react";

import axios from 'axios';
import { useTranslations, useLocale } from "next-intl";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import clsx from 'clsx';
import Loader from "@app/[locale]/components/atoms/loader/loaderSearch";
import debounce from "lodash.debounce";

const api = axios.create({
  baseURL: 'https://api.dm-project.com.ua/wp-json/wc/v3/',
  headers: {
    'Authorization': `Basic ${Buffer.from('ck_8dee30956004b4c7f467a46247004a2f4cd650e5:cs_1cf0a573275e5cafe5af6bddbb01f29b9592be20').toString('base64')}`
  }
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

const SearchWithDropdown = () => {
  const t = useTranslations();
  const locale = useLocale();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  
  const handleSearch = async (term: string) => {
    if (term.length < 3) {
      setProducts([]);
      return;
    }

    setLoading(true);

    try {
      const response = await api.get('products?per_page=100', {
        params: {
          search: term,
          per_page: 20,
          lang: locale,
        }
      });

      console.log('API Response:', response.data);
      console.log("Total products fetched:", response.data.length);

      if (response.status === 200) {
        const filteredProducts = response.data.filter((product: Product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        );
        setProducts(filteredProducts);
      }
    } catch (error) {
      console.error('Failed to fetch products:');
    } finally {
      setLoading(false);
    }
  };

  const debouncedHandleSearch = useMemo(
    () => debounce(handleSearch, 500),
    []
  );

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
              color: part.toLowerCase() === highlight.toLowerCase() ? "blue" : "",
            }}
          >
            {part}
          </span>
        ))}
      </>
    );
  };

  return (
    <div className="mx-auto h-screen w-72 pt-20 z-50">
      <Combobox
        value={searchTerm}
      >
        <div className="relative flex">
          <ComboboxInput
            className={clsx(
              'w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            placeholder="Search products..."
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          {loading && <div className="absolute right-5 mt-4">
              <Loader />
            </div>}

          {products.length > 0 && (
            <ComboboxOptions
              anchor="bottom"
              transition
              className={clsx(
                'w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
              )}>
              {products.map((product) => (
                <ComboboxOption
                  key={product.id}
                  value={product.name}
                  className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10">
                  <a
                    className={clsx('block, text-black')}
                    href={"/catalog/sub-catalog/product/" + product.id + "?category=" + product.tags[0].name}>
                    <div className="text-sm/6 text-white">
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
  );
};
export default SearchWithDropdown;