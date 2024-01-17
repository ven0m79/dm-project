import React from "react";

import { Map_Data } from "../mapUkraine/map-data";

const MapOfUkraine = () => {
  return (
    <svg width="700px" height="480px" viewBox="0 0 700 480">
      {Map_Data.map((el, i) => (
        <path
          key={i}
          d={el.path}
          fill="orange"
          style={{
            transform:
              el.id === 12 || el.id === 13 || el.id === 15
                ? "translate(-3.36%, 2.4%)"
                : undefined,
          }}
        />
      ))}
    </svg>
  );
};

export default MapOfUkraine;
