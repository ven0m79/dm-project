import React from "react";

const Loading = () => {
  return (
    <div className="bg-whiteflex flex-1 w-full h-[600px] justify-center items-center">
    <div className="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    </div>
  );
};

export default Loading;
