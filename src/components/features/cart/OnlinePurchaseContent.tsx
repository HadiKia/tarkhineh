"use client";

import { useCartCheckout } from "@/contexts/CartCheckoutContext";
import { cn } from "@/lib/utils";
import { Card } from "iconsax-reactjs";
import Image from "next/image";

const gateways = [
  { value: "saman", src: "/images/bank/saman.png", alt: "saman" },
  { value: "mellat", src: "/images/bank/mellat.png", alt: "mellat" },
  { value: "parsian", src: "/images/bank/parsian.png", alt: "parsian" },
] as const;

export default function OnlinePurchaseContent() {
  const { paymentGateway, setPaymentGateway } = useCartCheckout();

  return (
    <div className="rounded-lg border border-gray-4 p-4 lg:p-6 flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
      <h3 className="flex items-center gap-1 lg:gap-2 pb-2 border-b border-gray-4 mb-2 lg:border-none lg:pb-0 lg:mb-0 text-sm lg:text-base text-gray-8">
        <Card className="size-4 lg:size-6" />
        درگاه پرداخت
      </h3>

      <div className="flex flex-col items-center justify-center gap-2 flex-1">
        <div
          role="radiogroup"
          aria-label="درگاه پرداخت"
          className="flex items-center gap-4 "
        >
          {gateways.map((gateway) => {
            const isSelected = paymentGateway === gateway.value;

            return (
              <label
                key={gateway.value}
                className={cn(
                  "relative size-16.5 lg:size-24.5 rounded border shadow duration-300 ease-linear cursor-pointer",
                  isSelected
                    ? "border-primary shadow-tint-5 grayscale-0"
                    : "border-gray-4 shadow-transparent grayscale hover:border-primary hover:shadow-tint-5 hover:grayscale-0",
                )}
              >
                <input
                  type="radio"
                  name="payment-gateway"
                  value={gateway.value}
                  checked={isSelected}
                  onChange={() => setPaymentGateway(gateway.value)}
                  className="sr-only"
                />
                <Image src={gateway.src} fill alt={gateway.alt} />
              </label>
            );
          })}
        </div>

        <div className="flex flex-col lg:gap-1 items-center text-gray-7">
          <span className="text-xs lg:text-sm">
            پرداخت از طریق کلیه کارت‌های عضو شتاب امکان‌پذیر است.‌
          </span>
          <span className="text-xs">
            (لطفا قبل از پرداخت فیلترشکن خود را خاموش کنید.)
          </span>
        </div>
      </div>
    </div>
  );
}
