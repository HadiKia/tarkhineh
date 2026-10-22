import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqContentSection() {
  return (
    <div className="mx-auto w-full max-w-306 px-4 pt-3 pb-6 lg:pt-6 lg:pb-12 xl:px-0">
      <Accordion type="single" collapsible className="overflow-hidden">
        <AccordionItem value="faq-1" className="px-4 py-2 lg:py-4.5">
          <AccordionTrigger className="flex items-center gap-1 p-0! text-xs transition-all duration-200 ease-linear">
            ترخینه چه امکانات متفاوتی داره؟
          </AccordionTrigger>
          <AccordionContent className="px-0! pb-0! mt-2 lg:mt-5">
            وبسایت سفارش غذای رستوران‌های زنجیره‌ای ترخینه با اتصال مستقیم به
            نرم افزار اتوماسیون شعبات رستوران، امکان اشتباهات هنگام ثبت سفارش
            آنلاین غذا و همچنین زمان مورد نیاز برای آماده سازی و تحویل آن را به
            حداقل ممکن می رسونه.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq-2" className="px-4 py-2 lg:py-4.5">
          <AccordionTrigger className="flex items-center gap-1 p-0! text-xs transition-all duration-200 ease-linear">
            چطور می تونم در ترخینه حساب کاربری ایجاد کنم؟
          </AccordionTrigger>
          <AccordionContent className="px-0! pb-0! mt-2 lg:mt-5">
            خیلی ساده، در صفحه اصلی سایت روی گزینه ورود کلیک کنید و با وارد کردن
            شماره تلفن همراه یک پیامک حاوی کد تایید برای شما ارسال و با وارد
            کردن کد تایید، ثبت نام شما تکمیل می‌شه.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq-3" className="px-4 py-2 lg:py-4.5">
          <AccordionTrigger className="flex items-center gap-1 p-0! text-xs transition-all duration-200 ease-linear">
            سابقه و لیست خریدهای قبلی ام رو کجا ببینم؟
          </AccordionTrigger>
          <AccordionContent className="px-0! pb-0! mt-2 lg:mt-5">
            با ورود به حساب کاربری و کلیک روی گزینه پیگیری سفارشات سابقه تمام
            خریدهای شما نمایش داده می شه.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq-4" className="px-4 py-2 lg:py-4.5">
          <AccordionTrigger className="flex items-center gap-1 p-0! text-xs transition-all duration-200 ease-linear">
            چه راه هایی برای پرداخت دارم؟
          </AccordionTrigger>
          <AccordionContent className="px-0! pb-0! mt-2 lg:mt-5">
            هنگام ثبت سفارش غذا می تونید روش پرداخت دلخواه خودتون رو انتخاب
            کنید. آنلاین و یا نقدی در هنگام تحویل سفارش بصورت حضوری.{" "}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq-5" className="px-4 py-2 lg:py-4.5">
          <AccordionTrigger className="flex items-center gap-1 p-0! text-xs transition-all duration-200 ease-linear">
            آیا قیمت در منوی وبسایت ترخینه با قیمت منوی شعبات رستوران یکسان است؟
          </AccordionTrigger>
          <AccordionContent className="px-0! pb-0! mt-2 lg:mt-5">
            بله. قیمت منوی وبسایت ترخینه دقیقا مطابق با قیمت منوی شعب رستوران
            است و در صورت تغییر قیمت از طرف رستوران این تغییر در وبسایت ترخینه
            بلافاصله قابل مشاهده است.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq-6" className="px-4 py-2 lg:py-4.5">
          <AccordionTrigger className="flex items-center gap-1 p-0! text-xs transition-all duration-200 ease-linear">
            چطور می تونم از اعتبار هدیه و تخفیف استفاده کنم؟
          </AccordionTrigger>
          <AccordionContent className="px-0! pb-0! mt-2 lg:mt-5">
            برای استفاده از کد تخفیف میتونید به سادگی کد رو در سبد خرید، در قسمت
            مشخص شده وارد کنید. اعتبار هدیه هنگام انتخاب روش پرداخت برای شما
            نمایش داده میشه و در صورت تمایل میتونید ازش استفاده کنید.{" "}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
