import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Banner from "../shared/Banner";
import Food from "./Food";
import Category from "../shared/Category";
import ReactLoading from "react-loading";

// Redux
import { fetchProducts } from "../redux/products/productsAction";

// images
import notFoundImg from "../../images/match-not-found.png";

// icons
import {
  shoppingCartDesktopIcon,
  shoppingCartIcon,
} from "../../icons/foodsPageIcons";

// styles
import { Link } from "react-router-dom";
import SearchProduct from "../shared/SearchProduct";
const tabGroupStyle =
  "container max-w-[1224px] mx-auto flex items-center justify-start px-5 text-[13px] gap-x-4 mb-2 md:text-base";
const tabGroupItemStyle =
  "font-semibold text-sm border-b border-[#417F56] py-[.6em] text-[#417F56] md:py-[1.188em] md:text-base md:border-b-2";
const cartButtonStyle =
  "absolute left-5 -top-1.5 flex items-center gap-x-1 text-[#417F56] py-1.5 px-2 text-sm border border-[#417F56] rounded-md md:gap-x-2 md:px-7 md:text-base md:rounded lg:py-[7px] lg:px-7 xl:py-2 xl:px-8";
export const mainContainerStyle =
  "mx-5 mb-6 grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-6 md:mb-11 ";
const categoryTitleStyle =
  "text-[#353535] font-bold text-lg md:col-span-2 md:text-xl xl:text-2xl";
export const notFoundResultsStyle =
  "min-h-[calc(100vh_-_590px)] sm:min-h-[calc(100vh_-_670px)] text-[#353535] flex flex-col justify-center items-center gap-y-4 text-sm my-14 sm:mt-20 md:text-xl md:gap-y-8";

export const categorizeProducts = (products) => {
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
    if (!productsState.products.length) dispatch(fetchProducts());
    document.title = "منو";
  }, [dispatch, productsState.products.length]);

  return (
    <>
      <Banner />

      {/* tab groups */}
      <div className="bg-[#EDEDED] text-[#717171]">
        <div className={tabGroupStyle}>
          <button className={tabGroupItemStyle}>غذای اصلی</button>
          <button>پیش غذا</button>
          <button>دسر</button>
          <button>نوشیدنی</button>
        </div>
      </div>

      <div className="container max-w-[1224px] mx-auto flex flex-col md:flex-row md:mb-7 md:justify-between">
        {/* category box */}
        <Category
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* search box */}
        <div className="px-5">
          <SearchProduct
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </div>
      </div>

      {/* shopping cart button */}
      <div className="relative container max-w-[1224px] mx-auto">
        <Link to="/cart" className={cartButtonStyle}>
          <span className="md:hidden">{shoppingCartIcon}</span>
          <span className="hidden md:block">{shoppingCartDesktopIcon}</span>
          <span>تکمیل خرید</span>
        </Link>
      </div>

      {/* products */}
      {productsState.loading ? (
        <>
          <div className="min-h-[calc(100vh_-_575px)] sm:min-h-[calc(100vh_-_615px)] flex justify-center mt-10 sm:mt-20 md:hidden">
            <ReactLoading
              type="bubbles"
              color="#417F56"
              height={60}
              width={60}
            />
          </div>
          <div className="hidden min-h-[calc(100vh_-_60vh)]  md:flex justify-center mt-32 ">
            <ReactLoading
              type="bubbles"
              color="#417F56"
              height={75}
              width={75}
            />
          </div>
        </>
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
              <div className="container max-w-[1224px] mx-auto" key={category}>
                <div key={category} className={mainContainerStyle}>
                  <h3 className={categoryTitleStyle}>{category}</h3>
                  {filteredProducts.map((product) => (
                    <Food key={product.id} productData={product} />
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })
      )}
      {!foundResults && !productsState.loading && (
        <div className={notFoundResultsStyle}>
          <h3>موردی با این مشخصات پیدا نکردیم!</h3>
          <img
            src={notFoundImg}
            alt="not found"
            className="w-[152px] md:w-[390px]"
          />
        </div>
      )}
    </>
  );
};

export default Foods;
