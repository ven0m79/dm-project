import { ArticleSingleTypeAbout } from "./image-data";
import { FC } from "react";
import "./style.css";

import { motion } from "framer-motion";

const animatedStylesForPhoto1 = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

const SingleSlideAbout: FC<ArticleSingleTypeAbout> = ({
  img1,
}) => {
  return (
    <div className="flex items-center self-center justify-center w-full">
      <motion.img
        src={img1}
        alt=""
        width={900}
        height={600}
        className="pointer-events-none absolute top--1"
        initial={{ ...animatedStylesForPhoto1.initial }}
        animate={{ ...animatedStylesForPhoto1.animate }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
    </div>
  );
};

export default SingleSlideAbout;
