import React from "react";

// images
import EkbatanImg from "../../images/ekbatan.svg";
import ChalosImg from "../../images/chalos.svg";
import AghdasiehImg from "../../images/aghdasieh.svg";
import VanakImg from "../../images/vanak.png";

// styles
const containerStyle = 'container max-w-[1224px] mx-auto px-5 mt-6 md:mt-10 text-center mb-12 xl:mt-12'
const branchesBoxStyle =
  "flex items-center gap-x-2 border border-[#CBCBCB] hover:border-[#417F56] duration-500 rounded-lg overflow-hidden mb-3 md:flex-col md:gap-y-2 md:w-[18em]";
const h3Style = "font-bold text-lg mb-3 text-[#353535] md:text-xl md:mb-6 lg:text-2xl";
const coverStyle = 'bg-[image:var(--image-url)] bg-cover bg-center w-[9em] h-20 md:w-[18em] md:h-36 lg:h-[14.375em]'
const descriptionBoxStyle = 'p-1 md:pb-2 lg:px-2.5 lg:pb-4 w-[10.375em] md:w-auto'
const h4Style = "text-[#353535] font-medium text-sm mb-1 md:text-base md:font-bold md:mb-2 lg:text-lg xl:text-[22px]";
const pStyle = "text-[10px] text-[#717171] leading-5 md:text-xs md:font-medium lg:text-[13px] lg:leading-6 xl:text-sm";

const Branches = () => {
  return (
    <div className={containerStyle}>
      <h3 className={h3Style}>ترخینه گردی</h3>

      <div className="md:flex md:gap-x-4 lg:gap-x-5 xl:gap-x-6">
        <div className={branchesBoxStyle}>
          <div style={{ "--image-url": `url(${EkbatanImg})` }} className={coverStyle}></div>
          <div className={descriptionBoxStyle}>
            <h4 className={h4Style}>شعبه اکباتان</h4>
            <p className={pStyle}>
              شهرک اکباتان، فاز ۳، مجتمع تجاری کوروش، طبقه سوم
            </p>
          </div>
        </div>

        <div className={branchesBoxStyle}>
          <div style={{ "--image-url": `url(${ChalosImg})` }} className={coverStyle}></div>
          <div className={descriptionBoxStyle}>
            <h4 className={h4Style}>شعبه چالوس</h4>
            <p className={pStyle}>
              چالوس، خیابان ۱۷ شهریور، بعد کوچه کوروش، جنب داروخانه دکتر میلانی
            </p>
          </div>
        </div>

        <div className={branchesBoxStyle}>
         <div style={{ "--image-url": `url(${AghdasiehImg})` }} className={coverStyle}></div>
          <div className={descriptionBoxStyle}>
            <h4 className={h4Style}>شعبه اقدسیه</h4>
            <p className={pStyle}>
              خیابان اقدسیه ، نرسیده به میدان خیام، پلاک ۸
            </p>
          </div>
        </div>

        <div className={branchesBoxStyle}>
        <div style={{ "--image-url": `url(${VanakImg})` }} className={coverStyle}></div>
          <div className={descriptionBoxStyle}>
            <h4 className={h4Style}>شعبه ونک</h4>
            <p className={pStyle}>
              میدان ونک، خیابان فردوسی، نبش کوچه نیلوفر، پلاک ۲۶
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branches;
