import React, { useState } from "react";
import SignOut from "../components/shared/SignOut";
import { Link } from "react-router-dom";
import { enToFa } from "../components/helper/functions";
import profileImg from "../images/profile.png";

// Icons
import {
  userIcon,
  userSolidIcon,
  walletIcon,
  walletSolidIcon,
  likeIcon,
  likeSolidIcon,
  locationIcon,
  locationSolidIcon,
  logOutIcon,
} from "../icons/sideBarIcons";

// Styles
const mainStyle =
  "mt-6 md:mt-10 md:px-2 md:py-4 md:rounded-lg md:border md:border-[#CBCBCB]";
const headerStyle =
  "flex items-center gap-x-2 pb-2 border-b border-[#757575] mb-4";
const profileImgStyle = "w-12 rounded-full border border-[#CBCBCB] lg:w-[88px]";
const headerInfoStyle = "flex flex-col gap-y-1 lg:gap-y-2";
const linkBoxStyle =
  "flex flex-col gap-y-2 md:gap-y-3 text-[#353535] text-xs md:text-sm";
const linkStyle =
  "px-2 border-r-2 border-white py-1 flex items-center gap-x-1 duration-500";
const linkActiveStyle =
  "px-2 border-r-2 border-[#417F56] text-[#417F56] text-[15px] font-medium py-1 flex items-center gap-x-1  duration-500 ";

const SideBar = () => {
  const profileURL = "https://tarkhineh.iran.liara.run/dashboard/profile";
  const orderHistoryURL =
    "https://tarkhineh.iran.liara.run/dashboard/order-history";
  const favoritesURL = "https://tarkhineh.iran.liara.run/dashboard/favorites";
  const addressURL = "https://tarkhineh.iran.liara.run/dashboard/address";

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={mainStyle}>
      <div className={headerStyle}>
        <img src={profileImg} alt="profile" className={profileImgStyle} />
        <div className={headerInfoStyle}>
          <p className="text-[#353535] flex gap-x-1 text-sm lg:text-base">
            <span>{localStorage.getItem("name")}</span>
            <span>{localStorage.getItem("lastName")}</span>
          </p>
          <span
            dir="ltr"
            className="text-[#717171] text-xs md:text-sm text-right"
          >
            {enToFa(localStorage.getItem("phoneNumber"))}
          </span>
        </div>
      </div>

      <div className={linkBoxStyle}>
        <Link
          to="/dashboard/profile"
          className={
            window.location.href === profileURL ? linkActiveStyle : linkStyle
          }
        >
          {window.location.href === profileURL ? (
            <span>{userSolidIcon}</span>
          ) : (
            <span>{userIcon}</span>
          )}
          <span>پروفایل</span>
        </Link>

        <Link
          to="/dashboard/order-history"
          className={
            window.location.href === orderHistoryURL
              ? linkActiveStyle
              : linkStyle
          }
        >
          {window.location.href === orderHistoryURL ? (
            <span>{walletSolidIcon}</span>
          ) : (
            <span>{walletIcon}</span>
          )}
          <span>پیگیری سفارشات</span>
        </Link>

        <Link
          to="/dashboard/favorites"
          className={
            window.location.href === favoritesURL ? linkActiveStyle : linkStyle
          }
        >
          {window.location.href === favoritesURL ? (
            <span>{likeSolidIcon}</span>
          ) : (
            <span>{likeIcon}</span>
          )}
          <span>علاقمندی ها</span>
        </Link>

        <Link
          to="/dashboard/address"
          className={
            window.location.href === addressURL ? linkActiveStyle : linkStyle
          }
        >
          {window.location.href === addressURL ? (
            <span>{locationSolidIcon}</span>
          ) : (
            <span>{locationIcon}</span>
          )}
          <span>آدرس های من</span>
        </Link>

        <button className={`${linkStyle} text-[#C30000]`} onClick={openModal}>
          <span>{logOutIcon}</span>
          <span>خروج</span>
        </button>
        <SignOut isOpen={isOpen} closeModal={closeModal} />
      </div>
    </div>
  );
};

export default SideBar;
