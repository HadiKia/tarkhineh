import React from "react";
import emptyPage from "../../images/empty-page.svg";

// Styles
import {
  containerStyle,
  imgBoxStyle,
  pStyle,
} from "../../components/shopping-cart/EmptyShoppingCart";

const EmptyHistory = () => {
  return (
    <div className={containerStyle}>
      <div
        style={{ "--image-url": `url(${emptyPage})` }}
        className={imgBoxStyle}
      >
        <p className={`${pStyle} px-1 sm:px-0 md:!text-lg`}>
          تاریخچه سفارشات شما خالی است!
        </p>
      </div>
    </div>
  );
};

export default EmptyHistory;
