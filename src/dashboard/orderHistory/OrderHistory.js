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
    <div className="container max-w-[1224px] mx-auto px-5 min-h-[calc(100vh_-_239px)] md:min-h-[calc(100vh_-_466px)] md:flex md:gap-x-6">
      <div className="hidden md:block flex-1 md:max-w-[182px] lg:max-w-[248px]">
        <SideBar />
      </div>

      <div className="md:mt-10 flex-1 md:w-[400px] lg:w-[712px] md:border md:border-[#CBCBCB] md:rounded-md md:p-6 md:pb-0 mb-6 md:mb-12">
        {/* Header */}
        <div
          className={`${headerStyle} md:!block !justify-center relative mt-6 md:mt-0 md:text-[22px] md:border-b md:border-[#CBCBCB] md:pb-2 !mb-5`}
        >
          <Link to="/dashboard" className="absolute right-0 md:hidden">
            {arrowRightIcon}
          </Link>
          <h2 className="pl-2">تاریخچه سفارشات</h2>
        </div>

        {purchaseHistory.length ? (
          <ul>
            {purchaseHistory.reverse().map((order, index) => (
              <li
                key={index}
                className="p-3 pb-2 border rounded-md border-[#CBCBCB] mb-3"
              >
                <div className="flex flex-col gap-y-2 mb-4">
                  <div className="flex items-center gap-x-1  text-xs text-[#717171]">
                    <span>{calendarIcon}</span>
                    <span>
                      تاریخ:
                      {moment(order.date).format(
                        "dddd jYYYY/jMM/jDD - ساعت: HH:mm "
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-x-1  text-xs text-[#717171] ">
                    <span>{wallet2Icon}</span>
                    <span>مجموع قیمت : {convertToFa(order.total)}</span>
                  </div>
                </div>

                <ul className="flex overflow-auto overflow-y-hidden gap-x-2 pb-2">
                  {order.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Link
                        to={`/menu/${item.slug}`}
                        className="h-[132px] border rounded-lg border-[#CBCBCB] overflow-hidden text-xs text-[#353535] flex flex-col items-center justify-between gap-y-1 pb-2"
                      >
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-[90px] h-[70px]"
                          />
                          <span className="absolute left-1 bottom-1 bg-[#E5F2E9] text-[#417F56] px-[3px] rounded-sm font-medium">
                            {enToFa(item.quantity)}×
                          </span>
                        </div>
                        <p className="w-[90px] text-center font-medium">
                          {item.title}
                        </p>
                        <p>{convertToFa(item.price)}</p>
                      </Link>
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
