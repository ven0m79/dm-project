import * as React from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";

import "./styleAbout.css";
import { ArticleSingleTypeAbout, articlesUa, articlesEng } from "./image-data";
import SingleSlideAbout from "./single-slide";
import { useIsMobile } from "../../hooks/useIsMobile";

const variants = {
  enter: {
    opacity: 0,
  },
  center: {
    zIndex: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.8,
    },
  },
};

export default function SliderAbout({ locale }: { locale: string }) {
  const isMobile = useIsMobile();
  const [containerHeight, setContainerHeight] = useState<number>(800);
  const [articles, setArticles] = useState<ArticleSingleTypeAbout[]>([]);
  const [[page, direction], setPage] = useState([0, 0]);
  const index = wrap(0, articles.length, page);

const paginate = React.useCallback((newDirection: number) => {
  setPage(([currentPage]) => [currentPage + newDirection, newDirection]);
}, []);

  const goToSlide = (index: number) => {
    setPage([index, 0]);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const currentArticle = React.useMemo(() => {
    return articles[index];
  }, [articles, index]);

  useEffect(() => {
    if (locale === "ua") {
      setArticles(Object.values(articlesUa));
    }
    if (locale === "en") {
      setArticles(Object.values(articlesEng));
    }
  }, [locale]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      paginate(1);
    }, 3500);

    return () => clearInterval(intervalId);
  }, [page, paginate]);

  return (
    <div className="w-screen flex justify-center px-1">
      <div className="container z-10" style={{ height: isMobile ? 250 : containerHeight }}>
        <AnimatePresence initial={true} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="center"
            animate="center"
            exit="exit"
            className="h-auto w-auto z-49"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            <SingleSlideAbout
              {...currentArticle}
              setContainerHeight={setContainerHeight}

            />
          </motion.div>
          <div className="next1" onClick={() => paginate(1)}>
            {">"}
          </div>
          <div className="prev1" onClick={() => paginate(-1)}>
            {">"}
          </div>
        </AnimatePresence>

        <div className="absolute bottom-5 w-screen px-6">
          <div className="flex justify-center">
            {articles.map((_, i) => (
              <div
                key={i}
                className={`z-40 h-2 w-2 rounded-full mx-1 cursor-pointer ${i === index ? "bg-blue-500" : "bg-gray-300"}`}
                onClick={() => goToSlide(i)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
