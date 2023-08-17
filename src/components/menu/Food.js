import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";

// functions
import { convertToFa } from "../helper/functions";

// icons
import { likeIcon, starIcon, starEmptyIcon } from "../../icons/foodsPageIcons";

// styles
const foodBoxStyle =
  "mx-5 flex items-center justify-between border border-[#CBCBCB] rounded-md h-[6.25em]";
const foodImgStyle = "w-[5.75em] h-[6.25em]";
const headerDivStyle = "flex items-center justify-between text-xs mb-2";
const titleStyle = "text-[#353535] text-[12.5px] font-medium";
const priceDivStyle = "flex items-center gap-x-2";
const priceStyle = "text-[#ADADAD] line-through";
const offerStyle =
  "bg-[#FFF2F2] text-[#C30000] py-[2px] px-[6px] rounded-[10px] font-medium";
const containerDivStyle =
  "flex items-center justify-between text-xs font-medium text-[#353535] mb-1";
const descriptionStyle = "text-[10.25px]";
const discountedDivStyle = "flex items-center gap-x-2 font-medium";
const footerDivStyle = "flex items-center justify-between";
const ratingDivStyle = "flex items-center gap-x-1";
const buttonStyle =
  "bg-[#417F56] text-white rounded-md text-[10px] py-2.5 px-2.5 font-medium";

const rating = {
  count: 5,
  value: 4,
  emptyIcon: <span>{starEmptyIcon}</span>,
  filledIcon: <span>{starIcon}</span>,
};

const Food = ({ productData }) => {
  const [isActive, setIsActive] = useState(false);
  const { title, price, offer, discountedPrice, description, image } =
    productData;

  const likeClick = () => {
    setIsActive((current) => !current);
  };

  return (
    <div className={foodBoxStyle}>
      <img src={image} alt={title} className={foodImgStyle} />
      <div className="p-2 flex-1">
        <div className={headerDivStyle}>
          <span className={titleStyle}>{title}</span>
          <div className={priceDivStyle}>
            <span className={priceStyle}>{convertToFa(price)}</span>
            <span className={offerStyle}>%{convertToFa(offer)}</span>
          </div>
        </div>

        <div className={containerDivStyle}>
          <span className={descriptionStyle}>
            {description.slice(0, 25)}...
          </span>
          <div className={discountedDivStyle}>
            <span>{convertToFa(discountedPrice)}</span>
            <span>تومان</span>
          </div>
        </div>

        <div className={footerDivStyle}>
          <div className={ratingDivStyle}>
            <button
              className={isActive ? " text-[#C30000]" : "text-[#717171]"}
              onClick={likeClick}
            >
              {likeIcon}
            </button>
            <ReactStars {...rating} />
          </div>
          <button className={buttonStyle}>افزودن به سبد خرید</button>
        </div>
      </div>
    </div>
  );
};

export default Food;
