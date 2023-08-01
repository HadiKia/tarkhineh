import React from "react";

// styles
const boxStyle = 'relative flex flex-col items-center justify-center mx-2 xl:w-[16em] xl:mx-5'
const imgStyle = 'w-[7.5em] absolute top-0 md:w-[9em] lg:w-[12em] xl:w-[14.5em]'
const bgStyle = 'w-[9.5em] h-[5em] bg-[#417F56] mt-[3.5em] shadow-lg rounded-md md:rounded-lg md:w-[10.5em] md:h-[7em] lg:w-[14.5em] lg:h-[8em] lg:mt-[6em] xl:w-[16.75em] xl:h-[9.5em]'
const buttonStyle = 'py-1.5 px-5 bg-white text-[#353535] text-sm rounded-md absolute -bottom-5 shadow-lg md:py-2.5 md:px-6 lg:text-lg lg:px-7 xl:-bottom-8'


const HomePageMenuItem = ({image, title}) => {
  return (
    <div className={boxStyle}>
      <img src={image} alt="img" className={imgStyle} />
      <div className={bgStyle}></div>
      <button className={buttonStyle}>{title}</button>
    </div>
  );
};

export default HomePageMenuItem;
