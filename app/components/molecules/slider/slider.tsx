import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { keyframes, wrap } from "popmotion";
import  articles from "./image-data";
import SingleSlide from "./single-slide";

import "./style.css";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function Example() 
{
  const [[page, direction], setPage] = useState([0, 0]);
  // const imageIndex = wrap(0, articles.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
          
      <AnimatePresence initial={false} custom={direction}>
            <div className="example-container">
                {Object.keys(articles).map((el) => 
                <SingleSlide key={el} {...articles} />)}
            </div>
        
      </AnimatePresence>
      <div className="next" onClick={() => paginate(1)}>
        {"‣"}
      </div>
      <div className="prev" onClick={() => paginate(-1)}>
        {"‣"}
      </div>
    </>
  );
};
