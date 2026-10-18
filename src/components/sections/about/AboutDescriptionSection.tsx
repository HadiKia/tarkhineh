import Image from "next/image";

export default function AboutDescriptionSection() {
  return (
    <section className="mx-auto w-full max-w-306 px-4 py-4 lg:py-12 xl:px-0">
      <h2 className="text-gray-8 font-bold text-base lg:text-2xl mb-1 lg:mb-6">
        درباره‌ما
      </h2>

      <div className="grid grid-cols-2 items-stretch gap-x-4 gap-y-1 md:gap-x-6">
        <div className="contents md:block">
          <p className="col-start-1 row-start-1 text-justify text-xs text-gray-7 md:col-start-auto md:row-start-auto md:text-start md:text-base lg:text-xl lg:leading-9">
            رستوران‌های زنجیره‌ای ترخینه در سال ۱۳۶۸ افتتاح گردیده‌اند و در طی
            این سال‌ها همواره با ارائه غذاهای باکیفیت و سرویس سریع و به موقع در
            تلاش برای جلب رضایت مشتریان خود بوده‌اند. در طی این سال‌ها اولویت
            جلب رضایت مشتریان بوده است.
          </p>

          <p className="col-span-2 text-justify text-xs text-gray-7 md:text-start md:text-base lg:text-xl lg:leading-9">
            در این خصوص ترخینه همیشه در تلاش بوده تا در طی این زمان‌ها کیفیت
            غذاهای خود را در بهترین حالت نگه داشته و حتی با نوسانات قیمت‌های
            مواد اولیه در بازار قیمت خود را ثابت نگه داشته است. ترخینه شعبات خود
            را افتتاح کرده که بسیار شیک و مدرن می‌باشند و برای برگزاری جشن‌های
            کوچک و بزرگ شما مشتریان عزیز توانایی پذیرایی با کیفیت بالا را دارند.
            سالن پذیرایی شعبات در دو طبقه مجزا به همراه راه پله مدرن و آسانسور
            برای افراد کم‌توان و سالخورده آماده ارائه سرویس به شما عزیزان
            می‌باشند.
            <span className="block">
              چشم‌انداز: در آینده‌ای نزدیک تالار پذیرایی شعبات راه‌اندازی شده و
              آماده برگزاری جشن‌ها و مراسم‌های بزرگ شما خواهند بود. به امید آن
              روز که همه ایرانیان سالم و سلامت باشند.
            </span>
          </p>
        </div>

        <div className="relative col-start-2 row-start-1 overflow-hidden rounded md:col-start-auto md:row-start-auto md:rounded-lg">
          <Image
            src="/images/about/image.png"
            alt="فضای داخلی رستوران ترخینه"
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
