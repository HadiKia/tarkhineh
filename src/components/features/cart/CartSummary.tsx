"use client";

import { useState } from "react";
import Link from "next/link";

import ClearCartModal from "@/components/features/cart/ClearCartModal";
import CartSummaryItems from "@/components/features/cart/CartSummaryItems";
import { Button } from "@/components/ui/button";
import { useCartCheckout } from "@/contexts/CartCheckoutContext";
import type { CartPayDetail, CartProductDetail } from "@/types";
import { formatPrice, toPersianDigits } from "@/utils/numberFormatter";
import { ArrowLeft2, Card, TickCircle, Trash, Warning2 } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

type CartSummaryVariant = "cart" | "checkout" | "payment";

const actionConfig = {
  cart: {
    label: "تکمیل اطلاعات",
    href: "/cart/completion-of-information",
    icon: ArrowLeft2,
  },
  checkout: {
    label: "ثبت سفارش",
    href: "/cart/payment",
    icon: TickCircle,
  },
  payment: {
    label: "تایید و پرداخت",
    href: "/cart/payment",
    icon: Card,
  },
} as const;

type CartSummaryProps = {
  payDetail: CartPayDetail | null;
  itemCount: number;
  products?: CartProductDetail[];
  variant?: CartSummaryVariant;
};

export default function CartSummary({
  payDetail,
  itemCount,
  products = [],
  variant = "cart",
}: CartSummaryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deliveryMethod, selectedAddressId, courierDeliveryFee } =
    useCartCheckout();
  const isCartVariant = variant === "cart";
  const action = actionConfig[variant];
  const discount = payDetail?.totalProductDiscount ?? 0;
  const shippingCost =
    !isCartVariant && deliveryMethod === "courier" && selectedAddressId
      ? courierDeliveryFee
      : 0;
  const payable = (payDetail?.totalProductPrice ?? 0) + shippingCost;

  return (
    <aside
      className={cn(
        "lg:col-span-4 xl:col-span-5",
        !isCartVariant
          ? "border border-gray-4 p-6 rounded-lg"
          : "border-t lg:border border-gray-4 pt-3 lg:p-6 lg:rounded-lg",
      )}
    >
      <div className="hidden lg:flex items-center justify-between lg:mb-3">
        <h2 className="text-base flex items-center gap-1 text-gray-8">
          سبد خرید
          <span className="text-sm">({toPersianDigits(itemCount)})</span>
        </h2>

        <Button
          type="button"
          variant="ghost"
          className="p-0"
          onClick={() => setIsModalOpen(true)}
          aria-label="خالی کردن سبد خرید"
        >
          <Trash className="size-4 lg:size-6" />
        </Button>
      </div>
      {!isCartVariant && <CartSummaryItems products={products} />}
      <div className="flex flex-col text-sm">
        <div className="flex items-center justify-between pb-3 lg:py-4 border-b lg:border-y border-gray-4">
          <span className="text-gray-8">تخفیف محصولات</span>
          <div className="text-gray-7 flex items-center gap-1">
            <span>{formatPrice(discount)}</span>
            <span>تومان</span>
          </div>
        </div>
        {deliveryMethod === "courier" && (
          <div className="flex flex-col gap-y-2 py-3 lg:py-4 border-b border-gray-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-8">هزینه ارسال</span>
              <div className="text-gray-7 flex items-center gap-1">
                <span>{formatPrice(shippingCost)}</span>
                <span>تومان</span>
              </div>
            </div>
            {shippingCost === 0 && (
              <div className="flex items-start gap-2 text-warning">
                <Warning2 className="size-4 lg:size-6 shrink-0" />
                <span className="text-xs">
                  هزینه ارسال در ادامه بر اساس آدرس، زمان و نحوه ارسال انتخابی شما
                  محاسبه و به این مبلغ اضافه خواهد شد.
                </span>
              </div>
            )}
          </div>
        )}
        <div className="flex items-center justify-between py-3 lg:py-4 font-semibold">
          <span>مبلغ قابل پرداخت</span>
          <div className="text-primary flex items-center gap-1">
            <span>{formatPrice(payable)}</span>
            <span>تومان</span>
          </div>
        </div>
      </div>
      <Button
        asChild
        className={cn("w-full", !isCartVariant && "flex-row-reverse")}
      >
        <Link href={action.href}>
          <span>{action.label}</span>
          <action.icon />
        </Link>
      </Button>
      <ClearCartModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </aside>
  );
}
