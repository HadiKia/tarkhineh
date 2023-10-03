import React, { useEffect } from "react";
import bannerImg from "../../images/faq-banner.jpg";
import { Disclosure } from "@headlessui/react";

// Icons
const chevronIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
    <path
      fill="currentColor"
      d="M8.001 4.8c.467 0 .933.18 1.287.533l4.346 4.347a.503.503 0 0 1 0 .707.503.503 0 0 1-.706 0L8.58 6.04a.82.82 0 0 0-1.16 0l-4.347 4.347a.503.503 0 0 1-.706 0 .503.503 0 0 1 0-.707l4.346-4.347c.354-.353.82-.533 1.287-.533Z"
    />
  </svg>
);

// Styles
const tabDivStyle =
  "container max-w-[1224px] mx-auto text-[#717171] flex items-center justify-start px-5 text-[10px] sm:text-[13px] gap-x-4 mb-3 md:text-lg md:gap-x-8 md:mb-6";
const tabActiveStyle =
  "font-medium text-[15px] border-b border-[#417F56] py-[8.25px] text-[#417F56] md:text-lg md:font-bold md:border-b-2 md:py-3";
const disclosureBoxStyle = "border-b border-b-[#CBCBCB]";
const disclosureTitleStyle =
  "flex items-center justify-between w-full px-4 py-2.5 text-[11px] sm:text-[13px] font-medium md:text-base md:py-4 ";
const disclosureDescriptionStyle =
  "text-[11px] text-[#717171] leading-5 px-7 pb-2 md:text-sm md:leading-6 md:pb-4";

const DisclosureItem = ({ title, titleDesktop, description, isLastItem }) => {
  return (
    <Disclosure>
      {({ open }) => (
        <div className={isLastItem ? "" : disclosureBoxStyle}>
          <Disclosure.Button
            className={
              open
                ? `${disclosureTitleStyle} text-[#417F56] !pb-2 md:!pb-4 !font-normal`
                : `${disclosureTitleStyle} text-[#353535]`
            }
          >
            <span className="md:hidden">{title}</span>
            <span className="hidden md:block">{titleDesktop}</span>
            <span
              className={
                open
                  ? "duration-700 md:scale-[1.25]"
                  : "-rotate-180 duration-700 md:scale-[1.25]"
              }
            >
              {chevronIcon}
            </span>
          </Disclosure.Button>

          <Disclosure.Panel className={disclosureDescriptionStyle}>
            {({ close }) => (
              <p
                onClick={async () => {
                  await fetch("/accept-terms", { method: "POST" });
                  close();
                }}
              >
                {description}
              </p>
            )}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

const FAQ = () => {
  useEffect(() => {
    document.title = "سوالات متداول";
  }, []);

  return (
    <div className="min-h-[calc(100vh_-_216px)]">
      <div
        style={{ "--image-url": `url(${bannerImg})` }}
        className="bg-[image:var(--image-url)] bg-cover bg-right relative w-full h-[176px] md:h-[336px] filter grayscale  contrast-100"
      >
        <span className="text-[#E5F2E9] absolute text-center left-0 right-0 top-[45%] font-bold text-lg md:text-3xl lg:text-4xl">
          سوالات متداول از ترخینه
        </span>
      </div>

      <div className=" bg-[#EDEDED] ">
        <div className={tabDivStyle}>
          <button className={tabActiveStyle}>سوالات متداول</button>
          <button className="py-3 sm:py-2.5 ">قوانین ترخینه</button>
          <button className="py-3 sm:py-2.5">حریم خصوصی</button>
        </div>
      </div>

      <div className="container max-w-[1224px] mx-auto ">
        <div className="mx-5 border border-[#CBCBCB] rounded-md mb-6 ">
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
