import React from "react";
import { useDispatch } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { ratingDesktop } from "../menu/Food";

// Actions
import { removeItem, decrease, increase } from "../redux/cart/cartAction";

// Function
import { convertToFa } from "../helper/functions";

// Icons
import { trashIcon, trashDesktopIcon } from "../../icons/shopCartIcons";

// Styles
const boxStyle =
  "flex items-center justify-between py-2 px-2 md:border md:border-[#CBCBCB] md:rounded-lg md:mb-4 md:p-0 md:overflow-hidden md:gap-x-8 md:items-start md:relative";
const imgStyle = "hidden md:block  w-full max-w-[169px] h-[158px]";
const titleStyle =
  "text-[#353535] text-xs sm:text-sm mb-1 md:font-semibold md:text-xl md:mb-3 lg:mb-2 xl:mb-3";
const descriptionStyle = "hidden md:block text-[15px] md:pl-7 xl:pl-8";
const discountedPriceStyle =
  "text-[#717171] text-xs flex items-center gap-x-1 md:absolute md:left-8 md:bottom-[18px] md:text-[#353535] md:text-lg md:font-medium xl:text-xl";
const quantityDivStyle =
  "text-[#417F56] bg-[#E5F2E9] py-1 px-[4.5px] rounded flex items-center gap-x-2 md:absolute md:bottom-[18px] md:left-[250px] lg:left-[150px] xl:left-[250px]";
const trashButtonStyle = "hidden md:block absolute left-8 top-[22px]";
const starsDivStyle =
  "hidden md:block absolute bottom-[22px] left-[352px] lg:left-[215px] xl:left-[365px]";

const Cart = (props) => {
  const dispatch = useDispatch();

  const { title, discountedPrice, quantity, image, description } = props.data;

  return (
    <div className={boxStyle}>
      <img src={image} alt={title} className={imgStyle} />

      <div className="md:w-full md:pt-[22px]">
        <h3 className={titleStyle}>{title}</h3>
        <p className={descriptionStyle}>{description}</p>
        <div className={discountedPriceStyle}>
          <span>{convertToFa(discountedPrice)}</span>
          <span>تومان</span>
        </div>
      </div>

      <div className={quantityDivStyle}>
        <button onClick={() => dispatch(increase(props.data))}>+</button>
        <span>{convertToFa(quantity)}</span>
        {quantity > 1 ? (
          <button onClick={() => dispatch(decrease(props.data))}>-</button>
        ) : (
          <button onClick={() => dispatch(removeItem(props.data))}>
            {trashIcon}
          </button>
        )}
      </div>

      <button
        onClick={() => dispatch(removeItem(props.data))}
        className={trashButtonStyle}
      >
        {trashDesktopIcon}
      </button>

      <div className={starsDivStyle}>
        <ReactStars {...ratingDesktop} />
      </div>
    </div>
  );
};

export default Cart;
