import React, { useEffect } from "react";

// Images
import bannerImg from "../../images/franchise-banner.jpg";
import feature1 from "../../images/franchise-feature1.png";
import feature2 from "../../images/franchise-feature2.png";
import feature3 from "../../images/franchise-feature3.png";
import feature4 from "../../images/franchise-feature4.png";

// Styles
import { bannerImgStyle, bannerTitleStyle } from "../about-us/AboutUs";
import OptionItem from "./OptionItem";
const featuresDivStyle =
  "container max-w-[1224px] mx-auto flex items-start justify-evenly gap-x-3 px-5 my-5 text-[8px] sm:text-[9px] text-center text-[#353535] md:text-sm md:my-14 lg:text-base";
const featuresDivItemStyle =
  "flex flex-col justify-center items-center gap-y-2 lg:gap-y-4";
const featureImgStyle = "w-12 sm:w-13 md:w-20 lg:w-28";
const optionsDivStyle = "container max-w-[1224px] mx-auto px-5 text-[#353535]";
const optionsTitleStyle =
  "mb-3 font-bold text-[15px] pt-5 border-t border-[#CBCBCB] md:text-center md:text-xl md:pt-12 md:mb-6";
const optionItem =
  "flex flex-col md:flex-row md:justify-center md:gap-x-7 pb-5 border-b border-[#CBCBCB] md:pb-12 md:mb-6";

const Franchise = () => {
  useEffect(() => {
    document.title = "اعطای نمایندگی";
  }, []);

  return (
    <div>
      {/* banner */}
      <div
        style={{ "--image-url": `url(${bannerImg})` }}
        className={bannerImgStyle}
      >
        <span className={bannerTitleStyle}>
          همین الان به خانواده بزرگ ترخینه بپیوندید!
        </span>
      </div>

      {/* features */}
      <div className={featuresDivStyle}>
        <div className={featuresDivItemStyle}>
          <img src={feature1} alt="img" className={featureImgStyle} />
          <span>بیش از 20 شعبه فعال در سراسر کشور</span>
        </div>

        <div className={featuresDivItemStyle}>
          <img src={feature2} alt="img" className={featureImgStyle} />
          <span>تسهیلات راه‌اندازی رستوران و تجهیز آن</span>
        </div>

        <div className={featuresDivItemStyle}>
          <img src={feature3} alt="img" className={featureImgStyle} />
          <span>طرح‌های تشویقی ارتقای فروش</span>
        </div>

        <div className={featuresDivItemStyle}>
          <img src={feature4} alt="img" className={featureImgStyle} />
          <span>اعطای دستور العمل پخت غذاها</span>
        </div>
      </div>

      {/* options */}
      <div className={optionsDivStyle}>
        <h3 className={optionsTitleStyle}>مزیت دریافت نمایندگی</h3>
        <div className={optionItem}>
          <div>
            <OptionItem title="استفاده از برند شناخته شده ترخینه" />
            <OptionItem title="به حداقل رساندن ریسک سرمایه گذاری" />
            <OptionItem title="تسریع روند بازگشت سرمایه" />
            <OptionItem title="مشاوره های تخصصی جهت مدیریت رستوران" />
          </div>

          <div>
            <OptionItem title="مشاوره در امور حقوقی، مالی و مالیاتی" />
            <OptionItem title="پشتیبانی بازاریابی و منابع انسانی" />
            <OptionItem title="دریافت مشاوره جهت تامین مواد اولیه و تجهیزات" />
            <OptionItem title="طرح های تشویقی برای ارتقا فروش" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Franchise;
