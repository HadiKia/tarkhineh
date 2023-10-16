import React from "react";

// icons
const rectangleIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
    <rect
      width="14"
      height="14"
      x=".414"
      y="10"
      stroke="#417F56"
      stroke-width="2"
      rx="3"
      transform="rotate(-45 .414 10)"
    />
  </svg>
);

const OptionItem = ({ title }) => {
  return (
    <div className="flex items-center gap-x-1 text-[11px] mb-2 md:gap-x-2 md:mb-4 md:text-base">
      <span className="scale-75 md:scale-100">{rectangleIcon}</span>
      <span>{title}</span>
    </div>
  );
};

export default OptionItem;
