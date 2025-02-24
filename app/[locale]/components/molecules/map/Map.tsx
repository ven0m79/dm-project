import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";

import SingleRegion from "@app/[locale]/components/molecules/map/single-region";
import SingleRegionMobile from "@app/[locale]/components/molecules/map/single-regionMobile";

import { Map_Data_Eng, Map_Data_Ukr, MapProps } from "./map-data";
import classes from "./Map.module.css";
import { useIsMobile } from "../../hooks/useIsMobile";

const MapOfUkraine = ({ locale }: { locale: string }) => {
  const [selectedMapData, setSelectedMapData] = useState<MapProps[]>([]);
  const [selectedItem, setSelectedItem] = useState<MapProps | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [coords, setCoords] = useState<{ x: number; y: number } | undefined>();
  const [hoveredItem, setHoveredItem] = useState<MapProps | null>(null);
  const isMobile = useIsMobile();

  const mouseMoveHandler = useCallback((e: any) => {
    if (e.target.tagName !== "path") {
      setIsHovering(false);

      setCoords({
        x: e.offsetX - 170,
        y: e.offsetY - 5,
      });

      return;
    }

    if (e.target.tagName === "path") {
      setIsHovering(true);

      setCoords({
        x: e.offsetX - 170,
        y: e.offsetY - 5,
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveHandler as any);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler as any);
    };
  }, [isHovering, mouseMoveHandler]);

  useEffect(() => {
    if (locale === "ua") {
      setSelectedMapData(Map_Data_Ukr);
    }
    if (locale === "en") {
      setSelectedMapData(Map_Data_Eng);
    }
  }, [locale]);

  return (
    <>{isMobile ?
      <div className="relative w-screen flex justify-center flex-col px-2">
        <><motion.svg
          width="100%"
          height="auto"
          viewBox="0.6875 0.6875 700 480"
        >
          {selectedMapData.map((el: any) => {
            return (

              <SingleRegionMobile key={el.id} {...el} setSelectedItem={setSelectedItem} />
            );
          })}
        </motion.svg>
          {selectedItem && (
            <div
              className={classNames(
                "mt-4 p-2 w-full max-w-full bg-gray-900 rounded-lg shadow-md text-center",
                classes["info-section"]
              )}
            >
              <h3 className="text-lg font-bold">{selectedItem.name}</h3>
              <p className="text-sm text-gray-100">
                {selectedItem.description || "Нет данных"}
              </p>
            </div>
          )}</>
      </div>

      :

      <div className="relative w-full flex justify-center">
        <><motion.svg
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
          {selectedMapData.map((el: any) => {
            return (
              <SingleRegion key={el.id} {...el} setHoveredItem={setHoveredItem} />
            );
          })}
        </motion.svg><AnimatePresence>
            {isHovering && coords && coords?.x && coords?.y ? (
              <>
                <motion.foreignObject
                  className="absolute pointer-events-none opacity-80"
                  animate={{
                    x: coords?.x,
                    y: coords?.y,
                  }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 70 }}
                >
                  <div
                    className={classNames(
                      "flex flex-col items-center justify-center",
                      classes["info-section"]
                    )}
                  >
                    {hoveredItem?.name}
                    <div
                      className={classNames(
                        "items-center justify-center",
                        classes["info-section-description"]
                      )}
                    >
                      {hoveredItem?.description}
                    </div>
                  </div>
                </motion.foreignObject>
              </>
            ) : null}
          </AnimatePresence></>
      </div>
    }
    </>
  );
};

export default MapOfUkraine;
