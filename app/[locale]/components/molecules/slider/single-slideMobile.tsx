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
    x: "55%",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
};

const animatedStylesForPhoto1 = {
  initial: {
    x: "-95%",
    opacity: 0,
  },
  animate: {
    x: "-55%",
    opacity: 1,
  },
};

const animatedStylesForPhoto2 = {
  initial: {
    x: "30%",
    opacity: 0,
  },
  animate: {
    x: "100%",
    opacity: 1,
  },
};

const SingleSlideMobile: FC<ArticleSingleType> = ({
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
        width={210}
        height={120}
        className="pointer-events-none absolute left-1/2 top-10 transform -translate-x-1/2"
        initial={{ ...animatedStylesForPhoto1.initial }}
        animate={{ ...animatedStylesForPhoto1.animate }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <motion.img
        src={img2}
        alt=""
        width={200}
        height={200}
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
          <div className="mt-5 ml-2 w-1/2 flex-wrap text-xl">{title}</div>
        </motion.div>
        <motion.div
          className="pointer-events-none"
          initial={{ ...animatedStyles.initial }}
          animate={{ ...animatedStyles.animate }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ fontSize: 20 }}
        >
          <div className="mt-5 ml-3 w-1/2 text-lg leading-5">{description}</div>
        </motion.div>
      </div>
        <motion.a
          href={link}
          className="singleLink"
          initial={{ ...animatedStylesForButton.initial }}
          animate={{ ...animatedStylesForButton.animate }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ fontSize: 16 }}
        > {more}
        </motion.a>
      
    </div>
  );
};

export default SingleSlideMobile;
