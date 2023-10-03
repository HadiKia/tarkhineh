import React, { useEffect } from "react";
import bannerImg from "../../images/faq-banner.jpg";
import { Link } from "react-router-dom";
import DisclosureItem from "../shared/DisclosureItem";

// Styles
import { bannerTitleStyle } from "../about-us/AboutUs";
export const containerStyle = "min-h-[calc(100vh_-_216px)] md:mb-12"
export const tabDivStyle =
  "container max-w-[1224px] mx-auto text-[#717171] flex items-center justify-start px-5 text-[10px] sm:text-[13px] gap-x-4 mb-3 md:text-lg md:gap-x-8 md:mb-6";
export const tabActiveStyle =
  "font-medium text-[15px] border-b border-[#417F56] py-[8.25px] text-[#417F56] md:text-lg md:font-bold md:border-b-2 md:py-3";

const FAQ = () => {
  useEffect(() => {
    document.title = "سوالات متداول";
  }, []);

  return (
    <div className={containerStyle}>
      <div
        style={{ "--image-url": `url(${bannerImg})` }}
        className="bg-[image:var(--image-url)] bg-cover bg-right relative w-full h-[176px] md:h-[336px] filter grayscale contrast-100"
      >
        <span className={bannerTitleStyle}>سوالات متداول از ترخینه</span>
      </div>

      <div className=" bg-[#EDEDED] ">
        <div className={tabDivStyle}>
          <button className={tabActiveStyle}>سوالات متداول</button>
          <Link to="/rules">
            <button className="py-3 sm:py-2.5 ">قوانین ترخینه</button>
          </Link>
          <Link to="/privacy">
            <button className="py-3 sm:py-2.5">حریم خصوصی</button>
          </Link>
        </div>
      </div>

      <div className="container max-w-[1224px] mx-auto">
        <div className="mx-5 border border-[#CBCBCB] rounded-md mb-6">
          <DisclosureItem
            title="امکانات ترخینه"
            titleDesktop="ترخینه چه امکانات متفاوتی داره؟"
            description="وبسایت سفارش غذای رستوران‌های زنجیره‌ای ترخینه با اتصال مستقیم به نرم افزار اتوماسیون شعبات رستوران، امکان اشتباهات هنگام ثبت سفارش آنلاین غذا و همچنین زمان مورد نیاز برای آماده سازی و تحویل آن را به حداقل ممکن می رسونه."
          />
          <DisclosureItem
            title="حساب کاربری در ترخینه"
            titleDesktop="چطور می تونم در ترخینه حساب کاربری ایجاد کنم؟"
            description="خیلی ساده، پس از انتخاب غذای مورد علاقه تان از منوی رستوران، هنگام ثبت سفارش با وارد کردن شماره تلفن همراه یک پیامک حاوی کد تایید برای شما ارسال و با وارد کردن کد تایید، ثبت نام شما تکمیل می شه. یا می تونید در صفحه اصلی سایت روی گزینه ورود کلیک کنید."
          />
          <DisclosureItem
            title="سابقه خرید"
            titleDesktop="سابقه و لیست خریدهای قبلی ام رو کجا ببینم؟"
            description="با ورود به حساب کاربری و کلیک روی گزینه سفارشات قبلی سابقه تمام خریدهای شما نمایش داده می شه."
          />
          <DisclosureItem
            title="راه‌های پرداخت"
            titleDesktop="چه راه هایی برای پرداخت دارم؟"
            description="هنگام ثبت سفارش غذا می تونید روش پرداخت دلخواه خودتون رو انتخاب کنید. آنلاین و یا نقدی در هنگام تحویل سفارش بصورت حضوری."
          />
          <DisclosureItem
            title="تفاوت قیمت در منو شعبات و منو وبسایت"
            titleDesktop="آیا قیمت در منوی وبسایت ترخینه با قیمت منوی شعبات رستوران یکسان است؟"
            description="بله. قیمت منوی وبسایت ترخینه دقیقا مطابق با قیمت منوی شعب رستوران  است و در صورت تغییر قیمت از طرف رستوران این تغییر در وبسایت ترخینه بلافاصله قابل مشاهده است."
          />
          <DisclosureItem
            title="هدیه و تخفیف"
            titleDesktop="چطور می تونم از اعتبار هدیه و تخفیف استفاده کنم؟"
            description="برای استفاده از کد تخفیف میتونید به سادگی کد رو در سبد خرید، در قسمت مشخص شده وارد کنید. اعتبار هدیه هنگام انتخاب روش پرداخت برای شما نمایش داده میشه و در صورت تمایل میتونید ازش استفاده کنید."
            isLastItem={true}
          />
        </div>
      </div>
    </div>
  );
};

export default FAQ;
