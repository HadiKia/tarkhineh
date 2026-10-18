import { Button } from "@/components/ui/button";
import { RESTAURANT_FEATURES } from "@/constants/restaurantFeatures";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function IntroductionSection() {
  return (
    <section className="bg-[url('/images/home/Introduction-mobile.png')] bg-cover bg-bottom bg-no-repeat px-5 lg:bg-[url('/images/home/Introduction-desktop.png')]">
      <div className="mx-auto flex w-full max-w-306 flex-col gap-6 py-4 text-white lg:flex-row lg:items-center lg:justify-between lg:py-12 xl:px-0">
        <div className="lg:max-w-150">
          <h2 className="mb-2 text-base font-medium text-white lg:mb-6 lg:text-2xl lg:font-bold">
            رستوران‌های زنجیره‌ای ترخینه
          </h2>
          <p className="text-xs lg:text-xl mb-2 lg:mb-4">
            مهمان‌نوازی یکی از مهم‌ترین مشخصه‌های ایرانیان است و باعث افتخار
            ماست که بیش از 20 سال است خدمت‌گزار مردم شریف ایران هستیم. ما در
            رستوران‌های زنجیره‌ای ترخینه همواره تلاش کردیم که در محیطی اصیل بر
            پایه معماری و طراحی مدرن در کنار طبیعتی دلنواز، غذایی سالم و درخور
            شان شما عزیزان ارائه دهیم.
          </p>
          <div className="flex justify-end">
            <Button
              variant="ghost"
              asChild
              className="border-white text-white min-w-38 lg:w-46 hover:text-gray-3 hover:border-gray-3"
            >
              <Link href="/about">
                <span>اطلاعات بیشتر</span>
                <ChevronLeft />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-4 lg:gap-x-6 lg:gap-y-2">
          {RESTAURANT_FEATURES.map(({ label, Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center gap-1 text-center lg:gap-4"
            >
              <Icon className="size-6 lg:size-12" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
