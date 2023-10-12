import React from "react";
import { Link } from "react-router-dom";
import emptyPage from "../../images/empty-page.svg";

// Styles
export const containerStyle =
  "relative min-h-[calc(100vh_-_365px)] border border-[#CBCBCB] rounded-lg  flex items-center justify-center md:min-h-[calc(100vh_-_442px)]";
export const imgBoxStyle =
  "bg-[image:var(--image-url)] bg-cover bg-center w-[200px] h-[193px] flex items-center justify-center md:w-[325px] md:h-[313px]";
export const pStyle =
  "text-xs absolute left-0 right-0 top-[48.75%] text-center font-medium text-[#717171] md:text-xl";
export const linkStyle =
  "border border-[#417F56] text-[#417F56] bg-white px-[41px] py-[7px] text-xs rounded relative top-11 md:font-medium md:text-[17px] md:px-[43px] md:py-[11px] md:top-[70px]";

const EmptyShoppingCart = () => {
  return (
    <div className={containerStyle}>
      <div
        style={{ "--image-url": `url(${emptyPage})` }}
        className={imgBoxStyle}
      >
        <p className={pStyle}>شما هنوز هیچ محصولی انتخاب نکرده‌اید!</p>
        <Link to="/menu" className={linkStyle}>
          منوی رستوران
        </Link>
      </div>
    </div>
  );
};

export default EmptyShoppingCart;
