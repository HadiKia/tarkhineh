"use client";

import { useState } from "react";
import Link from "next/link";

import ClearCartModal from "@/components/features/cart/ClearCartModal";
import { Button } from "@/components/ui/button";
import type { CartPayDetail } from "@/types";
import { formatPrice, toPersianDigits } from "@/utils/numberFormatter";
import { ArrowLeft2, Trash, Warning2 } from "iconsax-reactjs";

type CartSummaryProps = { payDetail: CartPayDetail | null; itemCount: number };

export default function CartSummary({
  payDetail,
  itemCount,
}: CartSummaryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const discount = payDetail?.totalProductDiscount ?? 0;
  const payable = payDetail?.totalProductPrice ?? 0;

  return (
    <aside className=" lg:col-span-4 xl:col-span-5 border-t lg:border border-gray-4 pt-3 lg:p-6 lg:rounded-lg">
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
      <div className="flex flex-col text-sm">
        <div className="flex items-center justify-between pb-3 lg:py-4 border-b lg:border-y border-gray-4">
          <span className="text-gray-8">تخفیف محصولات</span>
          <div className="text-gray-7 flex items-center gap-1">
            <span>{formatPrice(discount)}</span>
            <span>تومان</span>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 py-3 lg:py-4 border-b border-gray-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-8">هزینه ارسال</span>
            <div className="text-gray-7 flex items-center gap-1">
              <span>۰</span>
              <span>تومان</span>
            </div>
          </div>
          <div className="flex items-start gap-2 text-warning">
            <Warning2 className="size-4 lg:size-6 shrink-0" />
            <span className="text-xs">
              هزینه ارسال در ادامه بر اساس آدرس، زمان و نحوه ارسال انتخابی شما
              محاسبه و به این مبلغ اضافه خواهد شد.
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between py-3 lg:py-4 font-semibold">
          <span>مبلغ قابل پرداخت</span>
          <div className="text-primary flex items-center gap-1">
            <span>{formatPrice(payable)}</span>
            <span>تومان</span>
          </div>
        </div>
      </div>
      <Button asChild className="w-full">
        <Link href="/cart/completion-of-information">
          <span>تکمیل اطلاعات</span>
          <ArrowLeft2 />
        </Link>
      </Button>
      <ClearCartModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </aside>
  );
}
