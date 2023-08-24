import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useSelector, useDispatch } from "react-redux";
import { toast, Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { rating, ratingDesktop } from "./Food";

// Functions
import { convertToFa, isInCart, quantityCount } from "../helper/functions";

// Actions
import { addItem, removeItem, increase, decrease } from '../redux/cart/cartAction'

// Icons
import {
  arrowRightIcon,
  likeDesktopIcon,
  trashIcon
} from "../../icons/foodsPageIcons";
import { closeIcon } from "../../icons/mobileMenuIcons";

// Styles
const topBarStyle = "container max-w-[1224px] mx-auto h-[4.5em] text-white flex items-center px-5 mb-4 md:mb-8";
const topBarTitleStyle = "font-bold flex-1 text-center pl-10 text-xl";
const mainStyle = "container max-w-[1224px] mx-auto px-5 text-[#353535] md:flex md:gap-x-4"
const imgStyle = "w-full h-[205px] rounded-lg mb-[17px] md:w-[350px] md:h-[220px] lg:w-[450px] lg:h-[320px]"
const mainHeaderStyle = "flex items-center justify-between mb-[17px] px-0.5"
const mainHeaderH3Style = "font-bold text-lg md:text-2xl"
const foodDetailsStyle = "border border-[#CBCBCB] rounded-lg py-2 px-2.5 font-medium md:pb-3 mb-6"
const foodDetailsContentsStyle = "mb-1 text-[15px] md:text-base lg:text-lg"
const descriptionStyle = "text-[11px] text-[#717171] pr-1 leading-5 md:leading-6 md:text-xs lg:text-sm"
const ratingDivStyle = "flex items-center justify-between py-2 border-y border-[#CBCBCB] my-1.5 text-[15px] md:my-2 md:text-base lg:text-lg lg:my-3"
const discountedDivStyle = "flex items-center justify-between text-[15px] md:text-base lg:text-lg "
const quantityCountDivStyle = "flex items-center gap-x-2 justify-center lg:justify-end"
const quantityCountButtonStyle = "bg-[#417F56] text-white w-6 h-6 rounded mt-1 font-bold flex items-center justify-center md:w-8 md:h-8"
const addToCartButtonStyle =
  "bg-[#417F56] text-white rounded-md text-[10px] font-medium py-[10px] px-[35px] md:text-sm lg:py-2.5 lg:px-5 xl:px-12";


const FoodDetails = () => {
  const { slug } = useParams();
  const products = useSelector((state) => state.productsState.products);
  const product = products.find((item) => item.slug === slug);
  const { title, discountedPrice, description, image , id } = product;
  const navigate = useNavigate();
  const [isActive2, setIsActive2] = useState(false);

  const state = useSelector((state) => state.cartState);
  const dispatch = useDispatch();

  const likeDesktopClick = () => {
    setIsActive2((current2) => !current2);
  };

  const CloseButton = ({ closeToast }) => (
    <i
      className="absolute top-[18px] left-2.5"
      onClick={closeToast}
    >
    {closeIcon}
    </i>
  );

  const addToCart = () => {
    dispatch(addItem(product));
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
      closeButton : CloseButton,
      autoClose : 2500
    });
  };

  return (
    <div className="min-h-[calc(100vh_-_200px)] mb-10 md:min-h-[calc(100vh_-_474px)]">
      <div className="bg-[#417F56]">
        <div className={topBarStyle}>
          <button onClick={() => navigate(-1)}>{arrowRightIcon}</button>
          <h3 className={topBarTitleStyle}>جزئیات محصول</h3>
        </div>
      </div>
      <div className={mainStyle}>
        <img
          src={image}
          alt={title}
          className={imgStyle}
        />
        <div className="md:flex-1 ">
          <div className={mainHeaderStyle}>
            <h3 className={mainHeaderH3Style}>{title}</h3>
              <button
                className={isActive2 ? ` text-[#C30000]` : ` text-[#717171] `}
                onClick={likeDesktopClick}
              >
                {likeDesktopIcon}
              </button>
          </div>
          <div className={foodDetailsStyle}>
            <p className={foodDetailsContentsStyle}>محتویات</p>
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
          <div className={quantityCountDivStyle}>
          {isInCart(state, id) ? (
            <button onClick={() => dispatch(increase(product))} className={quantityCountButtonStyle}>+</button>
          ) : (
            <button className={addToCartButtonStyle} onClick={addToCart}>افزودن به سبد خرید</button>
          )}
          {quantityCount(state, id) > 0  && <span className="text-[#417F56] font-semibold mt-1 md:text-lg">{convertToFa(quantityCount(state, id))}</span>}
          {quantityCount(state, id) === 1 && <button onClick={() => dispatch(removeItem(product))} className={quantityCountButtonStyle}>{trashIcon}</button>}
          {quantityCount(state, id) > 1 && <button onClick={() => dispatch(decrease(product))} className={quantityCountButtonStyle}>-</button>}
          </div>

        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FoodDetails;
