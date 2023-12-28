import { ArticleSingleType } from "./image-data";
import { FC } from "react";
import "./style.css";

import { motion } from "framer-motion";

const animatedStyles = {
  initial: {
    x: "-40%",
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
        alt="Test1"
        width={400}
        height={400}
        className="pointer-events-none absolute right-4 top-5"
      />

      <motion.img
        src={img2}
        alt="Test2"
        width={448}
        height={448}
        className="pointer-events-none absolute left-4 top-5"
      />

      <li className="pointer-events-none">
        <motion.p
          className="pointer-events-none"
          initial={{ ...animatedStyles.initial }}
          animate={{ ...animatedStyles.animate }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ fontSize: 70 }}
        >
          {description}
        </motion.p>

        {/* <p className="pointer-events-none">{title}</p>
        <p className="pointer-events-none">{description}</p> */}
      </li>
    </div>
  );
};

export default SingleSlide;
