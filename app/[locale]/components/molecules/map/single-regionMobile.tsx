import { motion } from "framer-motion";
import React, { FC } from "react";

import { MapProps } from "@app/[locale]/components/molecules/map/map-data";

import classes from "./Map.module.css";
import { easeOut } from "popmotion";
import classNames from "classnames";

{
  /*  "hover:fill-sky-900 hover:transition duration-500 hover:ease-out active:transition-shadow before:transition before:ease-out z-0"*/
}

const SingleRegionMobile: FC<
MapProps & { setSelectedItem: (val: MapProps) => void }
> = ({ setSelectedItem, ...props }) => {
  return (
    <>
      <motion.path
        className={classNames("duration-1000 ease-out", classes["custom-path"])}
        d={props.path}
        fill="#0060aa91"
        stroke="#ffffff"
        strokeWidth={1}
        transform="matrix(0.6944,0,0,0.6944,0,0)"
        onClick={() => {
          setSelectedItem(props)}}
      />

      <circle
        fill="#ffff00"
        stroke="#ffffff"
        cx={props.city.xCoord}
        cy={props.city.yCoord}
        className="pointer-events-none"
        r={props.id === 0 ? 5.5 : 3.5}
      />
    </>
  );
};


export default SingleRegionMobile;
