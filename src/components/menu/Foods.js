import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Banner from "../shared/Banner";

// Redux
import { fetchProducts } from "../redux/products/productsAction";
import Food from "./Food";

// icons
import { searchIcon } from "../../icons/homePageIcons";
import { arrowLeftIcon, shoppingCartIcon } from "../../icons/foodsPageIcons";

// styles
import { searchBoxStyle, inputSearchStyle } from "../home/HomePageMenu";
const tabGroupStyle =
  "flex items-center justify-start px-5 bg-[#EDEDED] text-[#717171] text-[13px] gap-x-4 mb-2";
const tabGroupItemStyle =
  "font-semibold text-sm border-b border-[#417F56] py-[.6em] text-[#417F56]";
const categoryBoxStyle =
  "flex items-center text-[11px] font-medium px-5 gap-x-2 overflow-scroll relative text-[#353535] mb-3";
const categoryItemStyle =
  "flex items-center rounded-[10px] gap-x-1 px-2 py-1.5 bg-[#EDEDED] text-[#353535]";
const cartButtonStyle =
  "absolute left-5 top-[315px] flex items-center gap-x-1 text-[#417F56] py-1.5 px-2 text-sm border border-[#417F56] rounded-md";
const mainContainerStyle =
  "mb-6 grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-6";
const categoryTitleStyle =
  "px-5 text-[#353535] font-bold text-lg md:col-span-2";
const notFoundResultsStyle = "h-screen flex justify-center mt-20";

const categorizeProducts = (products) => {
  const categorized = {};

  products.forEach((product) => {
    if (categorized[product.category]) {
      categorized[product.category].push(product);
    } else {
      categorized[product.category] = [product];
    }
  });

  return categorized;
};

const Foods = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.productsState);
  const categorizedProducts = categorizeProducts(productsState.products);

  let foundResults = false;

  useEffect(() => {
    dispatch(fetchProducts());
    document.title = "منو";
  }, []);

  return (
    <div className="relative">
      <Banner />

      {/* tab groups */}
      <div className={tabGroupStyle}>
        <button className={tabGroupItemStyle}>غذای اصلی</button>
        <button>پیش غذا</button>
        <button>دسر</button>
        <button>نوشیدنی</button>
      </div>

      <div className="flex flex-col">
        {/* category box */}
        <div className={categoryBoxStyle}>
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
            <span className="w-[62px]">غذاهای ایرانی</span>
            <span>{arrowLeftIcon}</span>
          </button>
          <button
            onClick={() => setSelectedCategory("غذاهای غیر ایرانی")}
            className={categoryItemStyle}
          >
            <span className="w-20">غذاهای غیر ایرانی</span>
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
        <div className={searchBoxStyle}>
          <input
            type="text"
            placeholder="جستجو"
            className={inputSearchStyle}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <span>{searchIcon}</span>
        </div>
      </div>

      {/* shopping cart button */}
      <button className={cartButtonStyle}>
        <span>{shoppingCartIcon}</span>
        <span>تکمیل خرید</span>
      </button>

      {/* products */}
      {productsState.loading ? (
        <h2 className="h-screen flex justify-center mt-20">loading ...</h2>
      ) : productsState.error ? (
        <h2 className="h-screen">{productsState.error}</h2>
      ) : (
        Object.keys(categorizedProducts).map((category) => {
          const filteredProducts = categorizedProducts[category].filter(
            (product) =>
              (selectedCategory === "all" ||
                product.category === selectedCategory) &&
              product.title.includes(searchText)
          );

          if (filteredProducts.length > 0) {
            foundResults = true;
            return (
              <div key={category} className={mainContainerStyle}>
                <h3 className={categoryTitleStyle}>{category}</h3>
                {filteredProducts.map((product) => (
                  <Food key={product.id} productData={product} />
                ))}
              </div>
            );
          }
          return null;
        })
      )}
      {!foundResults && !productsState.loading && (
        <div className={notFoundResultsStyle}>
          <h3>محصولی مرتبط با "{searchText}" پیدا نشد</h3>
        </div>
      )}
    </div>
  );
};

export default Foods;
