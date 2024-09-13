"use client"
import React, { useState, useEffect } from "react";

import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://dm-project.com.ua/wp-json/wc/v3/',
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
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = async (term: string) => {
    if (term.length < 3) { // Adjust length as needed
      setProducts([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);

    try {
      const response = await api.get('products', {
        params: {
          search: term

        }
      });

      console.log('API Response:', response.data); // Log the response data

      if (response.status === 200) {
        const filteredProducts = response.data.filter((product: Product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        );
        setProducts(filteredProducts);
        setShowDropdown(true);
      }
    } catch (error) {
      console.error('Failed to fetch products:');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.length > 0) {
        handleSearch(searchTerm);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div className="search-container">
      <input
        className="text-black"
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 500)}  // Delay hiding to allow click
      />

      {loading && <div>Loading...</div>}

      {showDropdown && products.length > 0 && (
        <ul className="dropdown-menu">
          {products.map((product) => (
            <li key={product.id}>
              <a href={"/catalog/sub-catalog/product/" + product.id + "?category=" + product.tags[0].name}>
                {product.name}
                {}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchWithDropdown;