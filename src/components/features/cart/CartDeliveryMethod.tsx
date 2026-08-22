"use client";

import { useState, type ElementType } from "react";

import CourierDeliveryContent from "@/components/features/cart/CourierDeliveryContent";
import PickupDeliveryContent from "@/components/features/cart/PickupDeliveryContent";
import { ShoppingBag, Truck } from "iconsax-reactjs";

type DeliveryMethod = "courier" | "pickup";

type DeliveryMethodOption = {
  label: string;
  value: DeliveryMethod;
  description?: string;
  icon: ElementType;
};

const deliveryMethods: DeliveryMethodOption[] = [
  {
    label: "ارسال توسط پیک",
    value: "courier",
    description: "توسط پیک رستوران ارسال شود.",
    icon: Truck,
  },
  {
    label: "تحویل حضوری",
    value: "pickup",
    description: "تحویل حضوری در شعبه.",
    icon: ShoppingBag,
  },
];

export default function CartDeliveryMethod() {
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("courier");
  return (
    <section className="lg:col-span-8 xl:col-span-7 flex flex-col gap-3 lg:gap-6">
      <div className="rounded-lg border border-gray-4 p-4 lg:px-6 lg:py-8 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <h3 className="flex items-center gap-1 pb-2 border-b border-gray-4 mb-2 lg:border-none lg:mb-0 text-sm lg:text-base text-gray-8">
          <Truck className="size-4 lg:size-6" />
          روش تحویل سفارش
        </h3>

        {deliveryMethods.map((method) => {
          const isSelected = deliveryMethod === method.value;

          return (
            <label
              key={method.value}
              className="flex cursor-pointer items-center gap-2 text-gray-7"
            >
              <input
                type="radio"
                name="delivery-method"
                value={method.value}
                checked={isSelected}
                onChange={() => setDeliveryMethod(method.value)}
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

      {deliveryMethod === "courier" && <CourierDeliveryContent />}
      {deliveryMethod === "pickup" && <PickupDeliveryContent />}
    </section>
  );
}
