import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// functions
import { convertToFa, isInCart, isInFavorite } from "../helper/functions";

// Actions
import { dislikeItem } from "../redux/favorite/favoriteAction";

// icons
import {
  likeIcon,
  starIcon,
  starEmptyIcon,
  starDesktopIcon,
  starEmptyDesktopIcon,
} from "../../icons/foodsPageIcons";
import { closeIcon } from "../../icons/mobileMenuIcons";

// styles
const foodBoxStyle =
  "flex items-center justify-between border border-[#CBCBCB] rounded-md h-[6.25em] lg:h-[9.875em] lg:rounded-lg lg:relative";
const foodImgStyle = "w-[5.75em] h-[6.25em] lg:w-[10.563em] lg:h-[9.875em]";
const headerDivStyle =
  "flex items-center justify-between text-xs sm:mb-2 lg:mb-3";
const titleStyle =
  "text-[#353535] sm:text-[12.5px] font-medium lg:text-lg lg:font-bold lg:mt-1";
const priceDivStyle =
  "flex flex-col-reverse sm:flex-row items-center sm:gap-x-2 lg:relative lg:top-9";
const priceStyle = "text-[#ADADAD] line-through lg:text-[15px] ";
const offerStyle =
  "bg-[#FFF2F2] text-[#C30000] py-[2px] px-[6px] text-[9px] sm:text-xs rounded-[10px] font-medium lg:text-xs ";
const containerDivStyle =
  "flex items-center justify-end sm:justify-between text-xs font-medium text-[#353535] mb-1 lg:text-base lg:mb-8";
const descriptionStyle = "hidden sm:block text-[10.25px] lg:text-sm";
const discountedDivStyle =
  "flex items-center gap-x-2 font-medium lg:relative lg:top-6 ";
const footerDivStyle = "flex items-center justify-between";
const likeStyle = "lg:absolute lg:left-4 lg:top-4 lg:scale-[1.5]";
const ratingDivStyle = "flex items-center gap-x-1";
const buttonStyle =
  "bg-[#417F56] text-white border border-[#417F56] rounded sm:rounded-md text-[10px] py-1.5 px-2 sm:p-[9px] font-medium lg:rounded lg:text-sm lg:px-5 xl:px-12 ";

export const rating = {
  count: 5,
  value: 4,
  emptyIcon: <span>{starEmptyIcon}</span>,
  filledIcon: <span>{starIcon}</span>,
};

export const ratingDesktop = {
  count: 5,
  value: 4,
  emptyIcon: <span>{starEmptyDesktopIcon}</span>,
  filledIcon: <span>{starDesktopIcon}</span>,
};

const Food = ({ productData }) => {
  const { title, price, offer, discountedPrice, description, image, slug, id } =
    productData;

  const state = useSelector((state) => state.cartState);
  const favorite = useSelector((state) => state.favoriteState);
  const dispatch = useDispatch();

  const likeItem = () => {
    dispatch({ type: "LIKE_ITEM", payload: productData });
    toast.success("محصول به علاقه‌مندی ها اضافه شد", {
      position: "top-center",
      theme: "colored",
      style: {
        background: "#417F56",
        color: "#fff",
        textAlign: "right",
      },
      icon: false,
      transition: Flip,
      closeButton: CloseButton,
      autoClose: 2500,
    });
  };

  const CloseButton = ({ closeToast }) => (
    <i className="absolute top-[18px] left-2.5" onClick={closeToast}>
      {closeIcon}
    </i>
  );

  const addToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: productData });
    toast.success("محصول به سبد خرید اضافه شد", {
      position: "top-center",
      theme: "colored",
      style: {
        background: "#417F56",
        color: "#fff",
        textAlign: "right",
      },
      icon: false,
      transition: Flip,
      closeButton: CloseButton,
      autoClose: 2500,
    });
  };

  return (
    <div className={foodBoxStyle}>
      <Link to={`/menu/${slug}`}>
        <img src={image} alt={title} className={foodImgStyle} />
      </Link>
      <div className="p-2 flex-1 lg:px-3 lg:py-0">
        <div className={headerDivStyle}>
          <span className={titleStyle}>
            <Link to={`/menu/${slug}`}>{title}</Link>
          </span>
          <div className={priceDivStyle}>
            <span className={priceStyle}>{convertToFa(price)}</span>
            <span className={offerStyle}>%{convertToFa(offer)}</span>
          </div>
        </div>

        <div className={containerDivStyle}>
          <span className={descriptionStyle}>
            <Link to={`/menu/${slug}`}>{description.slice(0, 25)}...</Link>
          </span>
          <div className={discountedDivStyle}>
            <span>{convertToFa(discountedPrice)}</span>
            <span>تومان</span>
          </div>
        </div>

        <div className={footerDivStyle}>
          <div className={ratingDivStyle}>
            {isInFavorite(favorite, id) ? (
              <button
                className={`${likeStyle} text-[#C30000]`}
                onClick={() => dispatch(dislikeItem(productData))}
              >
                {likeIcon}
              </button>
            ) : (
              <button
                className={`${likeStyle} text-[#717171]`}
                onClick={likeItem}
              >
                {likeIcon}
              </button>
            )}

            <div className="hidden sm:block lg:hidden">
              <ReactStars {...rating} />
            </div>
            <div className="hidden lg:block">
              <ReactStars {...ratingDesktop} />
            </div>
          </div>
          {isInCart(state, id) ? (
            <button
              className={`${buttonStyle} !bg-white !text-[#417F56] border-[#417F56] px-[11px] lg:text-sm lg:px-[22px] xl:px-[51px]`}
            >
              <Link to="/cart">مشاهده سبد خرید</Link>
            </button>
          ) : (
            <button className={buttonStyle} onClick={addToCart}>
              افزودن به سبد خرید
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Food;
