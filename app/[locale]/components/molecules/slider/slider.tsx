import * as React from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";

import "./style.css";
import {ArticleSingleType, articlesUa, articlesEng} from "./image-data";
import SingleSlide from "./single-slide";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};


export default function Slider({ locale }: { locale: string }) {

  const [articles, setArticles] = useState<ArticleSingleType[]>([])
  const [[page, direction], setPage] = useState([0, 0]);
  const index = wrap(0, articles .length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
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
          className="left absolute left-0 right-0 flex h-[460px] w-full"
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
          <SingleSlide {...currentArticle} />
        </motion.div>
      </AnimatePresence>

      <div className="next" onClick={() => paginate(1)}>
        {">"}
      </div>
      <div className="prev" onClick={() => paginate(-1)}>
        {">"}
      </div>
    </div>
  );
}
