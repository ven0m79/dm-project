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

const CONTAINER_WIDTH = 800;
const THUMB_WIDTH = 120; // Зменшив ширину трохи, щоб помістилося 6 штук
const GAP = 8;
const VISIBLE_COUNT = 6; // Фіксована кількість видимих мініатюр

export default function CarouselBrands() {
  const [selectedImage, setSelectedImage] = useState(0);
  const x = useMotionValue(0);

  const maxStartIndex = images.length - VISIBLE_COUNT;

  // Під час свайпу оновлюємо selectedImage
  x.onChange((currentX) => {
    const approximateIndex = Math.round(-currentX / (THUMB_WIDTH + GAP));
    setSelectedImage(Math.min(Math.max(0, approximateIndex), maxStartIndex));
  });

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
    <div className="relative flex items-center justify-center mt-8">
      {/* Ліва стрілка */}
      <button
        onClick={prev}
        className={classNames(
          "absolute left-0 -translate-x-1/2 bg-white shadow rounded-full px-3 py-2 z-10",
          selectedImage === 0 && "invisible"
        )}
      >
        ←
      </button>

      {/* Карусель */}
      <div className="overflow-hidden" style={{ width: CONTAINER_WIDTH }}>
        <motion.div
          className="flex cursor-grab"
          drag="x"
          dragConstraints={{ left: -(THUMB_WIDTH + GAP) * maxStartIndex, right: 0 }}
          style={{ x }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
        >
          {images.map((src, index) => {
            const isActive = index === selectedImage;

            return (
              <a
                key={index}
                href={`/partner/${index}`}
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
                  className="object-contain pointer-events-none"
                />
              </a>
            );
          })}
        </motion.div>
      </div>

      {/* Права стрілка */}
      <button
        onClick={next}
        className={classNames(
          "absolute right-0 translate-x-1/2 bg-white shadow rounded-full px-3 py-2 z-10",
          selectedImage >= maxStartIndex && "invisible"
        )}
      >
        →
      </button>
    </div>
  );
}
