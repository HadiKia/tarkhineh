import React from 'react';
import { Link } from "react-router-dom";
import emptyPage from "../../images/empty-page.svg"

// Styles
import {containerStyle, imgBoxStyle, pStyle, linkStyle} from "../../components/shopping-cart/EmptyShoppingCart"


const EmptyFavorites = () => {
    return (
        <div className={containerStyle}>
          <div
            style={{ "--image-url": `url(${emptyPage})` }}
            className={imgBoxStyle}
          >
            <p className={`${pStyle} px-1 sm:px-0 md:!text-lg`}>شما هنوز هیچ محصولی را به علاقه‌مندی‌ها اضافه نکرده‌اید!</p>
            <Link to="/menu" className={`${linkStyle} !top-14 sm:!top-11 md:!top-[70px]`}>
              منوی رستوران
            </Link>
          </div>
        </div>
      );
};

export default EmptyFavorites;