"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { SingleProductDetails } from "../../../../../../utils/woocomerce.types";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, CustomFlowbiteTheme } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { useTranslations } from "next-intl";
import { useBreadcrumbs } from "@app/[locale]/components/atoms/breadcrumbs/breadcrumbs";
import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";
import Loader from "@app/[locale]/components/atoms/loader/Loader";
import MobileBreadcrumbs from "./MobileBreadcrumbs";
import DesktopBreadcrumbs from "./DesktopBreadcrumbs";
import styles from "./Product.module.css";

const customTheme: CustomFlowbiteTheme = {
  tabs: {
    base: "flex flex-col gap-2",
    tablist: {
      base: "flex text-center",
      styles: {
        default: "flex-wrap border-b border-gray-200 dark:border-gray-300",
        underline: "-mb-px flex-wrap border-b border-gray-200 dark:border-gray-700",
      },
      tabitem: {
        base: "flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus:outline-none focus:ring-0 focus:ring-cyan-900 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
        styles: {
          default: {
            base: "rounded-t-lg",
            active: {
              on: "bg-[#0060aa10] text-[#0061AA] dark:bg-[#0060aa10] dark:text-[#0061AA]",
              off: "text-[#0061AA] hover:bg-gray-50 hover:text-[#0061AA] dark:text-[#0060aa50] dark:hover:bg-[#0060aa50] dark:hover:text-text-[#0061AA]",
            },
          },
          underline: {
            base: "rounded-t-lg",
            active: {
              on: "active rounded-t-lg border-b-2 border-cyan-600 text-cyan-600 dark:border-cyan-500 dark:text-cyan-500",
              off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
            },
          },
        },
        icon: "mr-2 h-5 w-5",
      },
    },
    tabitemcontainer: { base: "", styles: { default: "", underline: "" } },
    tabpanel: "py-3",
  },
};

type ClientPageProps = {
  params: { locale: string };
  serverData: {
    details: SingleProductDetails | null;
    crossSellProducts: SingleProductDetails[];
    relatedProducts: SingleProductDetails[];
  };
};

