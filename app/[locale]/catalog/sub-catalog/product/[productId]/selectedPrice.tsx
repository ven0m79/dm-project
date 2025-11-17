"use client";

import { useEffect, useState } from "react";
import { fetchWooCommerceProductVariations } from "../../../../../../utils/woocommerce.setup";
import classNames from "classnames";
import styles from "../../Sub-catalog.module.css";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function ProductDetails({ details }: { details: any }) {
    const locale = useLocale();
    const [variations, setVariations] = useState<any[]>([]);
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

    useEffect(() => {
        async function loadVariations() {
            if (!details.id) return;
            const data = await fetchWooCommerceProductVariations(details.id, locale);
            console.log("VARIATIONS RAW:", data);

            const variationsArray = Array.isArray(data)
                ? data
                : data?.variations || [];

            setVariations(variationsArray);

            if (variationsArray.length > 0) {
                setSelectedVariation(variationsArray[0]);
                setPrice(getVariationPrice(variationsArray[0]));
            }
        }

        loadVariations();
    }, [details.id, locale]);

    const handleVariationChange = (id: string) => {
        const variation = variations.find((v) => v.id === Number(id));
        if (variation) {
            setSelectedVariation(variation);
            setPrice(getVariationPrice(variation));
        }
    };

    return (
        <>
            {/* 🔹 Комбо-бокс для вибору розміру */}
            {variations.length > 0 && (
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
                        {variations.map((variation) => (
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
                                productName: `${details.name}${selectedVariation?.attributes?.[0]?.option
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
