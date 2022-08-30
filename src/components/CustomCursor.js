import React from "react";

const CustomCursor = ({ top, left }) => {
  const cursorStyle = {
    top: top + "px",
    left: left + "px",
    height: "30px",
    width: "30px",
  };

  return <div className="cursor-outer" style={cursorStyle}></div>;
};

export default CustomCursor;
