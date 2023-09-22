import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import FactorCart from "../completion-of-information/FactorCart";

// Actions
import { clear, checkout } from "../redux/cart/cartAction";

// Functions
import { convertToFa } from "../helper/functions";

// Icons
import { trashDesktopIcon } from "../../icons/shopCartIcons";
import { closeIcon } from "../../icons/mobileMenuIcons";
import {
  tickIcon,
  tickDesktopIcon,
} from "../../icons/completionOfInformationIcon";
import { card2Icon, card2DesktopIcon } from "../../icons/paymentIcons";

// Styles
import {
  containerStyle,
  dialogBgStyle,
  dialogDivStyle,
  dialogPanelStyle,
  dialogTitleStyle,
  dialogCloseButtonStyle,
  dialogPStyle,
  dialogButtonDivStyle,
  dialogButtonStyle,
  mainDivStyle,
  cartDivStyle,
  settlementCardStyle,
  settlementCardCartStyle,
  settlementCardPriceDivStyle,
  settlementCardDiscountStyle,
  shippingCostStyle,
  shippingCostTitleStyle,
  payableStyle,
  payableDivStyle,
  settlementCardButtonStyle,
} from "../completion-of-information/Factor";

const PaymentFactor = ({ paymentMethod }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cartState);

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className={containerStyle}>
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

      <div className={state.itemsCounter > 0 ? mainDivStyle : ""}>
        <div className={settlementCardCartStyle}>
          <div className={`${settlementCardPriceDivStyle} !text-[#353535]`}>
            <span>سبد خرید</span>
            <span className="text-sm">({convertToFa(state.itemsCounter)})</span>
          </div>
          <button
            onClick={() => {
              if (state.itemsCounter > 0) openModal();
            }}
            className={
              state.itemsCounter > 0 ? "text-[#353535]" : "text-[#CBCBCB]"
            }
          >
            {trashDesktopIcon}
          </button>
        </div>
        <div className={state.itemsCounter > 0 ? cartDivStyle : ""}>
          {state.selectedItems.map((item) => (
            <FactorCart key={item.id} data={item} />
          ))}
        </div>

        {state.itemsCounter > 0 && (
          <div className={settlementCardStyle}>
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
                  <span>۳۹,۰۰۰</span>
                  <span>تومان</span>
                </div>
              </div>
            </div>

            <div className={payableStyle}>
              <span>مبلغ قابل پرداخت</span>
              <div className={payableDivStyle}>
                <span>{convertToFa(state.total + 39000)}</span>
                <span>تومان</span>
              </div>
            </div>

            {paymentMethod === "cash" ? (
              <Link to="/successful-order" onClick={() => dispatch(checkout())} className={settlementCardButtonStyle}>
                <span className="md:hidden">{tickIcon}</span>
                <span className="hidden md:block">{tickDesktopIcon}</span>
                <span>ثبت سفارش</span>
              </Link>
            ) : (
              <Link to="/successful-payment" onClick={() => dispatch(checkout())} className={settlementCardButtonStyle}>
                <span className="md:hidden">{card2Icon}</span>
                <span className="hidden md:block">{card2DesktopIcon}</span>
                <span>تأیید و پرداخت</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentFactor;
