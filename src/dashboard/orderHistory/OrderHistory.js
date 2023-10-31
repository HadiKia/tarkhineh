import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import EmptyHistory from "./EmptyHistory";
import SideBar from "../SideBar";
import moment from "moment-jalaali";
import { convertToFa, enToFa } from "../../components/helper/functions";

// Icons
import { arrowRightIcon } from "../../icons/shopCartIcons";
import { calendarIcon } from "../../icons/orderHistoryIcons";
import { wallet2Icon } from "../../icons/paymentIcons";
// Styles
import { headerStyle } from "../../components/shopping-cart/ShopCart";
import { Link } from "react-router-dom";
const containerStyle =
  "container max-w-[1224px] mx-auto px-5 min-h-[calc(100vh_-_239px)] md:min-h-[calc(100vh_-_434px)] md:flex md:gap-x-6";
const sideBarDivStyle =
  "hidden md:block flex-1 md:max-w-[182px] lg:max-w-[248px]";
const mainStyle =
  "md:mt-10 flex-1 md:w-[400px] lg:w-[712px] md:border md:border-[#CBCBCB] md:rounded-md md:p-6 md:pb-0 mb-6 md:mb-12";
const liMainStyle =
  "p-3 pb-2 border rounded-md border-[#CBCBCB] mb-3 md:p-6 md:pb-3.5 md:mb-4";
const liTitleDivStyle = "flex flex-col gap-y-2 mb-4";
const liTitleDivITemStyle =
  "flex items-center gap-x-1 text-xs text-[#717171] md:text-sm";
const ulItemStyle =
  "flex overflow-auto overflow-y-hidden gap-x-2 pb-2 md:pb-4 md:gap-x-3";
const liItemStyle =
  "h-[132px] md:h-[170px] border rounded-lg border-[#CBCBCB] overflow-hidden text-xs text-[#353535] flex flex-col items-center justify-between gap-y-1 pb-2 md:text-sm";
const itemImgStyle = "w-[90px] h-[70px] md:w-[150px] md:h-[110px]";
const itemQuantityStyle =
  "absolute left-1 bottom-1 bg-[#E5F2E9] text-[#417F56] px-[3px] rounded font-medium   md:px-1";
const itemTitleStyle = "w-[90px] text-center font-medium md:w-[150px]";

// Load Persian settings for moment
moment.loadPersian({ usePersianDigits: true, dialect: "persian-modern" });
moment.locale("fa");

const OrderHistory = () => {
  const purchaseHistory = useSelector(
    (state) => state.cartState.purchaseHistory
  );

  useEffect(() => {
    document.title = "تاریخچه سفارشات";
  }, []);

  return (
    <div className={containerStyle}>
      <div className={sideBarDivStyle}>
        <SideBar />
      </div>

      <div className={mainStyle}>
        {/* Header */}
        <div
          className={`${headerStyle} md:!block !justify-center relative mt-6 md:mt-0 md:text-[22px] md:border-b md:border-[#CBCBCB] md:pb-2`}
        >
          <Link to="/dashboard" className="absolute right-0 md:hidden">
            {arrowRightIcon}
          </Link>
          <h2 className="pl-2">تاریخچه سفارشات</h2>
        </div>

        {purchaseHistory.length ? (
          <ul>
            {purchaseHistory.map((order, index) => (
              <li key={index} className={liMainStyle}>
                <div className={liTitleDivStyle}>
                  <div className={liTitleDivITemStyle}>
                    <span className="md:scale-110">{calendarIcon}</span>
                    <span>
                      تاریخ:
                      {moment(order.date).format(
                        "dddd jYYYY/jMM/jDD - ساعت: HH:mm "
                      )}
                    </span>
                  </div>
                  <div className={liTitleDivITemStyle}>
                    <span className="md:scale-110">{wallet2Icon}</span>
                    <span>مجموع قیمت : {convertToFa(order.total)} تومان</span>
                  </div>
                </div>

                <ul className={ulItemStyle}>
                  {order.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <div className={liItemStyle}>
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.title}
                            className={itemImgStyle}
                          />
                          <span className={itemQuantityStyle}>
                            {enToFa(item.quantity)}×
                          </span>
                        </div>
                        <p className={itemTitleStyle}>{item.title}</p>
                        <p>{convertToFa(item.price)} تومان</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <div className="md:mt-2 mb-10">
            <EmptyHistory />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
