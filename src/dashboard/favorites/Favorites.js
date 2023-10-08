import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { categorizeProducts } from "../../components/menu/Foods";

// Components
import SideBar from "../SideBar";
import EmptyFavorites from "./EmptyFavorites";
import Favorite from "./Favorite";

// Icons
import { arrowRightIcon } from "../../icons/shopCartIcons";
import { searchIcon } from "../../icons/homePageIcons";

import { arrowLeftIcon, searchDesktopIcon } from "../../icons/foodsPageIcons";

// Styles
import { headerStyle } from "../../components/shopping-cart/ShopCart";
import {
  searchBoxStyle,
  inputSearchStyle,
} from "../../components/home/HomePageMenu";
import {
  categoryBoxStyle,
  categoryItemStyle,
  mainContainerStyle,
  notFoundResultsStyle,
} from "../../components/menu/Foods";

const Favorites = () => {
  const state = useSelector((state) => state.favoriteState);
  const navigate = useNavigate();
  const categorizedProducts = categorizeProducts(state.selectedItems);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchText, setSearchText] = useState("");

  let foundResults = false;

  useEffect(() => {
    document.title = "علاقمندی ها";
  }, []);

  return (
    <div className="container max-w-[1224px] mx-auto px-5 min-h-[calc(100vh_-_239px)] md:min-h-[calc(100vh_-_466px)] md:flex md:gap-x-6">
      <div className="hidden md:block flex-1 md:max-w-[182px] lg:max-w-[248px]">
        <SideBar />
      </div>  

      <div className="md:mt-8 flex-1 min-h-[calc(100vh_-_465px)] lg:w-[712px]">
        {/* Header */}
        <div className={`${headerStyle} !justify-center relative mt-6`}>
          <button onClick={() => navigate("/dashboard")} className="absolute right-0">
            {arrowRightIcon}
          </button>
          <span className="pl-2">علاقمندی ها</span>
        </div>

        {state.selectedItems.length ? (
          <>
            <div className="md:flex justify-between md:gap-x-2">
              {/* category box */}
              <div className={`hidden md:flex ${categoryBoxStyle} !px-0`}>
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={categoryItemStyle}
                >
                  <span>همه</span>
                  <span>{arrowLeftIcon}</span>
                </button>
                <button
                  onClick={() => setSelectedCategory("غذاهای ایرانی")}
                  className={categoryItemStyle}
                >
                  <span className="w-[67px]">غذاهای ایرانی</span>
                  <span>{arrowLeftIcon}</span>
                </button>
                <button
                  onClick={() => setSelectedCategory("غذاهای غیر ایرانی")}
                  className={categoryItemStyle}
                >
                  <span className="w-[86px]">غذاهای غیر ایرانی</span>
                  <span>{arrowLeftIcon}</span>
                </button>
                <button
                  onClick={() => setSelectedCategory("پیتزاها")}
                  className={categoryItemStyle}
                >
                  <span>پیتزاها</span>
                  <span>{arrowLeftIcon}</span>
                </button>
                <button
                  onClick={() => setSelectedCategory("ساندویچ‌ها")}
                  className={categoryItemStyle}
                >
                  <span>ساندویچ‌ها</span>
                  <span>{arrowLeftIcon}</span>
                </button>
              </div>

              {/* search box */}
              <div className={`${searchBoxStyle} lg:!w-[351px] !mx-0`}>
                <input
                  type="text"
                  placeholder="جستجو"
                  className={inputSearchStyle}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <span className="lg:hidden">{searchIcon}</span>
                <span className="hidden lg:block">{searchDesktopIcon}</span>
              </div>
            </div>

            {Object.keys(categorizedProducts).map((category) => {
              const filteredProducts = categorizedProducts[category].filter(
                (product) =>
                  (selectedCategory === "all" ||
                    product.category === selectedCategory) &&
                  product.title.includes(searchText)
              );

              if (filteredProducts.length > 0) {
                foundResults = true;
                return (
                  <div key={category}>
                    <div
                      key={category}
                      className={` ${mainContainerStyle} !grid-cols-2 lg:!grid-cols-3 !gap-x-4 !gap-y-5 !mb-5 !mx-0 `}
                    >
                      {filteredProducts.map((product) => (
                        <Favorite key={product.id} productData={product} />
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            })}


            {!foundResults && (
              <div className={notFoundResultsStyle}>
                <h3>محصولی مرتبط با "{searchText} {selectedCategory}" پیدا نشد</h3>
              </div>
            )}
          </>
        ) : (
          <div className="md:mt-2"><EmptyFavorites /> </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
