"use client";

import React, { useRef, useState, useMemo } from "react";
import Image from "next/image";
import classNames from "classnames";
import { motion, useMotionValue, animate } from "framer-motion";
import { useIsMobile } from "../../../components/hooks/useIsMobile";

type BrandImage = {
  src: string;
  href: string;
  alt: string;
};

const images: BrandImage[] = [
  { src: "/logo-partners/dreger-log-partner.webp", href: "/partners/dreger", alt: "Draeger" },
  { src: "/logo-partners/atos-log-partner.webp", href: "/partner/atos", alt: "Atos" },
  { src: "/logo-partners/lojer-log-partner.webp", href: "/partner/lojer", alt: "Lojer" },
  { src: "/logo-partners/prohs-log-partner.webp", href: "/partner/prohs", alt: "Prohs" },
  { src: "/logo-partners/renosem-log-partner.webp", href: "/partner/renosem", alt: "Renosem" },
  { src: "/logo-partners/inspital.webp", href: "/partner/inspital", alt: "Inspital" },
  { src: "/logo-partners/fsn.webp", href: "/partner/fsn", alt: "FSN" },
  { src: "/logo-partners/mimp.webp", href: "/partner/mimp", alt: "MIMP" },
];

const THUMB_WIDTH = 120;
const GAP = 20;
const CONTAINER_PADDING = 16;
const DRAG_THRESHOLD = 6;

export default function CarouselBrands() {
  const isMobile = useIsMobile();
  const VISIBLE_COUNT = isMobile ? 2 : 6;

  const STEP = THUMB_WIDTH + GAP;

  const CONTAINER_WIDTH = useMemo(
    () =>
      VISIBLE_COUNT * THUMB_WIDTH +
      (VISIBLE_COUNT - 1) * GAP +
      CONTAINER_PADDING * 2,
    [VISIBLE_COUNT]
  );

  const maxStartIndex = images.length - VISIBLE_COUNT;

  const [selectedImage, setSelectedImage] = useState(0);
  const x = useMotionValue(0);

  const pointerDownX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const snapToIndex = (index: number) => {
    const clamped = Math.min(Math.max(0, index), maxStartIndex);
    setSelectedImage(clamped);

    animate(x, -STEP * clamped, {
      type: "spring",
      stiffness: 180,
      damping: 26,
      mass: 0.8,
    });
  };

  const prev = () => snapToIndex(selectedImage - 1);
  const next = () => snapToIndex(selectedImage + 1);

  return (
    <div className="flex flex-row">
      {/* Ліва стрілка */}
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

      {/* Карусель */}
      <div className="relative flex items-center justify-center mt-8">
        <div
          className="overflow-hidden"
          style={{
            width: CONTAINER_WIDTH,
            paddingLeft: CONTAINER_PADDING,
            paddingRight: CONTAINER_PADDING,
          }}
        >
          <motion.div
            className="flex cursor-grab"
            drag="x"
            dragConstraints={{
              left: -STEP * maxStartIndex,
              right: 0,
            }}
            style={{ x }}
            onPointerDown={(e) => {
              pointerDownX.current = e.clientX;
              isDragging.current = false;
            }}
            onPointerMove={(e) => {
              if (pointerDownX.current !== null) {
                const delta = Math.abs(e.clientX - pointerDownX.current);
                if (delta > DRAG_THRESHOLD) {
                  isDragging.current = true;
                }
              }
            }}
            onPointerUp={() => {
              pointerDownX.current = null;
            }}
            onDragEnd={() => {
              const index = Math.round(-x.get() / STEP);
              snapToIndex(index);
            }}
          >
            {images.map((item, index) => {
              const isActive = index === selectedImage;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  draggable={false}
                  onClick={(e) => {
                    if (isDragging.current) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  className={classNames("flex-shrink-0", isActive && "z-10")}
                  style={{
                    width: THUMB_WIDTH,
                    height: THUMB_WIDTH,
                    marginRight: GAP,
                  }}
                >
                  <div
                    className={classNames(
                      "w-full h-full border rounded overflow-hidden",
                      "transition-all duration-200 ease-out",
                      isActive
                        ? "opacity-60 border-blue-600 shadow hover:opacity-100 hover:scale-110"
                        : "opacity-60 hover:opacity-100 hover:scale-110"
                    )}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={THUMB_WIDTH}
                      height={THUMB_WIDTH}
                      draggable={false}
                      className="object-contain pointer-events-none"
                    />
                  </div>
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
