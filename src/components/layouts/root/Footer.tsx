import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

type FooterLink = {
  title: string;
  href: string;
};

const quickLinks: FooterLink[] = [
  { title: "پرسش‌های متداول", href: "#" },
  { title: "قوانین ترخینه", href: "#" },
  { title: "حریم خصوصی", href: "#" },
];

const branches: FooterLink[] = [
  { title: "شعبه اکباتان", href: "#" },
  { title: "شعبه چالوس", href: "#" },
  { title: "شعبه اقدسیه", href: "#" },
  { title: "شعبه ونک", href: "#" },
];

const sectionTitleClass =
  "text-gray-1 text-sm lg:text-xl font-medium lg:font-bold";

const listClass =
  "flex flex-col gap-y-1.5 lg:gap-y-4 ps-2 lg:ps-3 text-xs lg:text-sm lg:font-medium text-gray-1";

const linkClass =
  "hover:text-gray-3 transition-colors duration-300 ease-linear";

const footerInputClass = "placeholder:text-gray-1 text-gray-1 border-gray-7";

const Footer = () => {
  return (
    <footer
      className="
        bg-[url('/images/footer/mobile.png')]
        lg:bg-[url('/images/footer/desktop.png')]
        bg-cover
        bg-bottom
        bg-no-repeat
        px-5
        pt-4
        pb-5.5
        xl:px-0
        lg:py-8
      "
    >
      <div className="flex items-start justify-start lg:justify-between gap-20 lg:gap-0 max-w-306 mx-auto">
        <div className="flex flex-col gap-y-3 lg:gap-y-4">
          <h6 className={sectionTitleClass}>دسترسی آسان</h6>

          <ul className={listClass}>
            {quickLinks.map((item) => (
              <li key={item.title} className={linkClass}>
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-y-3 lg:gap-y-4">
          <h6 className={sectionTitleClass}>شعبه‌های ترخینه</h6>

          <ul className={listClass}>
            {branches.map((item) => (
              <li key={item.title} className={linkClass}>
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:flex flex-col lg:gap-y-4 min-w-146.75">
          <h6 className={sectionTitleClass}>پیام به ترخینه</h6>

          <div className="flex items-stretch gap-x-7 flex-1">
            <div className="flex flex-col gap-y-3">
              <Input
                placeholder="نام و نام خانوادگی"
                className={footerInputClass}
              />

              <Input
                type="tel"
                placeholder="شماره تماس"
                className={`${footerInputClass} placeholder:text-right`}
              />

              <Input
                placeholder="آدرس ایمیل (اختیاری)"
                className={footerInputClass}
              />
            </div>

            <div className="flex-1">
              <Textarea
                placeholder="پیام شما"
                className={`${footerInputClass} h-full`}
              />
            </div>
          </div>

          <Button
            variant="outline"
            className="
              bg-transparent
              text-gray-1
              border-gray-7
              w-45
              ms-auto
              hover:text-gray-1
              mt-2.5
            "
          >
            ارسال پیام
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
