import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import {
  arrowRightIcon,
  cartDesktopIcon,
  tickSquareIcon,
  walletIcon,
} from "../../icons/shopCartIcons";
import { discountShapeIcon, discountShapeDesktopIcon } from "../../icons/PaymentIcons";

// Styles
import {
  headerStyle,
  containerStyle,
  headerDesktopStyle,
  headerDesktopItemStyle,
  headerDesktopPStyle,
} from "../shopping-cart/ShopCart";
import { mainStyle, completionInfoDivItemStyle } from "../completion-of-information/CompletionOfInformation";
const discountTitleStyle = "flex items-center gap-x-1 lg:gap-x-2 text-[#353535] text-[15px] pb-2 border-b border-[#CBCBCB] lg:border-none lg:pb-0 lg:border-b-0 lg:text-base"
const discountMainStyle = "flex items-center gap-x-4 lg:py-2.5"
const discountInputStyle = "border border-[#CBCBCB] rounded placeholder:text-[#717171] py-1.5 px-4 w-4/5 text-sm outline-none text-[#353535] flex-1 lg:py-[9px] lg:w-[270px] xl:w-[320px]"
const discountCodeButtonStyle = "text-xs w-[51px] py-[9px] rounded lg:w-[95px] lg:py-2 lg:text-base font-medium duration-500"

const Payment = () => {
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState("");

  const updateDiscountCode = value => {
    setDiscountCode(value)
  }

  useEffect(() => {
    document.title = "پرداخت";
  }, []);
  
  return (
    <div className={containerStyle}>

      <div className={`${headerStyle} !justify-center relative`}>
        <button onClick={() => navigate(-1)} className="absolute right-0">
          {arrowRightIcon}
        </button>
        <span className="pl-2">پرداخت</span>
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

      <div className={mainStyle}>
        <div className={`${completionInfoDivItemStyle} flex flex-col gap-y-4 lg:flex-row lg:gap-x-10 flex-1 lg:justify-around`}>
        <div className={discountTitleStyle}>
          <span className="lg:hidden">{discountShapeIcon}</span>
          <span className="hidden lg:block">{discountShapeDesktopIcon}</span>
          <span>ثبت کد تخفیف</span>
        </div>

        <div className={discountMainStyle}>
          <input type="text" value={discountCode} onChange={e=> updateDiscountCode(e.target.value)} placeholder="کد تخفیف" className={discountInputStyle}/>
          <button className={discountCode? `${discountCodeButtonStyle} bg-[#417F56] text-white` : `${discountCodeButtonStyle} bg-[#CBCBCB] text-[#EDEDED]`}>ثبت کد</button>
        </div>
        </div>

      </div>

    </div>
  );
};

export default Payment;
