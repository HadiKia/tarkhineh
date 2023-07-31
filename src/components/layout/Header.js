import React from "react";
import Hamburger from "./Hamburger";

// icons
import {
  logo,
  logoDesktop,
  cartIcon,
  cartIconDesktop,
  userIcon,
  userIconDesktop,
  searchIcon,
} from "../../icons/headerIcons";

// styles
const headerStyle =
  "container max-w-[1224px] mx-auto flex justify-between items-center h-[4em] md:h-[7.188em] px-[1.25em]";
const ulStyle = "flex items-center gap-x-[1.5em]";
const liStyle =
  "text-[#717171] text-sm lg:text-lg hover:font-bold border-b py-1 border-[#ffffff00] hover:text-[#417F56] hover:border-[#417F56] duration-500 cursor-pointer";
const buttonBoxStyle =
  "flex items-center gap-x-[0.25em] md:gap-x-[0.5em] justify-end";
const headerButtonStyle = "p-[0.25em] md:p-[0.5em] bg-[#E5F2E9] rounded-md";

const Header = () => {
  return (
    <div className="sticky top-0 z-10 bg-white">
      <header className={headerStyle}>
        <div className="md:hidden">
          <Hamburger />
        </div>

        <div>
          <span className="md:hidden">{logo}</span>
          <span className="hidden md:block">{logoDesktop}</span>
        </div>

        <div className="hidden md:block">
          <ul className={ulStyle}>
            <li className={liStyle}>صفحه اصلی</li>
            <li className={liStyle}>شعبه</li>
            <li className={liStyle}>منو</li>
            <li className={liStyle}>اعطای نمایندگی</li>
            <li className={liStyle}>درباره ما</li>
            <li className={liStyle}>تماس با ما</li>
          </ul>
        </div>

        <div className={buttonBoxStyle}>
          <button className={`${headerButtonStyle} hidden md:block`}>
            {searchIcon}
          </button>
          <button className={headerButtonStyle}>
            <span className="md:hidden"> {cartIcon} </span>
            <span className="hidden md:block"> {cartIconDesktop}</span>
          </button>
          <button className={headerButtonStyle}>
            <span className="md:hidden">{userIcon}</span>
            <span className="hidden md:block">{userIconDesktop}</span>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
