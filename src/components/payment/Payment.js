import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tab, RadioGroup } from "@headlessui/react";
import PaymentFactor from "./PaymentFactor";

// Image
import saman from "../../images/bankSaman.jpg";
import mellat from "../../images/bankMellat.jpg";
import parsian from "../../images/bankParsian.jpg";

// Icons
import {
  arrowRightIcon,
  cartDesktopIcon,
  tickSquareIcon,
  walletIcon,
  warningIcon,
  warningDesktopIcon,
} from "../../icons/shopCartIcons";
import {
  discountShapeIcon,
  discountShapeDesktopIcon,
  walletMoneyIcon,
  walletMoneyDesktopIcon,
  cardPosIcon,
  cardPosDesktopIcon,
  wallet2Icon,
  wallet2DesktopIcon,
  cardIcon,
  cardDesktopIcon,
} from "../../icons/paymentIcons";

// Styles
import {
  headerStyle,
  containerStyle,
  headerDesktopStyle,
  headerDesktopItemStyle,
  headerDesktopPStyle,
} from "../shopping-cart/ShopCart";
import {
  mainStyle,
  completionInfoDivStyle,
  completionInfoDivItemStyle,
  shippingMethodTitleStyle,
  shippingMethodStyle,
  shippingMethodItemStyle,
  shippingMethodItemInputStyle,
  shippingMethodItemSpanStyle,
} from "../completion-of-information/CompletionOfInformation";
const discountTitleStyle =
  "flex items-center gap-x-1 lg:gap-x-2 text-[#353535] text-[15px] font-medium pb-2 border-b border-[#CBCBCB] lg:border-none lg:pb-0 lg:border-b-0 lg:text-base";
const discountMainStyle = "flex items-center gap-x-4 lg:py-2.5";
const discountInputStyle =
  "border border-[#CBCBCB] rounded placeholder:text-[#717171] py-1.5 px-4 w-4/5 text-sm outline-none text-[#353535] flex-1 lg:py-[9px] lg:w-[270px] xl:w-[320px]";
const discountCodeButtonStyle =
  "text-xs w-[51px] py-[9px] rounded lg:w-[95px] lg:py-2 lg:text-base font-medium duration-500";
const bankImgStyle = "border rounded-md w-16 md:w-24 lg:cursor-pointer duration-300";

