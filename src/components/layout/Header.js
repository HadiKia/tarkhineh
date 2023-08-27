import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import MobileMenu from "./MobileMenu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// functions
import { convertToFa } from "../helper/functions";

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
const ulStyle = "flex items-center md:gap-x-5 lg:gap-x-6";
const liStyle =
  "text-[#717171] text-sm lg:text-lg border-b border-[#ffffff00] py-1 hover:text-[#417F56] hover:border-[#417F56] hover:font-bold duration-500";
const buttonBoxStyle =
  "flex items-center gap-x-[0.25em] md:gap-x-[0.5em] justify-end";
const headerButtonStyle =
  "p-[0.25em] md:p-[0.5em] bg-[#E5F2E9] rounded-md relative";
const itemsCounterStyle =
  "absolute -top-1 -right-1.5 text-[10px] text-white bg-[#61AE7B] rounded-full px-1  md:right-0.5 md:top-0.5 font-medium";

const Header = () => {
  const state = useSelector((state) => state.cartState);

  return (
    <div className="sticky top-0 z-10 bg-white shadow-md">
      <header className={headerStyle}>
        <div className="md:hidden">
          <MobileMenu />
        </div>

        <div>
          <span className="md:hidden">{logo}</span>
          <span className="hidden md:block md:scale-[.8] lg:scale-100">
            {logoDesktop}
          </span>
        </div>

        <div className="hidden md:block">
          <ul className={ulStyle}>
            <li>
              <Link to="/" className={liStyle}>صفحه اصلی</Link>
            </li>
            <li className={liStyle}>شعبه</li>
            <li>
              <Link to="/menu" className={liStyle}>منو</Link>
            </li>
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
            <Link to="/cart" className="md:hidden">{cartIcon}</Link>
            <Link to="/cart" className="hidden md:block">{cartIconDesktop}</Link>
            <span className={itemsCounterStyle}>
              {convertToFa(state.itemsCounter)}
            </span>
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
