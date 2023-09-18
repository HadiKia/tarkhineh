import React from "react";
import { useNavigate } from "react-router-dom";

// Icons
import {
  arrowRightIcon,
  cartDesktopIcon,
  tickSquareIcon,
  walletIcon,
} from "../../icons/shopCartIcons";

// Styles
import {
  headerStyle,
  containerStyle,
  headerDesktopStyle,
  headerDesktopItemStyle,
  headerDesktopPStyle,
} from "../shopping-cart/ShopCart";

const Payment = () => {
  const navigate = useNavigate();
  return (
    <div className={containerStyle}>
      <div className={`${headerStyle} !justify-center relative`}>
        <button onClick={() => navigate(-1)} className="absolute right-0">
          {arrowRightIcon}
        </button>
        <span className="pl-2">تکمیل اطلاعات</span>
      </div>

      <div className={headerDesktopStyle}>
        <div className={`${headerDesktopItemStyle} text-lg !text-[#417F56]`}>
          <span>{cartDesktopIcon}</span>
          <span>سبد خرید</span>
          <p className={headerDesktopPStyle}>- - - - - - - -</p>
        </div>

        <div className={`${headerDesktopItemStyle} text-lg !text-[#417F56]`}>
          <p className={headerDesktopPStyle}>- - - - - - - -</p>
          <span>{tickSquareIcon}</span>
          <span>تکمیل اطلاعات</span>
          <p className={headerDesktopPStyle}>- - - - - - - -</p>
        </div>

        <div
          className={`${headerDesktopItemStyle} text-lg font-bold !text-[#417F56]`}
        >
          <p className={headerDesktopPStyle}>- - - - - - - -</p>
          <span>{walletIcon}</span>
          <span>پرداخت</span>
        </div>
      </div>
    </div>
  );
};

export default Payment;
