import React from "react";
import HomePageMenuItem from "./HomePageMenuItem";

// icons 
import {searchIcon} from "../../icons/homePageIcons"

// images
import Maincourse from "../../images/main-course.png";
import Appetizer from "../../images/appetizer.png";
import Dessert from "../../images/dessert.png";
import Drink from "../../images/drink.svg";

// styles 
const searchBoxStyle = 'flex items-center justify-between px-4 mx-5 h-9 border border-[#CBCBCB] rounded-md mb-[1.5em] md:hidden'
const inputStyle = 'bg-transparent outline-none text-[#353535] text-sm placeholder:text-xs placeholder:text-[#353535]'

const HomePageMenu = () => {
  return (
    <div className=" text-center container max-w-[1224px] mx-auto mt-4">
       <div className={searchBoxStyle} >
       <input type="text" placeholder="جستجو" className={inputStyle}/>
        <span>{searchIcon}</span>
       </div>

        <h3 className="text-[#353535] font-bold mb-3 md:mb-5 lg:mb-8 md:mt-12 md:text-xl lg:text-2xl">منوی رستوران</h3>

      <div className="flex flex-col justify-center md:flex-row gap-y-10">
        <div className="flex items-center justify-center">
          <HomePageMenuItem image={Maincourse} title={"غذای اصلی"} />
          <HomePageMenuItem image={Appetizer} title={"پیش غذا"} />
        </div>
        <div className="flex items-center justify-center">
          <HomePageMenuItem image={Dessert} title={"دسر"} />
          <HomePageMenuItem image={Drink} title={"نوشیدنی"} />
        </div>
      </div>
    </div>
  );
};

export default HomePageMenu;
