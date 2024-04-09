import React from "react";

const Loading = () => {
  return (
    <div className="bg-white flex flex-1 min-h-svh min-w-svh min-w-full justify-center items-center">
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
