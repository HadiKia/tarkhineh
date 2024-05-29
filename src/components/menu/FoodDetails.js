import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../features/product/productSlice";
import showToast from "../../helper/showToast";
import "react-toastify/dist/ReactToastify.css";
import { RotatingLines } from "react-loader-spinner";
import { rating, ratingDesktop } from "./Food";

// Functions
import {
  convertToFa,
  isInCart,
  isInFavorite,
  quantityCount,
} from "../../helper/functions";

// Actions
import {
  addItem,
  removeItem,
  increase,
  decrease,
} from "../../features/cart/cartSlice";
import { disLikeItem, likeItem } from "../../features/favorite/favoriteSlice";

// Icons
import {
  arrowRightIcon,
  shoppingCartIcon,
  likeIcon,
  likeRedIcon,
  trashIcon,
} from "../../icons/foodsPageIcons";

// Styles
const topBarStyle =
  "container max-w-[1224px] mx-auto h-[4em] text-white flex items-center md:h-[4.5em] px-5 mb-4 md:mb-8";
const topBarTitleStyle = "font-bold flex-1 text-center pl-10 text-xl";
const mainStyle =
  "container max-w-[1224px] mx-auto px-5 text-[#353535] md:flex md:gap-x-4";
const imgStyle = "w-full  rounded-lg mb-[17px] md:w-[350px]";
const mainHeaderStyle = "flex items-center justify-between mb-[17px] px-0.5";
const mainHeaderH3Style = "font-bold text-lg md:text-2xl";
const foodDetailsStyle =
  "border border-[#CBCBCB] rounded-lg py-2 px-2.5 font-medium md:pb-3 mb-6";
const foodDetailsContentsStyle = "mb-1 text-[15px] md:text-base lg:text-lg";
const descriptionStyle =
  "text-[11px] text-[#717171] pr-1 leading-5 md:leading-6 md:text-xs lg:text-sm";
const ratingDivStyle =
  "flex items-center justify-between py-2 border-y border-[#CBCBCB] my-1.5 text-[15px] md:my-2 md:text-base lg:text-lg lg:my-3";
const discountedDivStyle =
  "flex items-center justify-between text-[15px] md:text-base lg:text-lg ";
const quantityCountDivStyle =
  "flex items-center gap-x-2.5 justify-center md:justify-end";
const quantityCountButtonStyle =
  "bg-[#417F56] text-white w-6 h-6 rounded mt-1 font-bold flex items-center justify-center md:w-8 md:h-8 scale-110";
const addToCartButtonStyle =
  "bg-[#417F56] text-white rounded-md text-xs font-medium py-2.5 px-[35px] md:text-sm lg:py-2.5 lg:px-5 xl:px-12";

const FoodDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((store) =>
    store.product.products.foods?.find((item) => item.slug === slug)
  );
  const cartState = useSelector((state) => state.cart);
  const favorite = useSelector((state) => state.favorite);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const navigate = useNavigate();

  const likeHandler = () => {
    if (isLoggedIn) {
      dispatch(likeItem(data));
      showToast("محصول به علاقه‌مندی ها اضافه شد", "success");
    } else {
      showToast("شما ابتدا باید وارد شوید", "error");
    }
  };

  const addToCart = () => {
    if (isLoggedIn) {
      dispatch(addItem(data));
      showToast("محصول به سبد خرید اضافه شد", "success");
    } else {
      showToast("شما ابتدا باید وارد شوید", "error");
    }
  };

  return (
    <div className="min-h-[calc(100vh_-_200px)] mb-10 md:min-h-[calc(100vh_-_474px)]">
      <div className="bg-[#417F56]">
        <div className={topBarStyle}>
          <button
            onClick={() => navigate(-1)}
            className="md:scale-110 lg:scale-125"
          >
            {arrowRightIcon}
          </button>
          <h3 className={topBarTitleStyle}>جزئیات محصول</h3>
        </div>
      </div>

      {!data ? (
        <div className="flex justify-center mt-52 md:mt-32 lg:mt-42 md:pb-50">
          <RotatingLines
            height="50"
            width="50"
            strokeColor="#417F56"
            strokeWidth="2"
            animationDuration="2"
          />
        </div>
      ) : (
        <div className={mainStyle}>
          <img src={data.image} alt={data.title} className={imgStyle} />
          <div className="md:flex-1 ">
            <div className={mainHeaderStyle}>
              <h3 className={mainHeaderH3Style}>{data.title}</h3>

              <div className="flex items-center gap-x-4 text-[#717171]">
                {isInFavorite(favorite, data.id) && isLoggedIn ? (
                  <button
                    className="scale-[1.65]"
                    onClick={() => dispatch(disLikeItem(data))}
                  >
                    {likeRedIcon}
                  </button>
                ) : (
                  <button className="scale-[1.5]" onClick={likeHandler}>
                    {likeIcon}
                  </button>
                )}
                <Link to="/cart" className="scale-[1.5]">
                  {shoppingCartIcon}
                </Link>
              </div>
            </div>
            <div className={foodDetailsStyle}>
              <p className={foodDetailsContentsStyle}>محتویات</p>
              <p className={descriptionStyle}>{data.description}</p>
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
                <span>{convertToFa(data.discountedPrice)} تومان</span>
              </div>
            </div>
            <div className={quantityCountDivStyle}>
              {isInCart(cartState, data.id) && isLoggedIn ? (
                <button
                  onClick={() => dispatch(increase(data))}
                  className={quantityCountButtonStyle}
                >
                  +
                </button>
              ) : (
                <button className={addToCartButtonStyle} onClick={addToCart}>
                  افزودن به سبد خرید
                </button>
              )}
              {quantityCount(cartState, data.id) > 0 && isLoggedIn && (
                <span className="text-[#417F56] font-semibold mt-1 md:text-lg">
                  {convertToFa(quantityCount(cartState, data.id))}
                </span>
              )}
              {quantityCount(cartState, data.id) === 1 && isLoggedIn && (
                <button
                  onClick={() => dispatch(removeItem(data))}
                  className={quantityCountButtonStyle}
                >
                  {trashIcon}
                </button>
              )}
              {quantityCount(cartState, data.id) > 1 && isLoggedIn && (
                <button
                  onClick={() => dispatch(decrease(data))}
                  className={quantityCountButtonStyle}
                >
                  -
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
