import React from "react";

// images
import IntroductionImg from "../../images/introduction.svg";

// icons
import {
  arrowLeftIcon,
  userIcon,
  lineChartIcon,
  homeWifiIcon,
  menuBoardIcon,
  userDesktopIcon,
  lineChartDesktopIcon,
  homeWifiDesktopIcon,
  menuBoardDesktopIcon,
  arrowLeftDesktopIcon,
} from "../../icons/introductionIcons";

// styles
const bgStyle =
  "mt-12 bg-[image:var(--image-url)] bg-cover bg-center text-white py-5 px-5 h-[21.188em] md:h-[24.375em] md:py-12 md:flex md:items-center md:mt-14 lg:mt-16 xl:mt-20";
const containerStyle =
  "container max-w-[1224px] mx-auto md:flex md:items-start lg:items-center md:px-1 xl:pr-6 xl:gap-x-5";
const h3Style = "mb-2 md:text-xl md:font-bold md:mb-6 lg:text-2xl";
const descriptionStyle =
  "text-[11px] leading-5 text-justify mb-2 md:text-[15px] md:leading-6 lg:text-base lg:text-xl xl:mb-8 xl:font-light";
const buttonBoxStyle = "flex justify-end mb-5";
const buttonStyle =
  "flex items-center justify-center gap-x-2 border border-white rounded h-8 w-[9.5em] md:h-[2.5em] lg:w-[11.5em]";
const buttonSpanStyle = "text-xs md:text-sm lg:text-base";
const featuresBoxStyle =
  "flex items-center justify-around mb-4 md:mb-8 lg:justify-evenly";
const featuresBoxItemStyle =
  "flex flex-col items-center gap-y-2 text-xs md:text-base";

const Introduction = () => {
  return (
    <div
      style={{ "--image-url": `url(${IntroductionImg})` }}
      className={bgStyle}
    >
      <div className={containerStyle}>
        <div className="md:flex-1">
          <h3 className={h3Style}>رستوران‌های زنجیره‌ای ترخینه</h3>
          <p className={descriptionStyle}>
            مهمان‌نوازی یکی از مهم‌ترین مشخصه‌های ایرانیان است و باعث افتخار
            ماست که بیش از 20 سال است خدمت‌گزار مردم شریف ایران هستیم. ما در
            رستوران‌های زنجیره‌ای ترخینه همواره تلاش کردیم که در محیطی اصیل بر
            پایه معماری و طراحی مدرن در کنار طبیعتی دلنواز، غذایی سالم و درخور
            شان شما عزیزان ارائه دهیم.
          </p>
          <div className={buttonBoxStyle}>
            <button className={buttonStyle}>
              <span className={buttonSpanStyle}>اطلاعات بیشتر</span>
              <span className="md:hidden">{arrowLeftIcon}</span>
              <span className="hidden md:block">{arrowLeftDesktopIcon}</span>
            </button>
          </div>
        </div>

        <div className="md:flex-1">
          <div className={featuresBoxStyle}>
            <div className={featuresBoxItemStyle}>
              <span className="md:hidden">{userIcon}</span>
              <span className="hidden md:block">{userDesktopIcon}</span>
              <span>پرسنلی مجرب و حرفه‌ای</span>
            </div>

            <div className={featuresBoxItemStyle}>
              <span className="md:hidden">{lineChartIcon}</span>
              <span className="hidden md:block">{lineChartDesktopIcon}</span>
              <span>کیفیت بالای غذاها</span>
            </div>
          </div>

          <div className={featuresBoxStyle}>
            <div className={featuresBoxItemStyle}>
              <span className="md:hidden">{homeWifiIcon}</span>
              <span className="hidden md:block">{homeWifiDesktopIcon}</span>
              <span>محیطی دلنشین و آرام</span>
            </div>

            <div className={featuresBoxItemStyle}>
              <span className="md:hidden">{menuBoardIcon}</span>
              <span className="hidden md:block">{menuBoardDesktopIcon}</span>
              <span>منوی متنوع</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
