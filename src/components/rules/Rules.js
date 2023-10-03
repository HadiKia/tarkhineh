import React, { useEffect } from "react";
import bannerImg from "../../images/rules-banner.jpg";
import { Link } from "react-router-dom";
import DisclosureItem from "../shared/DisclosureItem";

// Styles
import { bannerImgStyle, bannerTitleStyle } from "../about-us/AboutUs";
import { tabDivStyle, tabActiveStyle } from "../faq/FAQ";

const Rules = () => {
  useEffect(() => {
    document.title = "قوانین ترخینه";
  }, []);

  return (
    <div className="min-h-[calc(100vh_-_216px)]">
      <div
        style={{ "--image-url": `url(${bannerImg})` }}
        className={bannerImgStyle}
      >
        <span className={bannerTitleStyle}>قوانین ترخینه</span>
      </div>

      <div className=" bg-[#EDEDED] ">
        <div className={tabDivStyle}>
          <Link to="/faq">
            <button className="py-3 sm:py-2.5">سوالات متداول</button>
          </Link>
          <button className={tabActiveStyle}>قوانین ترخینه</button>
          <button className="py-3 sm:py-2.5">حریم خصوصی</button>
        </div>
      </div>

      <div className="container max-w-[1224px] mx-auto ">
        <div className="mx-5 border border-[#CBCBCB] rounded-md mb-6 ">
          <DisclosureItem
            title="حداقل سفارش"
            titleDesktop="حداقل سفارش"
            description="حداقل سفارشات در رستوران‌های ترخینه، مبلغ ۵۰.۰۰۰ تومان است. برای ثبت، پردازش و ارسال سفارشات، باید حداقل، این مبلغ سفارش داده شود در غیر اینصورت سفارشات، ثبت نخواهد شد."
          />
          <DisclosureItem
            title="فاصله تحویل"
            titleDesktop="فاصله تحویل"
            description="ترخینه در ارسال سفارشات به نقاط دور محدودیت دارد و حداکثر فاصله از رستوران‌های زنجیره‌ای ترخینه برای ارسال کالا، ۶ کیلومتر است. لطفا قبل از ثبت سفارش، نزدیک‌ترین شعبه به محل ارسال را انتخاب کنید و از رعایت کردن حداکثر فاصله برای ارسال سفارشات اطمینان حاصل فرمایید."
          />
          <DisclosureItem
            title="زمان تحویل"
            titleDesktop="زمان تحویل"
            description="جدول زمانی تخمینی تحویل در زمان ثبت سفارش به اطلاع شما خواهد رسید. این ممکن است تحت تأثیر عوامل زیادی مانند ترافیک، آب و هوا، دوره‌های شلوغ رستوران و غیره باشد، بنابراین در صورت تأخیر لطفا صبور باشید."
          />
          <DisclosureItem
            title="گزینه‌های پرداخت"
            titleDesktop="گزینه‌های پرداخت"
            description="ما گزینه‌های پرداخت مختلفی را می پذیریم، از جمله پرداخت اینترنتی، کارت‌های اعتباری یا پول نقد. لطفاً قبل از تکمیل سفارش، روش پرداختی را که ترجیح می دهید، تأیید کنید.            "
          />
          <DisclosureItem
            title="دقت سفارش"
            titleDesktop="دقت سفارش"
            description="لطفاً قبل از ارسال، از دقیق بودن تمام جزئیات سفارش خود، از جمله موارد منو، دستورالعمل‌های خاص و  جزئیات سفارش خود اطمینان حاصل کنید تا اختلالی در فرایند پردازش و تحویل سفارشات شما ایجاد نشود و سفارشات شما در سریع‌ترین زمان ممکن به دست‌تان برسد."
          />
          <DisclosureItem
            title="شرایط لغو سفارش"
            titleDesktop="شرایط لغو سفارش"
            description="شما می‌توانید با تماس مستقیم با هر شعبه از رستوران‌های زنجیره‌ای ترخینه، سفارش خود را لغو کنید. لطفا توجه داشته باشید که ممکن است محدودیت زمانی برای لغو وجود داشته باشد، زیرا ممکن است غذا از قبل آماده شده باشد و در اینصورت متاسفانه امکان لغو سفارش وجود ندارد."
          />
          <DisclosureItem
            title="شرایط بازگشت سفارش"
            titleDesktop="شرایط بازگشت سفارش"
            description="اگر سفارش شما انتظارات شما را برآورده نمی کند، لطفاً بلافاصله از طریق تماس تلفنی با ما تماس بگیرید؛ ما در اسرع وقت به دنبال حل مشکل شما  خواهیم بود."
          />
          <DisclosureItem
            title="تخفیفات"
            titleDesktop="تخفیفات"
            description="هر‌گونه تخفیف یا برنامه‌های وفاداری ممکن است قوانین و شرایط خاصی داشته باشد که به وضوح در وب سایت مشخص می‌شود."
            isLastItem={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Rules;
