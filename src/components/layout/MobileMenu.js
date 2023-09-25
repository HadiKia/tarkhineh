import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";

// images
import TopFrame from "../../images/top-frame.png";
import LogoMobile from "../../images/logo-mobile-menu.png";

// icons
import {
  menuIcon,
  closeIcon,
  homeIcon,
  menuBoardIcon,
  hashtagIcon,
  profile2userIcon,
  callingIcon,
} from "../../icons/mobileMenuIcons";
import { Link } from "react-router-dom";

// styles
const bgMenu =
  "absolute top-0 left-0 right-0 h-screen z-10 bg-black bg-opacity-60 backdrop-blur-sm";
const mobileMenu = "absolute top-0 right-0 z-10 w-[16em] duration-700";
const closeIconStyle = "absolute top-[18px] right-[13.5em] text-white";
const logoMobileStyle = "absolute right-4 top-8";
const ulStyle =
  "text-right flex flex-col gap-y-2 min-h-[calc(100vh_-_94px)] bg-white w-[16em] px-4 py-2";
const liStyle =
  "flex items-center gap-x-2 text-[#353535] text-sm border-b border-[#CBCBCB] pb-2";

const MobileMenu = () => {
  const open = true;
  const [menu, setMenu] = useState(open);
  let [plan, setPlan] = useState("home");

  const openMenu = () => {
    setMenu(!menu);
  };

  return (
    <>
      <div onClick={openMenu}>{menuIcon}</div>

      <div onClick={openMenu} className={menu ? "hidden" : bgMenu}></div>
      <div
        className={
          menu
            ? `${mobileMenu} translate-x-full`
            : `${mobileMenu} translate-x-0`
        }
      >
        <img src={TopFrame} alt="frame" />
        <button onClick={openMenu} className={closeIconStyle}>
          {" "}
          {closeIcon}{" "}
        </button>
        <img src={LogoMobile} alt="logo" className={logoMobileStyle} />

        <RadioGroup value={plan} onChange={setPlan}>
          <ul className={ulStyle}>
            <li onClick={openMenu}>
              <Link to="/" className={liStyle}>
                <span>{homeIcon}</span>
                <span>صفحه اصلی</span>
              </Link>
            </li>

            <li onClick={openMenu}>
              <Link to="/menu" className={liStyle}>
                <span>{menuBoardIcon}</span>
                <span>منو</span>
              </Link>
            </li>

            <li onClick={openMenu} className={liStyle}>
              <span>{hashtagIcon}</span>
              <span>شعبه</span>
            </li>

            <li onClick={openMenu}>
              <Link to="/about-us" className={liStyle}>
                <span>{profile2userIcon}</span>
                <span>درباره ما</span>
              </Link>
            </li>

            <li onClick={openMenu} >
              <Link to="/contact-us" className={liStyle}>
              <span>{callingIcon}</span>
              <span>تماس با ما</span>
              </Link>
            </li>
          </ul>
        </RadioGroup>
      </div>
    </>
  );
};

export default MobileMenu;
