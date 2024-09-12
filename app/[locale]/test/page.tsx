"use client"
import React, { useState, useEffect } from "react";

import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://dm-project.com.ua/', 
  headers: {
    'Authorization': `Basic ${Buffer.from('ck_8dee30956004b4c7f467a46247004a2f4cd650e5:cs_1cf0a573275e5cafe5af6bddbb01f29b9592be20').toString('base64')}`
  }
});

type Product = {
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
        setProducts(response.data);
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
              <a href={product.permalink}>
                {product.name} - ${product.price}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchWithDropdown;