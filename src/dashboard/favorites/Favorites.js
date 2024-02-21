import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import {
  filterProducts,
  searchProducts,
  getInitialQuery,
} from "../../components/helper/functions";

// Components
import SideBar from "../SideBar";
import EmptyFavorites from "./EmptyFavorites";
import Favorite from "./Favorite";
import Category from "../../components/shared/Category";

// Images
import notFoundImg from "../../images/match-not-found.png";

// Icons
import { arrowRightIcon } from "../../icons/shopCartIcons";

// Styles
import { headerStyle } from "../../components/shopping-cart/ShopCart";
import {} from "../../components/home/HomePageMenu";
import {
  mainContainerStyle,
  notFoundResultsStyle,
} from "../../components/menu/Foods";
import SearchProduct from "../../components/shared/SearchProduct";

const Favorites = () => {
  const productsState = useSelector((state) => state.favoriteState);
  const [displayed, setDisplayed] = useState([]);

  const [query, setQuery] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    document.title = "علاقمندی ها";
    setDisplayed(productsState.selectedItems);
    setQuery(getInitialQuery(searchParams));
  }, [productsState]);

  useEffect(() => {
    setSearchParams(query);
    let finalProducts = searchProducts(
      productsState.selectedItems,
      query.search
    );
    finalProducts = filterProducts(finalProducts, query.category);

    setDisplayed(finalProducts);
  }, [query]);

  return (
    <div className="container max-w-[1224px] mx-auto px-5 min-h-[calc(100vh_-_239px)] md:min-h-[calc(100vh_-_434px)] md:flex md:gap-x-6">
      <div className="hidden md:block flex-1 md:max-w-[182px] lg:max-w-[248px]">
        <SideBar />
      </div>

      <div className="md:mt-10 flex-1 md:w-[400px] lg:w-[712px] md:border md:border-[#CBCBCB] md:rounded-md md:p-6 md:mb-12">
        {/* Header */}
        <div
          className={`${headerStyle} md:!block !justify-center relative mt-6 md:mt-0 md:text-[22px] md:border-b md:border-[#CBCBCB] md:pb-2`}
        >
          <Link to="/dashboard" className="absolute right-0 md:hidden">
            {arrowRightIcon}
          </Link>
          <p className="pl-2">علاقمندی ها</p>
        </div>
        <div className="lg:flex lg:items-center lg:justify-between lg:gap-x-2 md:mb-7 ">
          {/* category box */}
          <div className="-mx-5 hidden md:block">
            <Category setQuery={setQuery} />
          </div>

          {/* search box */}
          <SearchProduct query={query} setQuery={setQuery} />
        </div>

        {displayed.length ? (
          <div
            className={` ${mainContainerStyle} !grid-cols-2 xl:!grid-cols-3 !gap-x-4 !gap-y-5 !mb-5 !mx-0`}
          >
            {displayed.map((product) => (
              <Favorite key={product.id} productData={product} />
            ))}
          </div>
        ) : (
          query.search &&
          !displayed.length && (
            <div className={notFoundResultsStyle}>
              <h3>موردی با این مشخصات پیدا نکردیم!</h3>
              <img
                src={notFoundImg}
                alt="not found"
                className="w-[152px] md:w-[390px]"
              />
            </div>
          )
        )}

        {!displayed.length && !query.search && <EmptyFavorites />}
      </div>
    </div>
  );
};

export default Favorites;
