import React from "react";

const Skeleton: React.FC<{ height?: number | string; width?: number | string; className?: string }> = ({ height = 24, width = "100%", className = "" }) => (
  <div
    className={`animate-pulse bg-gray-300 rounded ${className}`}
    style={{ height, width }}
  />
);

export default Skeleton;
