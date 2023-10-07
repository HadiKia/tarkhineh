import React, { useState } from "react";
import MobileMenu from "./MobileMenu";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SignUp from "../shared/SignUp";

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
const liActiveStyle =
  "text-[#417F56] text-sm lg:text-lg border-b py-1 border-[#417F56] font-bold duration-500";
const linkBoxStyle =
  "flex items-center gap-x-2.5 md:gap-x-[0.5em] justify-end";
const linkBoxItemStyle =
  "p-[0.25em] md:p-[0.5em] bg-[#E5F2E9] text-[#417F56] rounded md:rounded-md scale-[1.2] md:scale-100 relative duration-300";
const linkBoxItemActiveStyle =
  "p-[0.25em] md:p-[0.5em] bg-[#417F56] text-white rounded md:rounded-md scale-[1.2] md:scale-100 relative duration-300";
const itemsCounterStyle =
  "absolute -top-1 -right-1.5 text-[10px] text-white bg-[#61AE7B] rounded-full px-1  md:right-0.5 md:top-0.5 font-medium";

const Header = () => {
  const URLs = [
    "https://tarkhineh.iran.liara.run/cart",
    "https://tarkhineh.iran.liara.run/completion-of-information",
    "https://tarkhineh.iran.liara.run/payment",
    "https://tarkhineh.iran.liara.run/dashboard",
    "https://tarkhineh.iran.liara.run/dashboard/profile",
    "https://tarkhineh.iran.liara.run/dashboard/order-history",
    "https://tarkhineh.iran.liara.run/dashboard/favorites",
    "https://tarkhineh.iran.liara.run/dashboard/address",
  ];
  const homeURL = "https://tarkhineh.iran.liara.run/home";
  const menuURL = "https://tarkhineh.iran.liara.run/menu";
  const aboutUsURL = "https://tarkhineh.iran.liara.run/about-us";
  const contactUsURL = "https://tarkhineh.iran.liara.run/contact-us";

  const state = useSelector((state) => state.cartState);
  const isLoggedIn = useSelector((state) => state.authState.isLoggedIn);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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
            <li
              className={
                window.location.href === homeURL ? liActiveStyle : liStyle
              }
            >
              <Link to="/">صفحه اصلی</Link>
            </li>
            <li className={liStyle}>شعبه</li>
            <li
              className={
                window.location.href === menuURL ? liActiveStyle : liStyle
              }
            >
              <Link to="/menu">منو</Link>
            </li>
            <li className={liStyle}>اعطای نمایندگی</li>
            <li
              className={
                window.location.href === aboutUsURL ? liActiveStyle : liStyle
              }
            >
              <Link to="/about-us">درباره ما</Link>
            </li>
            <li
              className={
                window.location.href === contactUsURL ? liActiveStyle : liStyle
              }
            >
              <Link to="/contact-us">تماس با ما</Link>
            </li>
          </ul>
        </div>

        <div className={linkBoxStyle}>
          <button className={`${linkBoxItemStyle} hidden md:block`}>
            {searchIcon}
          </button>

          <Link
            to="/cart"
            className={
              URLs.slice(0, 3).includes(window.location.href)
                ? linkBoxItemActiveStyle
                : linkBoxItemStyle
            }
          >
            <span className="md:hidden">{cartIcon}</span>
            <span className="hidden md:block">{cartIconDesktop}</span>
            {isLoggedIn && (
              <span className={itemsCounterStyle}>
                {convertToFa(state.itemsCounter)}
              </span>
            )}
          </Link>

          <button
            className={
              URLs.slice(3).includes(window.location.href)
                ? linkBoxItemActiveStyle
                : linkBoxItemStyle
            }
            onClick={() => {
              localStorage.getItem("phoneNumber")
                ? navigate("/dashboard")
                : openModal();
            }}
          >
            <span className="md:hidden">{userIcon}</span>
            <span className="hidden md:block">{userIconDesktop}</span>
          </button>
          <SignUp isOpen={isOpen} closeModal={closeModal} />
        </div>
      </header>
    </div>
  );
};

export default Header;
