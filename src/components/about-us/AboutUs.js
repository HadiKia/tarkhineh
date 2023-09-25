import React, { useEffect } from "react";
import bannerImg from "../../images/about-us-banner.svg";
import aboutUsImg from "../../images/about-us.svg";

// icons
import {
  userIcon,
  lineChartIcon,
  homeWifiIcon,
  menuBoardIcon,
  userDesktopIcon,
  lineChartDesktopIcon,
  homeWifiDesktopIcon,
  menuBoardDesktopIcon,
} from "../../icons/introductionIcons";

// Styles
import { featuresBoxItemStyle } from "../home/Introduction";

const AboutUs = () => {
  useEffect(() => {
    document.title = "درباره ما";
  }, []);

  return (
    <div>
      <div
        style={{ "--image-url": `url(${bannerImg})` }}
        className="bg-[image:var(--image-url)] bg-cover bg-center relative w-full h-[176px] lg:h-[336px]"
      >
        <span className="text-[#E5F2E9] absolute text-center left-0 right-0 top-[45%] font-bold text-lg lg:text-3xl">
          درباره ترخینه بیشتر بدانید!
        </span>
      </div>

      <div className="container max-w-[1224px] mx-auto">
        <h2 className="text-[#353535] px-5 pt-4 pb-1 font-bold  md:text-xl lg:pt-12 lg:pb-6 xl:text-2xl">
          درباره ما
        </h2>

        <div className="text-[#717171] px-5 content text-[11px] leading-[17.5px] text-justify mb-4 min-h-[calc(100vh_-_520px)] md:text-base md:leading-[26px] lg:min-h-[calc(100vh_-_380px)] xl:text-lg xl:leading-8">
          <div
            style={{ "--image-url": `url(${aboutUsImg})` }}
            className="bg-[image:var(--image-url)] bg-cover bg-center float-left w-[152px] h-[120px] rounded mr-4 md:w-[400px] md:h-[300px] lg:w-[600px] lg:h-[492px] lg:mr-6"
          ></div>
          <p className="item-body">
            رستوران‌های زنجیره‌ای ترخینه در سال ۱۳۶۸ افتتاح گردیده‌اند و در طی
            این سال‌ها همواره با ارائه غذاهای باکیفیت و سرویس سریع و به موقع در
            تلاش برای جلب رضایت مشتریان خود بوده‌اند. در طی این سال‌ها اولویت
            جلب رضایت مشتریان بوده است.
            <br />
            دراین خصوص ترخینه همیشه در تلاش بوده تا در طی این زمان‌ها کیفیت
            غذاهای خود را در بهترین حالت نگه داشته و حتی با نوسانات قیمت‌های
            مواد اولیه در بازار قیمت خود را ثابت نگه داشته است. ترخینه شعبات
            خودرا افتتاح کرده که بسیار شیک و مدرن می‌باشند و برای برگزاری
            جشن‌های کوچک و بزرگ شما مشتریان عزیز توانایی پذیرایی با کیفیت بالا
            را دارند. سالن پذیرایی شعبات در دو طبقه مجزا به همراه راه پله مدرن و
            آسانسور برای افراد کم‌توان و سالخورده آماده ارائه سرویس به شما
            عزیزان می‌باشند.
            <br />
            چشم انداز: در آینده ای نزدیک تالار پذیرایی شعبات راه اندازی شده و
            آماده برگزاری جشن‌ها و مراسم‌های بزرگ شما خواهند بود . به امید آن
            روز که همه ایرانیان سالم و سلامت باشند.
          </p>
        </div>
      </div>

      <div className=" bg-[#EDEDED] ">
        <div className="container max-w-[1224px] mx-auto flex items-center justify-between gap-x-4 h-[76px] px-5 text-[#717171] text-center md:h-[166px] ">
          <div
            className={`${featuresBoxItemStyle} !gap-y-0.5 !text-[9.5px] md:!text-base`}
          >
            <span className="md:hidden text-[#353535]">{userIcon}</span>
            <span className="hidden md:block text-[#353535]">
              {userDesktopIcon}
            </span>
            <span>پرسنلی مجرب و حرفه‌ای</span>
          </div>

          <div
            className={`${featuresBoxItemStyle} !gap-y-0.5 !text-[9.5px] md:!text-base`}
          >
            <span className="md:hidden text-[#353535]">{lineChartIcon}</span>
            <span className="hidden md:block text-[#353535]">
              {lineChartDesktopIcon}
            </span>
            <span>کیفیت بالای غذاها</span>
          </div>

          <div
            className={`${featuresBoxItemStyle} !gap-y-0.5 !text-[9.5px] md:!text-base`}
          >
            <span className="md:hidden text-[#353535]">{homeWifiIcon}</span>
            <span className="hidden md:block text-[#353535]">
              {homeWifiDesktopIcon}
            </span>
            <span>محیطی دلنشین و آرام</span>
          </div>

          <div
            className={`${featuresBoxItemStyle} !gap-y-0.5 !text-[9.5px] md:!text-base`}
          >
            <span className="md:hidden text-[#353535]">{menuBoardIcon}</span>
            <span className="hidden md:block text-[#353535]">
              {menuBoardDesktopIcon}
            </span>
            <span>منوی متنوع</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
