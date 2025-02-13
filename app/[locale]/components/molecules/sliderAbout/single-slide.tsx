import { ArticleSingleTypeAbout } from "./image-data";
import { FC } from "react";
import "./styleAbout.css";

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
    <div className="flex items-center self-center justify-center w-full h-full max-w-[1360px] bg-red-500 z-50">
      <motion.img
        src={img1}
        width={1200}
        height={900}
        alt=""
        className="image pointer-events-none absolute p-5"
        initial={{ ...animatedStylesForPhoto1.initial }}
        animate={{ ...animatedStylesForPhoto1.animate }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      {/* position: static;
position: relative;
position: absolute;
position: fixed;
position: sticky; */}
    </div>
  );
};

export default SingleSlideAbout;
