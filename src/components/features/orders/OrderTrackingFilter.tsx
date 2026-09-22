"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import type { DeliveryMethod } from "@/contexts/CartCheckoutContext";
import { ArrowLeft2 } from "iconsax-reactjs";
import { CheckIcon } from "lucide-react";
import { useHorizontalDrag } from "@/hooks/useHorizontalDrag";

type OrderTrackingFilterProps = {
  selectedDeliveryMethod: DeliveryMethod | null;
  onSelectDeliveryMethod: (deliveryMethod: DeliveryMethod | null) => void;
};

const deliveryMethods: Array<{
  label: string;
  value: DeliveryMethod | null;
}> = [
  { label: "همه", value: null },
  { label: "ارسال توسط پیک", value: "courier" },
  { label: "تحویل حضوری", value: "pickup" },
];

export default function OrderTrackingFilter({
  selectedDeliveryMethod,
  onSelectDeliveryMethod,
}: OrderTrackingFilterProps) {
  const {
    ref: deliveryMethodsRef,
    handlers: deliveryMethodsHandlers,
    isDragging: deliveryMethodsDragging,
  } = useHorizontalDrag();
  const [showEndFade, setShowEndFade] = useState(false);

  useEffect(() => {
    const element = deliveryMethodsRef.current;

    if (!element) return;

    const updateFade = () => {
      setShowEndFade(element.scrollWidth > element.clientWidth);
    };

    updateFade();

    const resizeObserver = new ResizeObserver(updateFade);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [deliveryMethodsRef]);

  return (
    <div className="flex">
      <div
        ref={deliveryMethodsRef}
        {...deliveryMethodsHandlers}
        className={cn(
          "flex min-w-0 items-center gap-x-2 overflow-x-auto scrollbar-none",
          "active:cursor-grabbing touch-pan-x select-none",
        )}
      >
        {deliveryMethods.map((method) => {
          const isSelected = selectedDeliveryMethod === method.value;

          return (
            <button
              key={method.value ?? "all"}
              type="button"
              onClick={(event) => {
                if (deliveryMethodsDragging.current.isDragging) {
                  event.preventDefault();
                  return;
                }

                onSelectDeliveryMethod(method.value);
              }}
              className={cn(
                "flex shrink-0 items-center gap-x-1 select-none rounded-lg px-2 py-1",
                "text-xs transition-colors duration-300 ease-linear lg:rounded-full lg:text-base",
                isSelected
                  ? "pointer-events-none bg-tint-1 text-primary"
                  : "cursor-pointer bg-gray-2 text-gray-8",
              )}
            >
              {method.label}
              {isSelected ? (
                <CheckIcon className="size-3 lg:size-4" />
              ) : (
                <ArrowLeft2 className="size-3 lg:size-4" />
              )}
            </button>
          );
        })}
      </div>

      {showEndFade && (
        <div className="pointer-events-none sticky inset-y-0 inset-e-0 hidden h-8 w-5 translate-x-4 bg-linear-to-r from-white to-transparent md:block" />
      )}
    </div>
  );
}
