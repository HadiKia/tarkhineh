import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { categorizeProducts } from "../../components/menu/Foods";

// Components
import SideBar from "../SideBar";
import EmptyFavorites from "./EmptyFavorites";
import Favorite from "./Favorite";
import Category from "../../components/shared/Category";

// Images
import notFoundImg from "../../images/match-not-found.png"

// Icons
import { arrowRightIcon } from "../../icons/shopCartIcons";
import { searchIcon } from "../../icons/homePageIcons";

import { searchDesktopIcon } from "../../icons/foodsPageIcons";

// Styles
import { headerStyle } from "../../components/shopping-cart/ShopCart";
import {
  searchBoxStyle,
  inputSearchStyle,
} from "../../components/home/HomePageMenu";
import {
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

      <div className="md:mt-10 flex-1 min-h-[calc(100vh_-_465px)] md:w-[400px] lg:w-[712px] md:border md:border-[#CBCBCB] md:rounded-md md:p-6 md:pb-0 md:mb-12">
        {/* Header */}
        <div
          className={`${headerStyle} md:!block !justify-center relative mt-6 md:mt-0 md:text-[22px] md:border-b md:border-[#CBCBCB] md:pb-2 !mb-5`}
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="absolute right-0 md:hidden"
          >
            {arrowRightIcon}
          </button>
          <p className="pl-2">علاقمندی ها</p>
        </div>

        {state.selectedItems.length ? (
          <>
            <div className="lg:flex lg:items-center lg:justify-between lg:gap-x-2 md:mb-7">
              {/* category box */}
              <div className="-mx-5 hidden md:block">
                <Category
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>

              {/* search box */}
              <div
                className={`${searchBoxStyle} bg-white  lg:!w-[351px] !mx-0`}
              >
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

            <div
              className={` ${mainContainerStyle} !grid-cols-2 xl:!grid-cols-3 !gap-x-4 !gap-y-5 !mb-5 !mx-0`}
            >
              {Object.keys(categorizedProducts).map((category) => {
                const filteredProducts = categorizedProducts[category].filter(
                  (product) =>
                    (selectedCategory === "all" ||
                      product.category === selectedCategory) &&
                    product.title.includes(searchText)
                );

                if (filteredProducts.length > 0) {
                  foundResults = true;
                  return filteredProducts.map((product) => (
                    <Favorite key={product.id} productData={product} />
                  ));
                }
                return null;
              })}
            </div>

            {!foundResults && (
               <div className={notFoundResultsStyle}>
               <h3>موردی با این مشخصات پیدا نکردیم!</h3>
               <img src={notFoundImg} alt="not found" className="w-[152px] md:w-[390px]"/>
             </div>
            )}
          </>
        ) : (
          <div className="md:mt-2">
            <EmptyFavorites />{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
