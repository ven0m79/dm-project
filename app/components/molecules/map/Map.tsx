import React from "react";

import { Map_Data } from "../mapUkraine/map-data";

const MapOfUkraine = () => {
  return (
    <svg width="700px" height="480px" viewBox="0 0 700 480">
      {Map_Data.map((el, i) => (
        <path key={i} d={el.path} fill="orange" />
      ))}
    </svg>
  );
};

export default MapOfUkraine;
