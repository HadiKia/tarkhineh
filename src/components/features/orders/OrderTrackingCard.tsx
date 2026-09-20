import Image from "next/image";

import type { PaymentResult } from "@/types";
import { cn } from "@/lib/utils";
import {
  formatDateTime,
  formatPrice,
  toPersianDigits,
} from "@/utils/numberFormatter";
import { Calendar, ClipboardText, Location, Wallet2 } from "iconsax-reactjs";

type OrderTrackingCardProps = {
  payment: PaymentResult;
  userName?: string;
};

export default function OrderTrackingCard({
  payment,
  userName,
}: OrderTrackingCardProps) {
  const {
    amount,
    paymentMethod,
    status,
    isPaid,
    createdAt,
    cart,
    checkout: { deliveryMethod, address, branch, note } = {},
  } = payment;

  const orderType =
    deliveryMethod === "courier"
      ? "ارسال توسط پیک"
      : deliveryMethod === "pickup"
        ? "تحویل حضوری"
        : null;
  const paymentStatus =
    paymentMethod === "online"
      ? status === "COMPLETED" && isPaid
        ? "پرداخت موفق"
        : "پرداخت ناموفق"
      : paymentMethod === "inPerson"
        ? "پرداخت در محل"
        : null;
  const paymentStatusClassName = cn(
    "text-xs lg:text-sm px-1 py-0.5 lg:px-3 rounded",
    paymentStatus === "پرداخت موفق" && "bg-secondary text-primary",
    paymentStatus === "پرداخت ناموفق" && "bg-error-extraLight text-error",
    paymentStatus === "پرداخت در محل" && "bg-gray-2 text-gray-8",
  );
  const receiverPhone = address?.isSelfReceiver
    ? address?.phoneNumber
    : address?.receiverPhoneNumber;
  const courierAddressParts = [
    address?.address,
    address?.isSelfReceiver
      ? (address?.receiverName ?? userName)
      : address?.receiverName,
    receiverPhone ? toPersianDigits(receiverPhone) : undefined,
  ].filter(Boolean);
  const orderAddress =
    deliveryMethod === "courier"
      ? courierAddressParts.join("، ")
      : branch?.address;
  const productDiscount = cart?.payDetail?.totalProductDiscount ?? 0;
  const totalDiscount = cart?.payDetail?.totalOffAmount ?? 0;
  const couponDiscount = Math.max(0, totalDiscount - productDiscount);

  return (
    <div className="border border-gray-4 rounded-lg lg:rounded px-3 py-2 lg:px-6 lg:py-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs lg:text-sm text-gray-7">
          {branch?.title ?? "-"}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs lg:text-sm bg-gray-2 text-gray-8 px-1 py-0.5 lg:px-3 rounded">
            {orderType}
          </span>
          <span className={paymentStatusClassName}>{paymentStatus}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-xs text-gray-7 mb-2 lg:mb-4">
        <div className="flex items-start gap-1">
          <Calendar className="size-4" />
          <span>{formatDateTime(createdAt)}</span>
        </div>
        <div className="flex items-start gap-1">
          <Location className="size-4" />
          <span>{orderAddress ?? "-"}</span>
        </div>
        <div className="flex items-start gap-1">
          <Wallet2 className="size-4" />
          <div className="flex flex-wrap items-center gap-2">
            <span>مبلغ: {formatPrice(amount)} تومان</span>
            {productDiscount > 0 && (
              <span>تخفیف محصولات: {formatPrice(productDiscount)} تومان</span>
            )}
            {couponDiscount > 0 && (
              <span>کد تخفیف: {formatPrice(couponDiscount)} تومان</span>
            )}
          </div>
        </div>
        {note && (
          <div className="flex items-start gap-1">
            <ClipboardText className="size-4" />
            <span>{note}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-4">
        {cart?.productDetail?.map(
          ({ _id, title, mainImageUrl, offPrice, quantity }) => (
            <div
              key={_id}
              className="flex flex-col border border-gray-4 rounded-lg overflow-hidden"
            >
              <div className="relative aspect-video h-12 md:h-20">
                <Image
                  src={mainImageUrl ?? "/images/empty/placeholder.png"}
                  alt={title}
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-1 inset-e-1 md:bottom-2 md:inset-e-2 bg-white text-primary rounded px-1 text-xs text-center">
                  <span className="text-[10px]">x</span>
                  {toPersianDigits(quantity)}
                </span>
              </div>

              <div className="px-2 py-1 flex flex-col gap-1">
                <h3 className="line-clamp-1 text-xs text-gray-8 text-center">
                  {title}
                </h3>
                <span className="block text-xs text-gray-8 text-center">
                  {formatPrice(offPrice)} تومان
                </span>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
