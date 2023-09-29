import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import Address from "./Address";
import Factor from "./Factor";

// Icons
import {
  arrowRightIcon,
  cartDesktopIcon,
  tickSquareIcon,
  walletIcon,
} from "../../icons/shopCartIcons";
import {
  truckIcon,
  truckDesktopIcon,
  shoppingBagIcon,
  shoppingBagDesktopIcon,
  locationIcon,
  locationDesktopIcon,
  documentNormalIcon,
  documentNormalDesktopIcon,
} from "../../icons/completionOfInformationIcon";

// Styles
import {
  headerStyle,
  containerStyle,
  headerDesktopStyle,
  headerDesktopItemStyle,
  headerDesktopPStyle,
} from "../shopping-cart/ShopCart";
export const mainStyle = "flex flex-col gap-y-3 lg:flex-row lg:gap-x-6";
export const completionInfoDivStyle = "flex flex-col gap-y-3 lg:gap-y-6 flex-1";
export const completionInfoDivItemStyle =
  "border border-[#CBCBCB] rounded-lg p-4";
export const shippingMethodTitleStyle =
  "flex items-center gap-x-1 border-b border-[#CBCBCB] pb-3 mb-4 text-[15px] font-medium lg:text-base text-[#353535] lg:border-none lg:pb-0 lg:mb-0";
export const shippingMethodStyle =
  "pr-2 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-evenly flex-1";
export const shippingMethodItemStyle =
  "flex items-center jus gap-x-1 text-[#717171] text-xs sm:text-[13px] lg:text-base lg:font-medium lg:cursor-pointer";
export const shippingMethodItemInputStyle =
  "appearance-none w-3.5 h-3.5 rounded-full ring-1 ring-[#CBCBCB] ring-offset-1 checked:bg-[#00BA88] duration-200 ml-2";
export const shippingMethodItemSpanStyle = "hidden lg:block text-[10px] font-normal";
const addressTitleStyle =
  "flex items-center gap-x-1 text-[15px] font-medium text-[#353535] pb-3 mb-4 border-b border-[#CBCBCB] lg:text-base";
const textareaStyle =
  "resize-none scroll-smooth w-full h-[141px] outline-none placeholder:text-[15px] placeholder:text-[#717171] lg:placeholder:text-base";

const CompletionOfInformation = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [list, setList] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);

  const updateShippingCost = (newCost) => {
    setShippingCost(newCost);
  };

  useEffect(() => {
    document.title = "تکمیل اطلاعات";
  }, []);

  return (
    <div className={containerStyle}>
      <div className={`${headerStyle} !justify-center relative`}>
        <Link to="/cart" className="absolute right-0">
          {arrowRightIcon}
        </Link>
        <span className="pl-2">تکمیل اطلاعات</span>
      </div>

      <div className={headerDesktopStyle}>
        <div className={`${headerDesktopItemStyle} text-lg !text-[#417F56]`}>
          <span>{cartDesktopIcon}</span>
          <span>سبد خرید</span>
          <p className={headerDesktopPStyle}>- - - - - - - -</p>
        </div>

        <div
          className={`${headerDesktopItemStyle} text-lg font-bold !text-[#417F56]`}
        >
          <p className={headerDesktopPStyle}>- - - - - - - -</p>
          <span>{tickSquareIcon}</span>
          <span>تکمیل اطلاعات</span>
          <p className={headerDesktopPStyle}>- - - - - - - -</p>
        </div>

        <div className={headerDesktopItemStyle}>
          <p className={headerDesktopPStyle}>- - - - - - - -</p>
          <span>{walletIcon}</span>
          <span>پرداخت</span>
        </div>
      </div>

      <div className={mainStyle}>
        <div className={completionInfoDivStyle}>
          <div
            className={`${completionInfoDivItemStyle} lg:flex lg:py-8 lg:px-6`}
          >
            <div className={shippingMethodTitleStyle}>
              <span className="lg:hidden">{truckIcon}</span>
              <span className="hidden lg:block">{truckDesktopIcon}</span>
              <span>روش تحویل سفارش</span>
            </div>

            <div className={shippingMethodStyle}>
              <label>
                <div className={shippingMethodItemStyle}>
                  <input
                    type="radio"
                    checked={deliveryMethod === "delivery"}
                    onChange={() => setDeliveryMethod("delivery")}
                    className={shippingMethodItemInputStyle}
                  />
                  <div>
                    <span>ارسال توسط پیک</span>
                    <span className={shippingMethodItemSpanStyle}>
                      توسط پیک رستوران ارسال شود.
                    </span>
                  </div>
                  <span className="lg:hidden">{truckIcon}</span>
                  <span className="hidden lg:block">{truckDesktopIcon}</span>
                </div>
              </label>

              <label>
                <div className={shippingMethodItemStyle}>
                  <input
                    type="radio"
                    checked={deliveryMethod === "pickup"}
                    onChange={() => setDeliveryMethod("pickup")}
                    className={shippingMethodItemInputStyle}
                  />
                  <div>
                    <span>تحویل حضوری</span>
                    <span className={shippingMethodItemSpanStyle}>
                      توسط پیک رستوران ارسال شود.
                    </span>
                  </div>
                  <span className="lg:hidden">{shoppingBagIcon}</span>
                  <span className="hidden lg:block">
                    {shoppingBagDesktopIcon}
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div
            className={`${completionInfoDivItemStyle} rounded-lg p-4 relative`}
          >
            <div className={addressTitleStyle}>
              <span className="lg:hidden">{locationIcon}</span>
              <span className="hidden lg:block">{locationDesktopIcon}</span>
              <span>آدرس ها</span>
            </div>
            <Address
              list={list}
              setList={setList}
              updateShippingCost={updateShippingCost}
            />
          </div>

          <div
            className={`${completionInfoDivItemStyle} text-[#717171] flex items-start gap-x-1`}
          >
            <span className="pt-0.5 lg:hidden">{documentNormalIcon}</span>
            <span className="hidden lg:block">{documentNormalDesktopIcon}</span>
            <textarea
              type="text"
              placeholder="توضیحات (اختیاری)"
              multiple
              className={textareaStyle}
            />
          </div>
        </div>

        <div className="lg:w-[370px] xl:w-[416px]">
          <Factor shippingCost={shippingCost} list={list} />
        </div>
      </div>
    </div>
  );
};

export default CompletionOfInformation;
