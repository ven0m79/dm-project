"use client";

import React, { useLayoutEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { motion, useMotionValue } from "framer-motion";

const images = [
    "/logo-partners/dreger-log-partner.webp",
    "/logo-partners/atos-log-partner.webp",
    "/logo-partners/lojer-log-partner.webp",
    "/logo-partners/prohs-log-partner.webp",
    "/logo-partners/renosem-log-partner.webp",
    "/logo-partners/inspital.webp",
    "/logo-partners/fsn.webp",
    "/logo-partners/mimp.webp",
];


const THUMB_WIDTH = 120; // Зменшив ширину трохи, щоб помістилося 6 штук
const GAP = 20;
const VISIBLE_COUNT = 6; // Фіксована кількість видимих мініатюр
const CONTAINER_WIDTH = VISIBLE_COUNT * THUMB_WIDTH + (VISIBLE_COUNT - 1) * GAP;

export default function CarouselBrands() {
    const [selectedImage, setSelectedImage] = useState(0);
    const x = useMotionValue(0);

    const maxStartIndex = images.length - VISIBLE_COUNT;

    // Під час свайпу оновлюємо selectedImage
    // x.onChange((currentX) => {
    //     const approximateIndex = Math.round(-currentX / (THUMB_WIDTH + GAP));
    //     setSelectedImage(Math.min(Math.max(0, approximateIndex), maxStartIndex));
    // });

    const prev = () => {
        const newIndex = Math.max(selectedImage - 1, 0);
        setSelectedImage(newIndex);
        x.set(-(THUMB_WIDTH + GAP) * newIndex);
    };

    const next = () => {
        const newIndex = Math.min(selectedImage + 1, maxStartIndex);
        setSelectedImage(newIndex);
        x.set(-(THUMB_WIDTH + GAP) * newIndex);
    };

    return (
        <div className="flex flex-row">
            <div className="h-5 self-center w-10 justify-center">
                {selectedImage > 0 && (
                    <button
                        onClick={prev}
                        className="bg-white shadow rounded-full px-3 py-2 z-10"
                    >
                        ←
                    </button>
                )}
            </div>

            <div className="relative flex items-center justify-center mt-8">

                {/* Карусель */}
                <div className="overflow-hidden" style={{ width: CONTAINER_WIDTH }}>
                    <motion.div
                        className="flex cursor-grab"
                        drag="x"
                        dragConstraints={{
                            left: -(THUMB_WIDTH + GAP) * maxStartIndex,
                            right: 0,
                        }}
                        style={{ x }}
                        transition={{ type: "spring", stiffness: 200, damping: 30 }}
                        onDragEnd={() => {
                            const currentX = x.get();
                            const newIndex = Math.round(-currentX / (THUMB_WIDTH + GAP));
                            const clampedIndex = Math.min(
                                Math.max(0, newIndex),
                                maxStartIndex
                            );

                            setSelectedImage(clampedIndex);
                            x.set(-(THUMB_WIDTH + GAP) * clampedIndex);
                        }}
                    >

                        {images.map((src, index) => {
                            const isActive = index === selectedImage;

                            return (
                                <a
                                    key={index}
                                    href={`/partner/${index}`}
                                    draggable={false}
                                    className={classNames(
                                        "flex-shrink-0 border rounded overflow-hidden transition-all",
                                        isActive ? "border-blue-600 shadow" : "opacity-50 hover:opacity-80"
                                    )}
                                    style={{ width: THUMB_WIDTH, height: THUMB_WIDTH, marginRight: GAP }}
                                >
                                    <Image
                                        src={src}
                                        alt={`Thumbnail ${index + 1}`}
                                        width={THUMB_WIDTH}
                                        height={THUMB_WIDTH}
                                        draggable={false}
                                        className="object-contain pointer-events-none"
                                    />
                                </a>
                            );
                        })}
                    </motion.div>
                </div>

            </div>
            {/* Права стрілка */}
            <div className="h-5 self-center w-10 justify-center">
                {selectedImage < maxStartIndex && (
                    <button
                        onClick={next}
                        className="bg-white shadow rounded-full px-3 py-2 z-10"
                    >
                        →
                    </button>
                )}
            </div>

        </div>
    );
}
