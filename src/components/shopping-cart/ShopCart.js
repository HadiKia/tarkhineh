import React, { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";

// Components
import Cart from "./Cart";
import EmptyShoppingCart from "./EmptyShoppingCart";

// Actions
import { clear } from "../redux/cart/cartAction";

// Functions
import { convertToFa } from "../helper/functions";

// Icons
import {
  arrowRightIcon,
  trashIcon,
  trashDesktopIcon,
  warningIcon,
  warningDesktopIcon,
  arrowLeftIcon,
  arrowLeftDesktopIcon,
  cartDesktopIcon,
  tickSquareIcon,
  walletIcon,
} from "../../icons/shopCartIcons";
import { closeIcon } from "../../icons/mobileMenuIcons";

// Styles
export const containerStyle =
  "container max-w-[1224px] mx-auto mt-6 px-5 min-h-[calc(100vh_-_239px)] md:mt-10";
export const headerStyle =
  "flex items-center justify-between text-[#353535] font-bold mb-6 md:hidden";
export const dialogBgStyle =
  "fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm";
export const dialogDivStyle =
  "flex min-h-full items-center justify-center p-4 text-center";
export const dialogPanelStyle =
  "w-full mx-1 transform overflow-hidden rounded-lg bg-white align-middle shadow-xl transition-all md:w-[392px]";
export const dialogTitleStyle =
  "relative flex items-center justify-center font-medium bg-[#F9F9F9] px-6 py-[17px] mb-4 md:text-xl md:font-semibold md:py-[21px] md:mb-8";
export const dialogCloseButtonStyle = "text-[#717171] absolute left-6";
export const dialogPStyle =
  "text-center text-xs sm:text-sm text-[#353535] md:text-base";
export const dialogButtonDivStyle =
  "flex items-center justify-center gap-x-5 mb-4 md:mb-6 text-xs sm:text-sm md:font-medium md:text-base";
export const dialogButtonStyle =
  "rounded border px-7 sm:px-11 py-[5px] md:py-[7px]";
export const headerDesktopStyle =
  "hidden md:flex items-center justify-center gap-x-0.5 mb-10";
export const headerDesktopItemStyle =
  "flex items-center gap-x-1 lg:gap-x-2 text-[#CBCBCB]";
export const headerDesktopPStyle = "!font-medium text-sm pt-1";
const mainDivStyle =
  "border border-[#CBCBCB] rounded-lg mb-10 p-6 text-[#353535] flex flex-col lg:flex-row lg:items-start lg:gap-x-6 md:p-0 md:border-none";
const cartDivStyle =
  "[&>*:nth-child(odd)]:bg-[#F9F9F9] [&>*:nth-child(even)]:bg-[#EDEDED] h-[187px] overflow-auto mb-3 md:[&>*:nth-child(odd)]:bg-[#fff] md:[&>*:nth-child(even)]:bg-[#fff] md:border md:border-[#CBCBCB] md:rounded-lg md:p-6 md:h-[400px] md:w-full lg:h-[565px]";
const settlementCardStyle =
  "flex flex-col gap-y-3 md:border md:border-[#CBCBCB] md:rounded-lg md:p-6 xl:w-[650px]";
const settlementCardCartStyle =
  "hidden md:flex items-center justify-between mb-3";
const settlementCardPriceDivStyle = "flex items-center gap-x-1 text-[#717171]";
const settlementCardDiscountStyle =
  "flex items-center justify-between py-3 border-y border-[#CBCBCB] text-[13px] sm:text-[15px]";
const shippingCostStyle = "border-b border-[#CBCBCB] pb-3";
const shippingCostTitleStyle =
  "flex items-center justify-between text-[13px] sm:text-[15px] mb-2";
const shippingCostDescriptionStyle =
  "flex items-start gap-x-2 text-[#A9791C] text-[10px] sm:text-[11px] md:text-xs";
const payableStyle =
  "flex items-center justify-between text-[13px] sm:text-[15px] md:text-lg md:my-2";
const payableDivStyle =
  "text-[#417F56] flex items-center gap-x-1 font-medium md:text-lg";
const settlementCardButtonStyle =
  "bg-[#417F56] text-white rounded py-2 text-xs font-medium flex items-center justify-center gap-x-1 md:text-base";

const ShopCart = () => {
  const state = useSelector((state) => state.cartState);
  const isLoggedIn = useSelector((state) => state.authState.isLoggedIn);
  const dispatch = useDispatch();

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    document.title = "سبد خرید";
  }, []);

  return (
    <div className={containerStyle}>
      <div className={headerStyle}>
        <Link to="/menu">{arrowRightIcon}</Link>
        <span className="pl-2">سبد خرید</span>
        <button
          onClick={() => {
            if (state.itemsCounter > 0) openModal();
          }}
          className={
            state.itemsCounter > 0 ? "text-[#353535]" : "text-[#CBCBCB]"
          }
        >
          {trashIcon}
        </button>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className={dialogBgStyle} />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className={dialogDivStyle}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className={dialogPanelStyle}>
                    <Dialog.Title className={dialogTitleStyle}>
                      <span>حذف محصولات</span>
                      <button
                        onClick={closeModal}
                        className={dialogCloseButtonStyle}
                      >
                        {closeIcon}
                      </button>
                    </Dialog.Title>

                    <div className="mb-[34px]">
                      <p className={dialogPStyle}>
                        همه محصولات سبد خرید شما حذف شود؟
                      </p>
                    </div>

                    <div className={dialogButtonDivStyle}>
                      <button
                        onClick={closeModal}
                        className={`${dialogButtonStyle} text-[#417F56] border-[#417F56]`}
                      >
                        بازگشت
                      </button>
                      <button
                        onClick={() => {
                          dispatch(clear());
                          closeModal();
                        }}
                        className={`${dialogButtonStyle} text-[#C30000] border-[#FFF2F2] bg-[#FFF2F2]`}
                      >
                        حذف
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
      <div className={headerDesktopStyle}>
        <div
          className={`${headerDesktopItemStyle} text-lg font-bold !text-[#417F56]`}
        >
          <span>{cartDesktopIcon}</span>
          <span>سبد خرید</span>
          <p className={headerDesktopPStyle}>- - - - - - - -</p>
        </div>

        <div className={headerDesktopItemStyle}>
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
      {isLoggedIn ? (
        <>
          {state.itemsCounter === 0 ? (
            <EmptyShoppingCart />
          ) : (
            <div className={state.itemsCounter > 0 ? mainDivStyle : ""}>
              <div className={state.itemsCounter > 0 ? cartDivStyle : ""}>
                {state.selectedItems.map((item) => (
                  <Cart key={item.id} data={item} />
                ))}
              </div>

              {state.itemsCounter > 0 && (
                <div className={settlementCardStyle}>
                  <div className={settlementCardCartStyle}>
                    <div
                      className={`${settlementCardPriceDivStyle} !text-[#353535]`}
                    >
                      <span>سبد خرید</span>
                      <span className="text-sm">
                        ({convertToFa(state.itemsCounter)})
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        if (state.itemsCounter > 0) openModal();
                      }}
                      className={
                        state.itemsCounter > 0
                          ? "text-[#353535]"
                          : "text-[#CBCBCB]"
                      }
                    >
                      {trashDesktopIcon}
                    </button>
                  </div>

                  <div className={settlementCardDiscountStyle}>
                    <span>تخفیف محصولات</span>
                    <div className={settlementCardPriceDivStyle}>
                      <span>{convertToFa(state.discount)}</span>
                      <span>تومان</span>
                    </div>
                  </div>

                  <div className={shippingCostStyle}>
                    <div className={shippingCostTitleStyle}>
                      <span>هزینه ارسال</span>
                      <div className={settlementCardPriceDivStyle}>
                        <span>۰</span>
                        <span>تومان</span>
                      </div>
                    </div>

                    <div className={shippingCostDescriptionStyle}>
                      <span className="pt-0.5 md:hidden">{warningIcon}</span>
                      <span className="hidden md:block">
                        {warningDesktopIcon}
                      </span>
                      <p className="text-justify leading-5 font-medium">
                        هزینه ارسال در ادامه بر اساس آدرس، زمان و نحوه ارسال
                        انتخابی شما محاسبه و به این مبلغ اضافه خواهد شد.
                      </p>
                    </div>
                  </div>

                  <div className={payableStyle}>
                    <span>مبلغ قابل پرداخت</span>
                    <div className={payableDivStyle}>
                      <span>{convertToFa(state.total)}</span>
                      <span>تومان</span>
                    </div>
                  </div>

                  <Link
                    to="/completion-of-information"
                    className={settlementCardButtonStyle}
                  >
                    <span>تکمیل اطلاعات</span>
                    <span className="md:hidden">{arrowLeftIcon}</span>
                    <span className="hidden md:block">
                      {arrowLeftDesktopIcon}
                    </span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <EmptyShoppingCart />
      )}
    </div>
  );
};

export default ShopCart;
