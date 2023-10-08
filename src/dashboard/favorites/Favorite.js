import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import showToast from "../../components/helper/showToast";
import "react-toastify/dist/ReactToastify.css";

// functions
import {
  convertToFa,
  isInCart,
  isInFavorite,
} from "../../components/helper/functions";

// Actions
import { dislikeItem } from "../../components/redux/favorite/favoriteAction";

// icons
import {
  likeRedIcon,
  starIcon,
  starEmptyIcon,
} from "../../icons/foodsPageIcons";

// styles
const foodBoxStyle =
  "flex flex-col gap-y-1 border border-[#CBCBCB] rounded-md md:rounded-lg overflow-hidden";
const foodImgStyle = "w-full h-[104px] rounded md:h-[140px]";
const headerStyle =
  "flex items-center justify-between text-[11px] sm:text-[13px] font-medium md:text-lg md:font-semibold";
const likeStyle = "scale-[1.2] md:scale-[1.5]";
const mainStyle =
  "flex flex-col flex-1 justify-between gap-y-2 p-2 text-[#353535] md:p-3.5 md:gap-y-3";
const priceStyle =
  "flex items-center justify-between text-[11px] sm:text-sm md:text-base lg:text-[17px] md:mb-4";
const discountedDivStyle = "flex items-center gap-x-1 ";
const buttonStyle =
  "bg-[#417F56] text-white border border-[#417F56] rounded sm:rounded-md text-[8px] sm:text-[10px] py-1.5 px-2 sm:p-[9px] font-medium lg:rounded md:text-sm lg:px-5 xl:px-12 ";

export const rating = {
  count: 1,
  value: 1,
  emptyIcon: <span>{starEmptyIcon}</span>,
  filledIcon: <span>{starIcon}</span>,
};

export const ratingDesktop = {
  count: 5,
  value: 4,
  emptyIcon: <span>{starEmptyIcon}</span>,
  filledIcon: <span>{starIcon}</span>,
};

const Favorite = ({ productData }) => {
  const { title, discountedPrice, image, slug, id } = productData;

  const state = useSelector((state) => state.cartState);
  const favorite = useSelector((state) => state.favoriteState);
  const isLoggedIn = useSelector((state) => state.authState.isLoggedIn);
  const dispatch = useDispatch();

  const addToCart = () => {
    if (isLoggedIn) {
      dispatch({ type: "ADD_ITEM", payload: productData });
      showToast("محصول به سبد خرید اضافه شد", "success");
    } else {
      showToast("شما ابتدا باید وارد شوید", "error");
    }
  };

  return (
    <div className={foodBoxStyle}>
      <Link to={`/menu/${slug}`}>
        <img src={image} alt={title} className={foodImgStyle} />
      </Link>

      <div className={mainStyle}>
        <div className={headerStyle}>
          <h3>{title}</h3>
          {isInFavorite(favorite, id) && isLoggedIn && (
            <button
              className={likeStyle}
              onClick={() => dispatch(dislikeItem(productData))}
            >
              {likeRedIcon}
            </button>
          )}
        </div>

        <div className={priceStyle}>
          <div className="flex gap-x-0.5 items-center md:hidden ">
            <ReactStars {...rating} />
            <span className="">۴</span>
          </div>
          <div className="hidden md:block scale-[1.3] relative right-2.5">
            <ReactStars {...ratingDesktop} />
          </div>
          <div className={discountedDivStyle}>
            <span>{convertToFa(discountedPrice)}</span>
            <span>تومان</span>
          </div>
        </div>

        {isInCart(state, id) && isLoggedIn ? (
          <Link to="/cart">
            <button
              className={`${buttonStyle} !bg-white !text-[#417F56] border-[#417F56] w-full`}
            >
              مشاهده سبد خرید
            </button>
          </Link>
        ) : (
          <button className={buttonStyle} onClick={addToCart}>
            افزودن به سبد خرید
          </button>
        )}
      </div>
    </div>
  );
};

export default Favorite;
