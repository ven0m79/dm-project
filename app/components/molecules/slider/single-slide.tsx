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
    x: "-15%",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
};

const animatedStylesForPhoto2 = {
  initial: {
    x: "40%",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
};

const SingleSlide: FC<ArticleSingleType> = ({
  img1,
  img2,
  description,
  link,
  title,
}) => {
  return (
    <div>
      <motion.img
        src={img1}
        alt=""
        width={524}
        height={300}
        className="pointer-events-none absolute left-96 top-14"
        initial={{ ...animatedStylesForPhoto1.initial }}
        animate={{ ...animatedStylesForPhoto1.animate }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <motion.img
        src={img2}
        alt=""
        width={245}
        height={400}
        className="pointer-events-none absolute right-52 top-5"
        initial={{ ...animatedStylesForPhoto2.initial }}
        animate={{ ...animatedStylesForPhoto2.animate }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      <li className="pointer-events-none">
        <motion.p
          className="pointer-events-none"
          initial={{ ...animatedStyles.initial }}
          animate={{ ...animatedStyles.animate }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ fontSize: 50 }}
        >
          <div className="mt-10 mx-32 w-screen">{title}</div>
        </motion.p>
        <motion.p
          className="pointer-events-none"
          initial={{ ...animatedStyles.initial }}
          animate={{ ...animatedStyles.animate }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ fontSize: 20 }}
        >
          <div className="mt-8 mx-32 w-1/4">{description}</div>
        </motion.p>
      </li>
        <motion.a
          href={link}
          className="singleLink"
          initial={{ ...animatedStylesForButton.initial }}
          animate={{ ...animatedStylesForButton.animate }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ fontSize: 20 }}
        > Перейти в розділ
            
          
        </motion.a>
      
    </div>
  );
};

export default SingleSlide;
