import React from "react";

import { Map_Data } from "../mapUkraine/map-data";
import "./Map.module.css";

const MapOfUkraine = () => {
  return (
    <svg width="700px" height="480px" viewBox="0.6875 0.6875 700 480">
      {Map_Data.map((el, i) => (
        <path
          className='hover:fill-sky-900 hover:transition duration-500 hover:ease-out active:transition-shadow before:transition before:ease-out'
          key={i}
          d={el.path}
          fill="#0060aa91"
          stroke="#ffffff"
          stroke-width={1}
          transform="matrix(0.6944,0,0,0.6944,0,0)"
          
          /* style={{
            transform:
              el.id === 13 || el.id === 15
                ? "translate(-3.36%, 2.4%)"
                : undefined,
          }}*/
          
        />
      ))}
      {Map_Data.map((el, i) => (
        <circle
          key={i}
          cx={el.city.xCoord}
          cy={el.city.yCoord}
          r={el.id === 0 ? 5.5 : 3.5}
          fill="#ffff00"
          stroke="#ffffff"
          stroke-width={1}
        />
      ))}
      
    </svg>
  );
};

export default MapOfUkraine;
