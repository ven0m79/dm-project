"use client";

import { useState } from "react";

import styles from "../../Sub-catalog.module.css";
import Link from "next/link";

export default function ProductDetails({ details }: { details: any }) {
  const [selectedVariation, setSelectedVariation] = useState<any>(null);
  const [price, setPrice] = useState(details.price);

  const getVariationPrice = (variation: any) => {
    return (
      variation.price ||
      variation.sale_price ||
      variation.regular_price ||
      details.price ||
      0
    );
  };

  const handleVariationChange = (id: string) => {
    const variation = details?.variations?.find(
      (v: any) => v.id === Number(id),
    );
    if (variation) {
      setSelectedVariation(variation);
      setPrice(getVariationPrice(variation));
    }
  };

  return (
    <>
      {/* 🔹 Комбо-бокс для вибору розміру */}
      {details?.variations?.length > 0 && (
        <div className="mt-4 w-full">
          <label htmlFor="size" className="block mb-2 font-semibold">
            Оберіть розмір:
          </label>
          <select
            id="size"
            onChange={(e) => handleVariationChange(e.target.value)}
            className="border border-gray-400 rounded-md p-2 w-full text-gray-800"
            value={selectedVariation?.id || ""}
          >
            {details?.variations?.map((variation: any) => (
              <option key={variation.id} value={variation.id}>
                {variation.attributes?.[0]?.option ||
                  `Варіант #${variation.id}`}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 🔹 Поточна ціна */}
      <div className="mt-3 text-lg font-bold text-green-700">
        Ціна: {price} ₴
      </div>

      {/* 🔹 Посилання з передачею імені та розміру */}
      <div className="flex flex-col justify-between items-center mt-4">
        <div className={styles.downloadable}>
          <Link
            href={{
              pathname: "../../../../contacts",
              query: {
                productName: `${details.name}${
                  selectedVariation?.attributes?.[0]?.option
                    ? `, ${selectedVariation.attributes[0].option}`
                    : ""
                }`,
              },
            }}
          >
            Запит комерційної пропозиції
          </Link>
        </div>
      </div>
    </>
  );
}
