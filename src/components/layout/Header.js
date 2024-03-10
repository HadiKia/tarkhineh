import React, { useState } from "react";
import MobileMenu from "./MobileMenu";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SignUp from "../shared/SignUp";
import { pages } from "../../constants/list";

// functions
import { convertToFa } from "../../helper/functions";

// URLs
import { headerButtonURLs } from "../../constants/URLs";

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
const liActiveStyle = `${liStyle} !text-[#417F56] !border-[#417F56] font-bold`;
const linkBoxStyle = "flex items-center gap-x-2.5 md:gap-x-[0.5em] justify-end";
const linkBoxItemStyle =
  "p-[0.25em] md:p-[0.5em] bg-[#E5F2E9] text-[#417F56] rounded md:rounded-md scale-[1.2] md:scale-100 relative duration-300";
const linkBoxItemActiveStyle = `${linkBoxItemStyle} !bg-[#417F56] !text-white`;
const itemsCounterStyle =
  "absolute -top-1 -right-1.5 text-[10px] text-white bg-[#61AE7B] rounded-full px-1  md:right-0.5 md:top-0.5 font-medium";

const Header = () => {
  const cartState = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);
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
            {pages.map((item) => (
              <li
                key={item.id}
                className={
                  window.location.href ===
                  `https://tarkhineh-app.liara.run/${item.url}`
                    ? liActiveStyle
                    : liStyle
                }
              >
                <Link to={item.url}>{item.type}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={linkBoxStyle}>
          <button className={`${linkBoxItemStyle} hidden md:block`}>
            {searchIcon}
          </button>

          <Link
            to="/cart"
            className={
              headerButtonURLs.slice(0, 3).includes(window.location.href)
                ? linkBoxItemActiveStyle
                : linkBoxItemStyle
            }
          >
            <span className="md:hidden">{cartIcon}</span>
            <span className="hidden md:block">{cartIconDesktop}</span>
            {isLoggedIn && cartState.itemsCounter > 0 && (
              <span className={itemsCounterStyle}>
                {convertToFa(cartState.itemsCounter)}
              </span>
            )}
          </Link>

          <button
            className={
              headerButtonURLs.slice(3).includes(window.location.href)
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
