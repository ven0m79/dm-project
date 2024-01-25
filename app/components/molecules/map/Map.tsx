import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";

import SingleRegion from "@molecules/map/single-region";

import { Map_Data, MapProps } from "../mapUkraine/map-data";
import classes from "./Map.module.css";

const MapOfUkraine = () => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [coords, setCoords] = useState<{ x: number; y: number } | undefined>();
  const [hoveredItem, setHoveredItem] = useState<MapProps | null>(null);

  const mouseMoveHandler = useCallback((e: any) => {
    if (e.target.tagName !== "path") {
      setIsHovering(false);

      setCoords({
        x: e.offsetX + 5,
        y: e.offsetY - 475,
      });

      return;
    }

    if (e.target.tagName === "path") {
      setIsHovering(true);

      setCoords({
        x: e.offsetX + 5,
        y: e.offsetY - 475,
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveHandler as any);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler as any);
    };
  }, [isHovering, mouseMoveHandler]);

  return (
    <div className="relative">
      <motion.svg
        width="700px"
        height="480px"
        viewBox="0.6875 0.6875 700 480"
        onHoverStart={() => {
          setIsHovering(true);
        }}
        onHoverEnd={() => {
          setIsHovering(false);
        }}
      >
        {Map_Data.map((el) => (
          <SingleRegion key={el.id} {...el} setHoveredItem={setHoveredItem} />
        ))}
      </motion.svg>

      <AnimatePresence>
        {isHovering && coords && coords?.x && coords?.y ? (
          <>
            <motion.foreignObject
              className="absolute pointer-events-none opacity-70"
              animate={{
                x: coords?.x,
                y: coords?.y,
              }}
              initial={false}
              transition={{ type: "spring", stiffness: 70 }}
            >
              <div
                className={classNames(
                  "flex items-center justify-center",
                  classes["info-section"],
                )}
              >
                <h1>{hoveredItem?.name}</h1>
              </div>
            </motion.foreignObject>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default MapOfUkraine;
