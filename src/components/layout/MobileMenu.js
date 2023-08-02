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
  menuBoradIcon,
  hashtagIcon,
  profile2userIcon,
  callingIcon,
} from "../../icons/mobileMenuIcons";

// styles
const bgMenu =
  "absolute top-0 left-0 right-0 h-screen z-10 bg-black bg-opacity-60 backdrop-blur-sm";
const mobileMenu = "absolute top-0 right-0 z-10 w-[16em] duration-700";
const closeIconStyle = "absolute top-[18px] right-[13.5em]";
const logoMobileStyle = "absolute right-4 top-8";
const ulStyle =
  "text-right flex flex-col gap-y-2 h-screen bg-white w-[16em] px-4 py-2";
const liStyle =
  "flex items-center gap-x-2 text-[#353535] text-sm border-b borader-[#CBCBCB] pb-2";

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
            <RadioGroup.Option value="home">
              {({ checked }) => (
                <li
                  onClick={openMenu}
                  className={
                    checked
                      ? `${liStyle} text-[#417F56] font-medium`
                      : `${liStyle}`
                  }
                >
                  <span>{homeIcon}</span>
                  <span>صفحه اصلی</span>
                </li>
              )}
            </RadioGroup.Option>

            <RadioGroup.Option value="menu">
              {({ checked }) => (
                <li
                  onClick={openMenu}
                  className={
                    checked
                      ? `${liStyle} text-[#417F56] font-medium`
                      : `${liStyle}`
                  }
                >
                  <span>{menuBoradIcon}</span>
                  <span>منو</span>
                </li>
              )}
            </RadioGroup.Option>

            <RadioGroup.Option value="branch">
              {({ checked }) => (
                <li
                  onClick={openMenu}
                  className={
                    checked
                      ? `${liStyle} text-[#417F56] font-medium`
                      : `${liStyle}`
                  }
                >
                  <span>{hashtagIcon}</span>
                  <span>شعبه</span>
                </li>
              )}
            </RadioGroup.Option>

            <RadioGroup.Option value="aboutus">
              {({ checked }) => (
                <li
                  onClick={openMenu}
                  className={
                    checked
                      ? `${liStyle} text-[#417F56] font-medium`
                      : `${liStyle}`
                  }
                >
                  <span>{profile2userIcon}</span>
                  <span>درباره ما</span>
                </li>
              )}
            </RadioGroup.Option>

            <RadioGroup.Option value="calling">
              {({ checked }) => (
                <li
                  onClick={openMenu}
                  className={
                    checked
                      ? `${liStyle} text-[#417F56] font-medium border-none`
                      : `${liStyle} border-none`
                  }
                >
                  <span>{callingIcon}</span>
                  <span>تماس با ما</span>
                </li>
              )}
            </RadioGroup.Option>
          </ul>
        </RadioGroup>
      </div>
    </>
  );
};

export default MobileMenu;