const Payment = () => {
  const [discountCode, setDiscountCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("internetPayment");
  let [paymentBank, setPaymentBank] = useState("saman");

  const updateDiscountCode = (value) => {
    setDiscountCode(value);
  };

  useEffect(() => {
    document.title = "پرداخت";
  }, []);

  return (
    <div className={containerStyle}>
      <div className={`${headerStyle} !justify-center relative`}>
        <Link to="/completion-of-information" className="absolute right-0">
          {arrowRightIcon}
        </Link>
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
        <div className={completionInfoDivStyle}>
          <div
            className={`${completionInfoDivItemStyle} flex flex-col gap-y-4 lg:flex-row lg:gap-x-6 xl:gap-x-14`}
          >
            <div className={discountTitleStyle}>
              <span className="lg:hidden">{discountShapeIcon}</span>
              <span className="hidden lg:block">
                {discountShapeDesktopIcon}
              </span>
              <span>ثبت کد تخفیف</span>
            </div>

            <div className={discountMainStyle}>
              <input
                type="text"
                value={discountCode}
                onChange={(e) => updateDiscountCode(e.target.value)}
                placeholder="کد تخفیف"
                className={discountInputStyle}
              />
              <button
                className={
                  discountCode
                    ? `${discountCodeButtonStyle} bg-[#417F56] text-white`
                    : `${discountCodeButtonStyle} bg-[#CBCBCB] text-[#EDEDED]`
                }
              >
                ثبت کد
              </button>
            </div>
          </div>

          <Tab.Group>
            <div
              className={`${completionInfoDivItemStyle} lg:flex lg:py-8 lg:px-6 lg:gap-x-6 xl:gap-x-14`}
            >
              <div className={shippingMethodTitleStyle}>
                <span className="lg:hidden">{walletMoneyIcon}</span>
                <span className="hidden lg:block">
                  {walletMoneyDesktopIcon}
                </span>
                <span>روش پرداخت</span>
              </div>
              <Tab.List>
                <div
                  className={`${shippingMethodStyle} sm:!flex-row lg:gap-x-5 xl:gap-x-14`}
                >
                  <Tab>
                    <label>
                      <div className={shippingMethodItemStyle}>
                        <input
                          type="radio"
                          checked={paymentMethod === "internetPayment"}
                          onChange={() => setPaymentMethod("internetPayment")}
                          className={shippingMethodItemInputStyle}
                        />
                        <div className="text-right">
                          <span>پرداخت اینترنتی</span>
                          <span className={shippingMethodItemSpanStyle}>
                            توسط پیک رستوران ارسال شود.
                          </span>
                        </div>
                        <span className="lg:hidden">{cardPosIcon}</span>
                        <span className="hidden lg:block">
                          {cardPosDesktopIcon}
                        </span>
                      </div>
                    </label>
                  </Tab>
                  <Tab>
                    <label>
                      <div className={shippingMethodItemStyle}>
                        <input
                          type="radio"
                          checked={paymentMethod === "cash"}
                          onChange={() => setPaymentMethod("cash")}
                          className={shippingMethodItemInputStyle}
                        />
                        <div className="text-right">
                          <span>پرداخت در محل</span>
                          <span className={shippingMethodItemSpanStyle}>
                            توسط پیک رستوران ارسال شود.
                          </span>
                        </div>
                        <span className="lg:hidden">{wallet2Icon}</span>
                        <span className="hidden lg:block">
                          {wallet2DesktopIcon}
                        </span>
                      </div>
                    </label>
                  </Tab>
                </div>
              </Tab.List>
            </div>

            <Tab.Panels>
              <Tab.Panel>
                <div
                  className={`${completionInfoDivItemStyle} lg:flex lg:items-start lg:py-6 lg:px-6 lg:gap-x-14 xl:gap-x-24`}
                >
                  <div className={shippingMethodTitleStyle}>
                    <span className="lg:hidden">{cardIcon}</span>
                    <span className="hidden lg:block">{cardDesktopIcon}</span>
                    <span>درگاه پرداخت</span>
                  </div>
                  <div>
                    <RadioGroup
                      value={paymentBank}
                      onChange={setPaymentBank}
                      className="flex items-center justify-center gap-x-2 mb-3 lg:gap-x-4"
                    >
                      <RadioGroup.Option value="saman">
                        {({ checked }) => (
                          <img
                            src={saman}
                            alt="saman"
                            className={
                              checked
                                ? `${bankImgStyle} border-[#417F56] shadow shadow-[#7CBC91]`
                                : `${bankImgStyle} border-[#CBCBCB]`
                            }
                          />
                        )}
                      </RadioGroup.Option>
                      <RadioGroup.Option value="mellat">
                        {({ checked }) => (
                          <img
                            src={mellat}
                            alt="mellat"
                            className={
                              checked
                                ? `${bankImgStyle} border-[#417F56] shadow shadow-[#7CBC91]`
                                : `${bankImgStyle} border-[#CBCBCB]`
                            }
                          />
                        )}
                      </RadioGroup.Option>
                      <RadioGroup.Option value="parsian">
                        {({ checked }) => (
                          <img
                            src={parsian}
                            alt="parsian"
                            className={
                              checked
                                ? `${bankImgStyle} border-[#417F56] shadow shadow-[#7CBC91]`
                                : `${bankImgStyle} border-[#CBCBCB]`
                            }
                          />
                        )}
                      </RadioGroup.Option>
                    </RadioGroup>
                    <div className="text-[10.5px] text-center text-[#717171] leading-[18px] md:text-sm md:leading-6">
                      <p className="font-medium">
                        پرداخت از طریق کلیه کارت‌های عضو شتاب امکان‌پذیر است.‌
                      </p>
                      <p>(لطفا قبل از پرداخت فیلترشکن خود را خاموش کنید.)</p>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div
                  className={`${completionInfoDivItemStyle} !bg-[#F9F9F9] lg:flex lg:items-center lg:py-5 lg:px-6 `}
                >
                  <div className={`${shippingMethodTitleStyle} lg:w-1/2`}>
                    <span className="lg:hidden">{warningIcon}</span>
                    <span className="hidden lg:block">
                      {warningDesktopIcon}
                    </span>
                    <span>قابل توجه</span>
                  </div>
                  <p className="text-[10.5px] text-[#717171] text-justify leading-[18px] lg:text-[11.5px] xl:text-[13px] xl:leading-6 ">
                    هزینه سفارش شما در حین تحویل کالا دریافت خواهد شد. لطفا قبل
                    از تحویل کالا کارت بانکی یا پول نقد همراه خود داشته باشید و
                    از درخواست برای پرداخت در زمان بعدی یا نسیه خودداری فرمایید.
                    با تشکر از همراهی شما.
                  </p>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

        <div className="lg:w-[370px] xl:w-[416px]">
          <PaymentFactor paymentMethod={paymentMethod} />
        </div>
      </div>
    </div>
  );
};

export default Payment;
