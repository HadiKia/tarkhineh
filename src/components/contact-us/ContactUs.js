import React from "react";
import bannerImg from "../../images/contact-us-banner.svg";

// Images
import EkbatanImg from "../../images/ekbatan.svg";
import ChalosImg from "../../images/chalos.svg";
import AghdasiehImg from "../../images/aghdasieh.svg";
import VanakImg from "../../images/vanak.png";

// Styles 
const branchBoxStyle = "flex flex-col md:flex-row md:items-center border border-[#CBCBCB] rounded-md overflow-hidden lg:hover:shadow-lg lg:duration-500"
const branchImgStyle = "bg-[image:var(--image-url)] bg-cover bg-center w-full h-[112px] md:h-[280px]"
const branchDescriptionDivStyle = "flex flex-col items-center text-center gap-y-1 text-[#717171] text-[11px] py-3 px-1 w-full md:gap-y-2 md:text-sm"
const titleStyle = "text-[#353535] text-sm mb-1 md:font-semibold md:text-base md:mb-8"
const buttonDivStyle = "flex items-center gap-x-4 pt-3"
const buttonStyle = "border border-[#417F56] rounded font-medium py-1 px-9 md:px-7"

const ContactUs = () => {
  return (
    <>
      <div
        style={{ "--image-url": `url(${bannerImg})` }}
        className="bg-[image:var(--image-url)] bg-cover bg-center relative w-full h-[176px] md:h-[336px]"
      >
        <span className="text-[#E5F2E9] absolute text-center left-0 right-0 top-[45%] font-bold text-lg md:text-3xl">
          با ترخینه در تماس باشید.
        </span>
      </div>

      <div className="container max-w-[1224px] mx-auto px-5 flex flex-col gap-y-7 md:gap-y-6 py-6 md:py-12">
        <div className={branchBoxStyle}>
          <div
            style={{ "--image-url": `url(${EkbatanImg})` }}
            className={branchImgStyle}
          ></div>
          <div className={branchDescriptionDivStyle}>
            <h3 className={titleStyle}>شعبه اکباتان</h3>
            <p>آدرس: شهرک اکباتان، فاز ۳، مجتمع تجاری کوروش، طبقه سوم</p>
            <div>
              <span>شماره تماس:</span>
              <span dir="ltr" className="pr-1">۰۲۱-۵۴۸۹۱۲۵۰-۵۱</span>
            </div>
            <p>ساعت کاری: همه روزه از ساعت ۱۲ تا ۲۳ بجز روزهای تعطیل</p>
            <div className={buttonDivStyle}>
              <button className={`${buttonStyle} text-[#417F56]`} >صفحه شعبه</button>
              <button className={`${buttonStyle} bg-[#417F56] text-white`}>دیدن در نقشه</button>
            </div>
          </div>
        </div>

        <div className={branchBoxStyle}>
          <div
            style={{ "--image-url": `url(${ChalosImg})` }}
            className={branchImgStyle}
          ></div>
          <div className={branchDescriptionDivStyle}>
            <h3 className={titleStyle}>شعبه چالوس</h3>
            <p>چالوس، خیابان ۱۷ شهریور، بعد کوچه کوروش، جنب داروخانه دکتر میلانی</p>
            <div>
              <span>شماره تماس:</span>
              <span dir="ltr" className="pr-1">۰۲۱-۵۴۸۹۱۲۵۲-۵۳</span>
            </div>
            <p>ساعت کاری: همه روزه از ساعت ۱۲ تا ۲۳ بجز روزهای تعطیل</p>
            <div className={buttonDivStyle}>
              <button className={`${buttonStyle} text-[#417F56]`} >صفحه شعبه</button>
              <button className={`${buttonStyle} bg-[#417F56] text-white`}>دیدن در نقشه</button>
            </div>
          </div>
        </div>

        <div className={branchBoxStyle}>
          <div
            style={{ "--image-url": `url(${AghdasiehImg})` }}
            className={branchImgStyle}
          ></div>
          <div className={branchDescriptionDivStyle}>
            <h3 className={titleStyle}>شعبه اقدسیه</h3>
            <p>خیابان اقدسیه ، نرسیده به میدان خیام، پلاک ۸</p>
            <div>
              <span>شماره تماس:</span>
              <span dir="ltr" className="pr-1">۰۲۱-۵۴۸۹۱۲۵۴-۵۵</span>
            </div>
            <p>ساعت کاری: همه روزه از ساعت ۱۲ تا ۲۳ بجز روزهای تعطیل</p>
            <div className={buttonDivStyle}>
              <button className={`${buttonStyle} text-[#417F56]`} >صفحه شعبه</button>
              <button className={`${buttonStyle} bg-[#417F56] text-white`}>دیدن در نقشه</button>
            </div>
          </div>
        </div>

        <div className={branchBoxStyle}>
          <div
            style={{ "--image-url": `url(${VanakImg})` }}
            className={branchImgStyle}
          ></div>
          <div className={branchDescriptionDivStyle}>
            <h3 className={titleStyle}>شعبه ونک</h3>
            <p>میدان ونک، خیابان فردوسی، نبش کوچه نیلوفر، پلاک ۲۶</p>
            <div>
              <span>شماره تماس:</span>
              <span dir="ltr" className="pr-1">۰۲۱-۵۴۸۹۱۲۵۶-۵۷</span>
            </div>
            <p>ساعت کاری: همه روزه از ساعت ۱۲ تا ۲۳ بجز روزهای تعطیل</p>
            <div className={buttonDivStyle}>
              <button className={`${buttonStyle} text-[#417F56]`} >صفحه شعبه</button>
              <button className={`${buttonStyle} bg-[#417F56] text-white`}>دیدن در نقشه</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
