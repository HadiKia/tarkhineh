"use client";

import { type ElementType } from "react";

import InPersonPurchaseContent from "@/components/features/cart/InPersonPurchaseContent";
import OnlinePurchaseContent from "@/components/features/cart/OnlinePurchaseContent";
import {
  useCartCheckout,
  type PaymentMethod,
} from "@/contexts/CartCheckoutContext";
import { Card, CardPos, ShoppingBag, Truck, Wallet2 } from "iconsax-reactjs";

type PaymentMethodOption = {
  label: string;
  value: PaymentMethod;
  description?: string;
  icon: ElementType;
};

const paymentMethods: PaymentMethodOption[] = [
  {
    label: "خرید آنلاین",
    value: "online",
    description: "توسط پیک رستوران ارسال شود.",
    icon: CardPos,
  },
  {
    label: "پرداخت در محل",
    value: "inPerson",
    description: "پرداخت به صورت حضوری.",
    icon: Wallet2,
  },
];

export default function CartPaymentMethod() {
  const { paymentMethod, setPaymentMethod } = useCartCheckout();
  return (
    <section className="flex flex-col gap-3 lg:gap-6">
      <div className="rounded-lg border border-gray-4 p-4 lg:px-6 lg:py-8 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <h3 className="flex items-center gap-1 pb-2 border-b border-gray-4 mb-2 lg:border-none lg:mb-0 text-sm lg:text-base text-gray-8">
          <Card className="size-4 lg:size-6" />
          روش پرداخت
        </h3>
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-evenly flex-1">
          {paymentMethods.map((method) => {
            const isSelected = paymentMethod === method.value;

            return (
              <label
                key={method.value}
                className="flex cursor-pointer items-center gap-2 text-gray-7"
              >
                <input
                  type="radio"
                  name="payment-method"
                  value={method.value}
                  checked={isSelected}
                  onChange={() => setPaymentMethod(method.value)}
                  className="sr-only"
                />
                {isSelected ? (
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                  >
                    <circle cx="8" cy="8" r="7.5" stroke="#cbcbcb" />
                    <circle cx="8" cy="8" r="6" fill="#00ba88" />
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                  >
                    <circle cx="8" cy="8" r="7.5" stroke="#cbcbcb" />
                  </svg>
                )}
                <div className="flex flex-col gap-1">
                  <span className="text-xs lg:text-base">{method.label}</span>
                  <span className="hidden text-xs lg:block">
                    {method.description}
                  </span>
                </div>
                <method.icon className="size-4 lg:size-6" />
              </label>
            );
          })}
        </div>
      </div>

      {paymentMethod === "online" && <OnlinePurchaseContent />}
      {paymentMethod === "inPerson" && <InPersonPurchaseContent />}
    </section>
  );
}