export default function ClientPage({ params: { locale }, serverData }: ClientPageProps) {
  const t = useTranslations("Product");
  const { productId } = useParams<any>();
  const router = useRouter();
  const isMobile = useIsMobile();

  const [details] = useState<SingleProductDetails | null>(serverData.details);
  const [crossSellProducts] = useState<SingleProductDetails[]>(serverData.crossSellProducts);
  const [relatedProducts] = useState<SingleProductDetails[]>(serverData.relatedProducts ?? []);
  const [loading] = useState<boolean>(!details);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const { breadcrumbs, buildCategoryTrail } = useBreadcrumbs();
  const isIOS = typeof window !== "undefined" && /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const [mounted, setMounted] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const youtubeMeta = details?.meta_data?.find((item: any) => item.key === "_nickx_video_text_url");
  const youtubeUrl = Array.isArray(youtubeMeta?.value) ? youtubeMeta?.value[0] : youtubeMeta?.value;
  const isAccessories = details?.tags?.map((el) => el.name)?.includes("accessories");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollContainer = useRef<HTMLDivElement | null>(null);


  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (details?.categories?.length) {
      buildCategoryTrail(details.categories, locale, details.name, details.id);
    }
  }, [details, locale, buildCategoryTrail]);

  useEffect(() => {
    const active = thumbnailRefs.current[selectedImage];
    if (active) {
      active.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedImage]);

  if (!details) {
    return (
      <div className="flex w-full h-4/5 justify-center items-center">
        <Loader />
      </div>
    );
  }

  const scrollToImage = (index: number) => {
    if (index < 0 || index >= details.images.length) return;
    setSelectedImage(index);
  };

  const prevImage = () => scrollToImage(selectedImage - 1);
  const nextImage = () => scrollToImage(selectedImage + 1);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex self-center flex-col max-w-[900px] mb-8">
      {/* Breadcrumbs */}
      <div className={classNames("mt-5", { "ml-2": isMobile, "ml-4": !isMobile })}>
        {isMobile ? (
          <MobileBreadcrumbs breadcrumbs={breadcrumbs} isIOS={isIOS} router={router} detailsName={details.name} />
        ) : (
          <DesktopBreadcrumbs breadcrumbs={breadcrumbs} isIOS={isIOS} router={router} />
        )}
      </div>

      {/* Основний контент */}
      <div className="flex flex-col py-1 px-2 min-h-[600px] flex-1">
        {loading ? (
          <div className="flex w-full h-4/5 justify-center items-center">
            <Loader />
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
            ><div className="flex flex-row w-full">
                {/* 🖼️ Галерея з мініатюрами */}
                <div className="flex flex-col w-1/2 items-center">
                  {/* Основне зображення */}
                  <div
                    onClick={openModal}
                    className={classNames(
                      "relative w-full max-w-[350px] h-[375px] rounded-lg overflow-hidden shadow-md flex items-center justify-center cursor-zoom-in"
                    )}
                  >
                    <Image
                      src={details.images?.[selectedImage]?.src || "/placeholder.png"}
                      alt={details.images?.[selectedImage]?.alt || details.name || ""}
                      fill
                      className="object-contain transition-transform duration-300 hover:scale-105 p-3"
                      sizes="(max-width: 768px) 100vw, 350px"
                      priority
                    />
                  </div>

                  {/* Карусель мініатюр */}
                  <div className="relative w-full flex flex-col items-center my-4">
                    {/* Контейнер із мініатюрами */}
                    <div
                      ref={carouselRef}
                      className="flex overflow-hidden space-x-2 sm:px-10 px-20 max-w-[300px] snap-x snap-mandatory scroll-smooth mt-2 mb-4"
                    >
                      {details.images?.length ? (
                        details.images.map((img, index) => {
                          const isActive = selectedImage === index;
                          let isVisible = false;

                          // Визначаємо відображувані індекси так, щоб завжди було 3
                          const start = Math.max(0, Math.min(selectedImage - 1, (details.images.length || 0) - 3));
                          const end = start + 2;

                          if (index >= start && index <= end) {
                            isVisible = true;
                          }

                          return (
                            <button
                              key={index}
                              ref={(el) => (thumbnailRefs.current[index] = el)}
                              onClick={() => setSelectedImage(index)}
                              disabled={!isVisible}
                              className={classNames(
                                "flex-shrink-0 snap-center border rounded-md overflow-hidden transition-all duration-300 w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] focus:outline-none",
                                isActive
                                  ? "border-[#0061AA] shadow-md opacity-100"
                                  : isVisible
                                    ? "border-gray-300 opacity-40 hover:opacity-80"
                                    : "opacity-0 pointer-events-none scale-90"
                              )}
                            >
                              <div className="w-full h-full flex justify-center items-center bg-white">
                                <Image
                                  src={img.src}
                                  alt={img.alt || details.name || ""}
                                  width={60}
                                  height={60}
                                  className={classNames(
                                    "object-contain transition-transform duration-300",
                                    isActive ? "scale-110" : "scale-100"
                                  )}
                                  unoptimized
                                />
                              </div>
                            </button>
                          );
                        })
                      ) : (
                        <span className="text-gray-500 text-sm italic">Немає зображень</span>
                      )}
                    </div>

                    {/* Кнопки керування */}
                    <div className="absolute inset-y-0 flex items-center justify-between w-full sm:px-5 px-0 pointer-events-none">
                      {/* Ліва кнопка або порожній блок */}
                      <div className="w-10 flex justify-start">
                        {selectedImage > 0 && (
                          <button
                            onClick={prevImage}
                            className="pointer-events-auto shadow rounded-full p-2 transition text-[#0061AA] hover:scale-110 bg-white"
                          >
                            ←
                          </button>
                        )}
                      </div>

                      {/* Права кнопка або порожній блок */}
                      <div className="w-10 flex justify-end">
                        {selectedImage < (details.images?.length || 0) - 1 && (
                          <button
                            onClick={nextImage}
                            className="pointer-events-auto shadow rounded-full p-2 transition text-[#0061AA] hover:scale-110 bg-white"
                          >
                            →
                          </button>
                        )}
                      </div>
                    </div>

                  </div>





                </div>

                {/* Інформація */}
                <div className="px-4 pt-0 sm:pt-10 w-1/2">
                  <h1 className="text-[22px] font-bold text-[#002766] mb-[10px]">{details.name}</h1>
                  <div className={classNames("text-normal w-full h-auto", styles.brand)}>
                    {t("product-brand")} {details.brands[0]?.name}
                  </div>

                  {isAccessories ? (
                    <>
                      <div className={classNames("text-normal", styles.brand)}>Артикул: {details.sku}</div>
                      <div className={classNames("text-normal sm:mt-12 mt-6 justify-center")}>
                        {details.price && (
                          <span className="text-[#0061AA] text-[18px]">
                            <span className="font-bold text-[#002766]">
                              {!mounted ? "Ціна:" : /\s|,|;/.test(details.sku || "") ? "Ціна від:" : "Ціна:"}
                            </span>{" "}
                            {String(details.price).replace(".", ",")} {t("grn")}
                          </span>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className={classNames("text-normal sm:mt-16 mt-6")}>
                      {details.price && (
                        <span className={classNames("lowercase", styles.price)}>
                          {String(details.price).replace(".", ",")} {t("grn")}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="sm:h-[20px] h-[5px]"></div>
                  <div className="flex flex-col justify-between items-center">
                    <div className={styles.downloadable}>
                      <Link
                        href={{
                          pathname: "../../../../contacts",
                          query: { productName: details.name },
                        }}
                      >
                        {t("product-request")}
                      </Link>
                    </div>
                    <br />
                    {!isAccessories && (
                      <div className={classNames("flex items-center", styles.downloadable)}>
                        <Link href={"../../../../services"}>{t("product-services")}</Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.stroke}></div>

              {/* Tabs */}
              <div className="text-black">
                <Tabs aria-label="Default tabs" theme={customTheme.tabs}>
                  <Tabs.Item active title="Опис" icon={HiUserCircle}>
                    <div
                      className="content w-fit"
                      suppressHydrationWarning
                      dangerouslySetInnerHTML={{ __html: details.description || "" }}
                    />
                  </Tabs.Item>

                  {details.attributes?.length > 0 && (
                    <Tabs.Item title="Характеристики" icon={HiAdjustments}>
                      <div className="overflow-hidden rounded-xl shadow border border-gray-200">
                        <table className="w-full border-collapse text-sm">
                          <tbody>
                            {details.attributes.map((attr, index) => (
                              <tr
                                key={index}
                                className={classNames(
                                  "transition-colors",
                                  index % 2 === 0 ? "bg-white" : "bg-[#f8f8f8]",
                                  "hover:bg-[#dceaf7]"
                                )}
                              >
                                <td className="py-3 px-4 font-medium text-[#0061AA] w-1/3 border-b border-gray-100">
                                  {attr.name}
                                </td>
                                <td className="py-3 px-4 text-[#0061AA] border-b border-gray-100 text-right">
                                  {Array.isArray(attr.options) ? attr.options.join(", ") : attr.options}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Tabs.Item>
                  )}

                  {!isAccessories && crossSellProducts.length > 0 && (
                    <Tabs.Item title="Аксесуари та комплектуючі" icon={MdDashboard}>
                      <div className={classNames("ml-10", styles.downloadabled)}>
                        {crossSellProducts.map((el) => (
                          <li key={el.id} className="mx-1">
                            <a
                              className="text text-blue-900"
                              href={`/catalog/sub-catalog/product/${el.id}?category=${el.tags[0].name}`}
                            >
                              {el.name}
                            </a>
                          </li>
                        ))}
                      </div>
                    </Tabs.Item>
                  )}

                  {details.downloads?.length > 0 && (
                    <Tabs.Item title="Завантаження" icon={HiAdjustments}>
                      <div className={classNames("", styles.downloadabled)}>
                        {details.downloads.map((el) => (
                          <li key={el.id} className="mx-1">
                            <Link href={el.file}>{el.name}</Link>
                          </li>
                        ))}
                      </div>
                    </Tabs.Item>
                  )}

                  {youtubeUrl && (
                    <Tabs.Item title="Відео" icon={HiClipboardList}>
                      <button
                        onClick={() => window.open(youtubeUrl, "_blank")}
                        className="text-blue-600 underline"
                        rel="noopener noreferrer"
                      >
                        Переглянути відео на YouTube
                      </button>
                    </Tabs.Item>
                  )}
                </Tabs>
              </div>

              {/* Схожі товари після Tabs */}
              <div className="mt-6 w-full">
                <h3 className="text-lg font-semibold text-[#0061AA] mb-4">
                  Схожі товари
                </h3>

                {relatedProducts && relatedProducts.length > 0 ? (
                  <div className="relative w-full h-auto max-w-[900px] mx-auto py-1 ">
                    {/* Контейнер для скролу */}
                    <div
                      id="related-scroll"
                      className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-5 py-1"
                      ref={scrollContainer}
                    >
                      {relatedProducts.map((el) => {
                        const category = el.tags?.[0]?.name || "default-category";
                        const imageSrc = el.images?.[0]?.src || "/placeholder.png";

                        return (
                          <Link
                            key={el.id}
                            href={`/catalog/sub-catalog/product/${el.id}?category=${category}`}
                            className="w-[140px] flex-shrink-0 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col bg-white"
                          >
                            <div className="w-full h-[200px] flex items-center justify-center overflow-hidden px-1">
                              <Image
                                width={140}
                                height={140}
                                src={imageSrc}
                                alt={el.name}
                                className="object-contain w-full h-full p-1"
                              />
                            </div>
                            <div className="p-3 flex-grow flex items-center justify-center">
                              <p className="text-center text-sm font-normal text-[#0061AA] line-clamp-3 hover:text-[#004a80] transition-colors">
                                {el.name}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Кнопка "←" */}
                    <button
                      onClick={() => {
                        const container = document.getElementById("related-scroll");
                        if (container) container.scrollBy({ left: -300, behavior: "smooth" });
                      }}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
                    >
                      ←
                    </button>

                    {/* Кнопка "→" */}
                    <button
                      onClick={() => {
                        const container = document.getElementById("related-scroll");
                        if (container) container.scrollBy({ left: 300, behavior: "smooth" });
                      }}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
                    >
                      →
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Схожих товарів немає</p>
                )}

              </div>



              {/* Модальне вікно зображення */}
              {isModalOpen && (
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeModal}
                >
                  <motion.div
                    className={classNames(
                      "relative bg-white rounded-xl overflow-hidden flex items-center justify-center",
                      isMobile ? "w-[95vw] h-[90vh]" : "w-[600px] h-[600px]"
                    )}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Image
                      src={details.images?.[selectedImage]?.src || "/placeholder.png"}
                      alt={details.images?.[selectedImage]?.alt || details.name || ""}
                      fill
                      className="object-contain bg-white"
                      sizes="(max-width: 768px) 100vw, 600px"
                      unoptimized
                    />

                    <button
                      onClick={closeModal}
                      className="absolute top-3 right-3 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition"
                    >
                      ✕
                    </button>

                    {details.images?.length > 1 && (
                      <>
                        {selectedImage > 0 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              prevImage();
                            }}
                            className="absolute bottom-3 left-3 text-white bg-black/40 hover:bg-black/70 rounded-full p-3 transition"
                          >
                            ←
                          </button>
                        )}
                        {selectedImage < details.images?.length - 1 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              nextImage();
                            }}
                            className="absolute bottom-3 right-3 text-white bg-black/40 hover:bg-black/70 rounded-full p-3 transition"
                          >
                            →
                          </button>
                        )}
                      </>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
