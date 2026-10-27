import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TermsContentSection() {
  return (
    <div className="mx-auto w-full max-w-306 px-4 pt-3 pb-6 lg:pt-6 lg:pb-12 xl:px-0">
      <Accordion type="single" collapsible className="overflow-hidden">
        <AccordionItem value="terms-1" className="px-4 py-2 lg:py-4.5">
          <AccordionTrigger className="flex items-center gap-1 p-0! text-xs transition-all duration-200 ease-linear">
            حداقل سفارش
          </AccordionTrigger>
          <AccordionContent className="px-0! pb-0! mt-2 lg:mt-5">
            حداقل سفارشات در رستوران‌های ترخینه، مبلغ ۵۰.۰۰۰ تومان است. برای
            ثبت، پردازش و ارسال سفارشات، باید حداقل، این مبلغ سفارش داده شود در
            غیر اینصورت سفارشات، ثبت نخواهد شد.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="terms-2" className="px-4 py-2 lg:py-4.5">
          <AccordionTrigger className="flex items-center gap-1 p-0! text-xs transition-all duration-200 ease-linear">
            فاصله تحویل
          </AccordionTrigger>
          <AccordionContent className="px-0! pb-0! mt-2 lg:mt-5">
            ترخینه در ارسال سفارشات به نقاط دور محدودیت دارد و حداکثر فاصله از
            رستوران‌های زنجیره‌ای ترخینه برای ارسال کالا، ۶ کیلومتر است. لطفا
            قبل از ثبت سفارش، نزدیک‌ترین شعبه به محل ارسال را انتخاب کنید و از
            رعایت کردن حداکثر فاصله برای ارسال سفارشات اطمینان حاصل فرمایید.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="terms-3" className="px-4 py-2 lg:py-4.5">
          <AccordionTrigger className="flex items-center gap-1 p-0! text-xs transition-all duration-200 ease-linear">
            زمان تحویل
          </AccordionTrigger>
          <AccordionContent className="px-0! pb-0! mt-2 lg:mt-5">
            جدول زمانی تخمینی تحویل در زمان ثبت سفارش به اطلاع شما خواهد رسید.
            این ممکن است تحت تأثیر عوامل زیادی مانند ترافیک، آب و هوا، دوره‌های
            شلوغ رستوران و غیره باشد، بنابراین در صورت تأخیر لطفا صبور باشید.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="terms-4" className="px-4 py-2 lg:py-4.5">
          <AccordionTrigger className="flex items-center gap-1 p-0! text-xs transition-all duration-200 ease-linear">
            گزینه‌های پرداخت
          </AccordionTrigger>
          <AccordionContent className="px-0! pb-0! mt-2 lg:mt-5">
            ما گزینه‌های پرداخت مختلفی را می پذیریم، از جمله پرداخت اینترنتی،
            کارت‌های اعتباری یا پول نقد. لطفاً قبل از تکمیل سفارش، روش پرداختی
            را که ترجیح می دهید، تأیید کنید.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="terms-5" className="px-4 py-2 lg:py-4.5">
          <AccordionTrigger className="flex items-center gap-1 p-0! text-xs transition-all duration-200 ease-linear">
            دقت سفارش
          </AccordionTrigger>
          <AccordionContent className="px-0! pb-0! mt-2 lg:mt-5">
            لطفاً قبل از ارسال، از دقیق بودن تمام جزئیات سفارش خود، از جمله
            موارد منو، دستورالعمل‌های خاص و جزئیات سفارش خود اطمینان حاصل کنید
            تا اختلالی در فرایند پردازش و تحویل سفارشات شما ایجاد نشود و سفارشات
            شما در سریع‌ترین زمان ممکن به دست‌تان برسد.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="terms-6" className="px-4 py-2 lg:py-4.5">
          <AccordionTrigger className="flex items-center gap-1 p-0! text-xs transition-all duration-200 ease-linear">
            شرایط لغو سفارش
          </AccordionTrigger>
          <AccordionContent className="px-0! pb-0! mt-2 lg:mt-5">
            شما می‌توانید با تماس مستقیم با هر شعبه از رستوران‌های زنجیره‌ای
            ترخینه، سفارش خود را لغو کنید. لطفا توجه داشته باشید که ممکن است
            محدودیت زمانی برای لغو وجود داشته باشد، زیرا ممکن است غذا از قبل
            آماده شده باشد و در اینصورت متاسفانه امکان لغو سفارش وجود ندارد.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="terms-7" className="px-4 py-2 lg:py-4.5">
          <AccordionTrigger className="flex items-center gap-1 p-0! text-xs transition-all duration-200 ease-linear">
            شرایط بازگشت سفارش
          </AccordionTrigger>
          <AccordionContent className="px-0! pb-0! mt-2 lg:mt-5">
            اگر سفارش شما انتظارات شما را برآورده نمی کند، لطفاً بلافاصله از
            طریق تماس تلفنی با ما تماس بگیرید؛ ما در اسرع وقت به دنبال حل مشکل
            شما خواهیم بود.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="terms-8" className="px-4 py-2 lg:py-4.5">
          <AccordionTrigger className="flex items-center gap-1 p-0! text-xs transition-all duration-200 ease-linear">
            تخفیفات
          </AccordionTrigger>
          <AccordionContent className="px-0! pb-0! mt-2 lg:mt-5">
            هر‌گونه تخفیف یا برنامه‌های وفاداری ممکن است قوانین و شرایط خاصی
            داشته باشد که به وضوح در وب سایت مشخص می‌شود.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
