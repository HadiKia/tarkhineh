import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import EmptyHistory from "./EmptyHistory";
import SideBar from "../SideBar";

// Icons
import { arrowRightIcon } from "../../icons/shopCartIcons";

// Styles
import { headerStyle } from "../../components/shopping-cart/ShopCart";
import { Link } from "react-router-dom";

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

      <div className="md:mt-10 flex-1 md:w-[400px] lg:w-[712px] md:border md:border-[#CBCBCB] md:rounded-md md:p-6 md:pb-0 md:mb-12">
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
         <div></div>
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
