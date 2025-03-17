import { ArticleSingleType } from "./image-data";
import { FC } from "react";
import "./style.css";

import { motion } from "framer-motion";

const animatedStyles = {
  initial: {
    x: "15%",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
};

const animatedStylesForButton = {
  initial: {
    x: "75%",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
};

const animatedStylesForPhoto1 = {
  initial: {
    x: "-55%",
    opacity: 0,
  },
  animate: {
    x: "25%",
    opacity: 1,
  },
};

const animatedStylesForPhoto2 = {
  initial: {
    x: "60%",
    opacity: 0,
  },
  animate: {
    x: "30%",
    opacity: 1,
  },
};

const SingleSlide: FC<ArticleSingleType> = ({
  img1,
  img2,
  description,
  link,
  title,
  more,
}) => {
  return (
    <div>
      <motion.img
        src={img1}
        alt=""
        width={393}
        height={225}
        className="pointer-events-none absolute left-96 top-24"
        initial={{ ...animatedStylesForPhoto1.initial }}
        animate={{ ...animatedStylesForPhoto1.animate }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <motion.img
        src={img2}
        alt=""
        width={400}
        height={400}
        className="pointer-events-none absolute right-52 top-5"
        initial={{ ...animatedStylesForPhoto2.initial }}
        animate={{ ...animatedStylesForPhoto2.animate }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      <div className="pointer-events-none text-slate-950">
        <motion.div
          className="pointer-events-none"
          initial={{ ...animatedStyles.initial }}
          animate={{ ...animatedStyles.animate }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ fontSize: 40 }}
        >
          <div className="mt-10 mx-32 w-1/2 flex-wrap">{title}</div>
        </motion.div>
        <motion.div
          className="pointer-events-none"
          initial={{ ...animatedStyles.initial }}
          animate={{ ...animatedStyles.animate }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ fontSize: 20 }}
        >
          <div className="mt-8 mx-32 w-1/4">{description}</div>
        </motion.div>
      </div>
        <motion.a
          href={link}
          className="singleLink"
          initial={{ ...animatedStylesForButton.initial }}
          animate={{ ...animatedStylesForButton.animate }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ fontSize: 20 }}
        > {more}
        </motion.a>
      
    </div>
  );
};

export default SingleSlide;
