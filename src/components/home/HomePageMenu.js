import React from "react";
import HomePageMenuItem from "./HomePageMenuItem";

// icons
import { searchIcon } from "../../icons/homePageIcons";

// images
import Maincourse from "../../images/main-course.png";
import Appetizer from "../../images/appetizer.png";
import Dessert from "../../images/dessert.png";
import Drink from "../../images/drink.png";
import { Link } from "react-router-dom";

// styles
import { searchBoxStyle, inputSearchStyle } from "../shared/SearchProduct"; 


const HomePageMenu = () => {
  return (
    <div className="text-center container max-w-[1224px] mx-auto mt-4 ">
      <div className="md:hidden px-5">
        <div className={searchBoxStyle}>
          <input type="text" placeholder="جستجو" className={inputSearchStyle} />
          <span>{searchIcon}</span>
        </div>
      </div>

      <h3 className="text-[#353535] font-bold mb-3 md:mb-5 lg:mb-8 md:mt-12 md:text-xl lg:text-2xl">
        منوی رستوران
      </h3>

      <div className="flex flex-col justify-center md:flex-row gap-y-10">
        <div className="flex items-center justify-center">
          <Link to="/menu">
            <HomePageMenuItem image={Maincourse} title={"غذای اصلی"} />
          </Link>
          <Link to="/menu">
            <HomePageMenuItem image={Appetizer} title={"پیش غذا"} />
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <Link to="/menu">
            <HomePageMenuItem image={Dessert} title={"دسر"} />
          </Link>
          <Link to="/menu">
            <HomePageMenuItem image={Drink} title={"نوشیدنی"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePageMenu;
