import * as React from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";

import "./style.css";
import {ArticleSingleTypeAbout, articlesUa, articlesEng} from "./image-data";
import SingleSlideAbout from "./single-slide";

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

  const [articles, setArticles] = useState<ArticleSingleTypeAbout[]>([])
  const [[page, direction], setPage] = useState([0, 0]);
  const index = wrap(0, articles .length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

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
  }, [page]);

  return (
    <div className="example-container">
      <AnimatePresence initial={true} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute flex h-[460px] w-full"
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
          <SingleSlideAbout {...currentArticle} />
        </motion.div>
      </AnimatePresence>

      <div className="next" onClick={() => paginate(1)}>
        {">"}
      </div>
      <div className="prev" onClick={() => paginate(-1)}>
        {">"}
      </div>
      
      <div className="flex justify-center mt-4">
        {articles.map((_, i) => (
          <div
            key={i}
            className={`z-10 mt-[520px] h-2 w-2 rounded-full mx-2 cursor-pointer ${i === index ? 'bg-blue-500' : 'bg-gray-300'}`}
            onClick={() => goToSlide(i)}
          ></div>
        ))}
      </div>
    </div>
  );
}
