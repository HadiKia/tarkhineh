import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import MobileMenu from "./MobileMenu";
import { useSelector } from "react-redux";

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
  "text-[#717171] text-sm lg:text-lg border-b border-[#ffffff00] py-1 duration-500";
const liActiveStyle = '!text-[#417F56] text-sm lg:text-lg border-b border-[#417F56] py-1 font-bold duration-500 '
const buttonBoxStyle =
  "flex items-center gap-x-[0.25em] md:gap-x-[0.5em] justify-end";
const headerButtonStyle = "p-[0.25em] md:p-[0.5em] bg-[#E5F2E9] rounded-md relative";
const itemsCounterStyle = "absolute -top-1 -right-1.5 text-[10px] text-white bg-[#61AE7B] rounded-full px-1  md:right-0.5 md:top-0.5 font-medium"

const Header = () => {
  let [plan, setPlan] = useState("home");
  const state = useSelector(state => state.cartState)

  return (
    <div className="sticky top-0 z-10 bg-white shadow-md">
      <header className={headerStyle}>
        <div className="md:hidden">
          <MobileMenu />
        </div>

        <div>
          <span className="md:hidden">{logo}</span>
          <span className="hidden md:block md:scale-[.8] lg:scale-100">{logoDesktop}</span>
        </div>

        <div className="hidden md:block">
          <RadioGroup value={plan} onChange={setPlan}>
            <ul className={ulStyle}>
              <RadioGroup.Option value="home">
                {({ checked }) => (
                  <li className={ checked ? `${liActiveStyle} ` : `${liStyle}` } >صفحه اصلی</li>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="branch">
                {({ checked }) => (
                  <li className={ checked ? `${liActiveStyle}` : `${liStyle}` } >شعبه</li>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="menu">
                {({ checked }) => (
                  <li className={ checked ? `${liActiveStyle}` : `${liStyle}` } >منو</li>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="franchise">
                {({ checked }) => (
                  <li className={ checked ? `${liActiveStyle}` : `${liStyle}` } >اعطای نمایندگی</li>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="aboutus">
                {({ checked }) => (
                  <li className={ checked ? `${liActiveStyle}` : `${liStyle}` } >درباره ما</li>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="calling">
                {({ checked }) => (
                  <li className={ checked ? `${liActiveStyle}` : `${liStyle}` } >تماس با ما</li>
                )}
              </RadioGroup.Option>
            </ul>
          </RadioGroup>
        </div>

        <div className={buttonBoxStyle}>
          <button className={`${headerButtonStyle} hidden md:block`}>
            {searchIcon}
          </button>
          <button className={headerButtonStyle}>
            <span className="md:hidden"> {cartIcon} </span>
            <span className="hidden md:block"> {cartIconDesktop}</span>
            <span className={itemsCounterStyle}>{convertToFa(state.itemsCounter)}</span>
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
