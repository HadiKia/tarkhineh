import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";

import { rating, ratingDesktop } from "./Food";

// functions
import { convertToFa } from "../helper/functions";

// icons
import {
  arrowRightIcon,
  shoppingCartDesktopIcon,
  likeDesktopIcon,
} from "../../icons/foodsPageIcons";

// styles
const topBarStyle = "container max-w-[1224px] mx-auto h-14 text-white flex items-center px-5 mb-4 md:mb-8";
const topBarTitleStyle = "font-bold flex-1 text-center pl-10 text-xl";
const mainStyle = "container max-w-[1224px] mx-auto px-5 text-[#353535] md:flex md:gap-x-4"
const imgStyle = "w-full h-[205px] rounded-lg mb-[17px] md:w-[350px] md:h-[220px] lg:w-[450px] lg:h-[320px]"
const mainHeaderStyle = "flex items-center justify-between mb-[17px] px-0.5"
const mainHeaderH3Style = "font-bold text-lg md:text-2xl"
const mainHeaderButtonsBoxStyle = "flex items-center gap-x-4 text-[#717171]"
const FoodDetailsStyle = "border border-[#CBCBCB] rounded-lg py-2 px-2.5 font-medium md:pb-3"
const FoodDetailsContentsStyle = "mb-1 text-[15px] md:text-base lg:text-lg"
const descriptionStyle = "text-[11px] text-[#717171] pr-1 leading-5 md:leading-6 md:text-xs lg:text-sm"
const ratingDivStyle = "flex items-center justify-between py-2 border-y border-[#CBCBCB] my-1.5 text-[15px] md:my-2 md:text-base lg:text-lg lg:my-3"
const discountedDivStyle = "flex items-center justify-between text-[15px] md:text-base lg:text-lg"

const FoodDetails = () => {
  const { slug } = useParams();
  const products = useSelector((state) => state.productsState.products);
  const product = products.find((item) => item.slug === slug);
  const { title, discountedPrice, description, image } = product;
  const navigate = useNavigate();
  const [isActive2, setIsActive2] = useState(false);

  const likeDesktopClick = () => {
    setIsActive2((current2) => !current2);
  };

  useEffect(() => {
    document.title = product.title;
  }, []);

  return (
    <div className="h-screen">
      <div className="bg-[#417F56]">
        <div className={topBarStyle}>
          <span onClick={() => navigate(-1)}>{arrowRightIcon}</span>
          <h3 className={topBarTitleStyle}>جزئیات محصول</h3>
        </div>
      </div>
      <div className={mainStyle}>
        <img
          src={image}
          alt={title}
          className={imgStyle}
        />
        <div className="md:flex-1">
          <div className={mainHeaderStyle}>
            <h3 className={mainHeaderH3Style}>{title}</h3>
            <div className={mainHeaderButtonsBoxStyle}>
              <button
                className={isActive2 ? ` text-[#C30000]` : ` text-[#717171] `}
                onClick={likeDesktopClick}
              >
                {likeDesktopIcon}
              </button>
              <span>{shoppingCartDesktopIcon}</span>
            </div>
          </div>
          <div className={FoodDetailsStyle}>
            <p className={FoodDetailsContentsStyle}>محتویات</p>
            <p className={descriptionStyle}>
              {description}
            </p>
            <div className={ratingDivStyle}>
              <span>امتیاز</span>
              <div className="lg:hidden">
                <ReactStars {...rating} />
              </div>
              <div className="hidden lg:block">
                <ReactStars {...ratingDesktop} />
              </div>
            </div>
            <div className={discountedDivStyle}>
              <span>قیمت</span>
              <span>{convertToFa(discountedPrice)} تومان</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
