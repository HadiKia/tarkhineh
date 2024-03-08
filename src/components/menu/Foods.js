import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../features/product/productSlice";
import Banner from "../shared/Banner";
import Food from "./Food";
import Category from "../shared/Category";
import { RotatingLines } from "react-loader-spinner";
import {
  filterProducts,
  searchProducts,
  getInitialQuery,
} from "../../helper/functions";

import notFoundImg from "../../images/match-not-found.png";

// styles
import SearchProduct from "../shared/SearchProduct";
const tabGroupStyle =
  "container max-w-[1224px] mx-auto flex items-center justify-start px-5 text-[13px] gap-x-4 mb-2 md:text-base";
const tabGroupItemStyle =
  "font-semibold text-sm border-b border-[#417F56] py-[.6em] text-[#417F56] md:py-[1.188em] md:text-base md:border-b-2";
export const mainContainerStyle =
  "mx-5 mb-6 grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-6 md:mb-11";
export const notFoundResultsStyle =
  "min-h-[calc(100vh_-_590px)] sm:min-h-[calc(100vh_-_670px)] text-[#353535] flex flex-col justify-center items-center gap-y-4 text-sm my-14 sm:mt-20 md:text-xl md:gap-y-8";

const Foods = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const [displayed, setDisplayed] = useState([]);
  const [query, setQuery] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchProducts());
    document.title = "منو";
  }, []);

  useEffect(() => {
    setDisplayed(products);
    setQuery(getInitialQuery(searchParams));
  }, [products]);

  useEffect(() => {
    setSearchParams(query);
    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);

    setDisplayed(finalProducts);
  }, [query]);

  return (
    <>
      <Banner />

      {/* tab groups */}
      <div className="bg-[#EDEDED] text-[#717171]">
        <div className={tabGroupStyle}>
          <button className={tabGroupItemStyle}>غذای اصلی</button>
          <button className="py-[.6em]">پیش غذا</button>
          <button className="py-[.6em]">دسر</button>
          <button className="py-[.6em]">نوشیدنی</button>
        </div>
      </div>

      <div className="container max-w-[1224px] mx-auto flex flex-col md:flex-row lg:mt-3.5 lg:mb-3.5 md:justify-between">
        {/* category box */}
        <Category query={query} setQuery={setQuery} />

        {/* search box */}
        <div className="px-5">
          <SearchProduct query={query} setQuery={setQuery} />
        </div>
      </div>

      {/* products */}
      {!displayed.length && loading && (
        <>
          <div className="min-h-[calc(100vh_-_535px)] flex justify-center">
            <RotatingLines
              height="50"
              width="50"
              strokeColor="#417F56"
              strokeWidth="2"
              animationDuration="2"
            />
          </div>
        </>
      )}
      {error && <h2 className="h-screen">{error}</h2>}
      {!displayed.length && !loading && query.search && (
        <div className={notFoundResultsStyle}>
          <h3>موردی با این مشخصات پیدا نکردیم!</h3>
          <img
            src={notFoundImg}
            alt="not found"
            className="w-[152px] md:w-[390px]"
          />
        </div>
      )}
      <div className="container max-w-[1224px] mx-auto min-h-[calc(100vh_-_530px)] md:min-h-[calc(100vh_-_700px)] ">
        <div className={mainContainerStyle}>
          {displayed.map((product) => (
            <Food key={product.id} productData={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Foods;
