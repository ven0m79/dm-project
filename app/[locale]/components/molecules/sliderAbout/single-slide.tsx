import { ArticleSingleTypeAbout } from "./image-data";
import { FC, useCallback, useEffect, useRef } from "react";
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

const SingleSlideAbout: FC<
  ArticleSingleTypeAbout & { setContainerHeight?: (val: number) => void }
> = ({ img1, setContainerHeight }) => {
  const ref = useRef<HTMLImageElement>(null);

  const heightChangeHandler = useCallback(() => {
    if (setContainerHeight) {
      const container = ref.current?.getBoundingClientRect();
      setContainerHeight(container?.height || 800);
    }
  }, [setContainerHeight]);

  useEffect(() => {
    window.addEventListener("resize", heightChangeHandler);

    return () => {
      window.removeEventListener("resize", heightChangeHandler);
    };
  }, [heightChangeHandler]);

  return (
    <div className="flex items-center self-center justify-center w-full h-full max-w-[1360px] bg-red-500 z-9">
      <motion.img
        alt=""
        ref={ref}
        src={img1}
        width={1200}
        height={900}
        className="image pointer-events-none absolute"
        initial={{ ...animatedStylesForPhoto1.initial }}
        animate={{ ...animatedStylesForPhoto1.animate }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  );
};

export default SingleSlideAbout;
