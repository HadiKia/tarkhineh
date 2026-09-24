import Image from "next/image";
import { Call, Location, User } from "iconsax-reactjs";

import ProductDiscountBadge from "@/components/features/products/public/ProductDiscountBadge";
import { paymentGatewayLabels } from "@/constants/payment";
import type { AdminPaymentResult } from "@/types";
import {
  formatDate,
  formatDateTime,
  formatPrice,
  toPersianDigits,
} from "@/utils/numberFormatter";

import OrderStatusSelect from "./OrderStatusSelect";

type AdminOrderDetailsProps = {
  payment: AdminPaymentResult;
};

function getReceiver(payment: AdminPaymentResult) {
  const { user, checkout } = payment;
  const address = checkout?.address;

  if (checkout?.deliveryMethod === "courier" && address) {
    return address.isSelfReceiver
      ? {
          name: user?.name,
          phone: address.phoneNumber ?? user?.phoneNumber,
        }
      : {
          name: address.receiverName,
          phone: address.receiverPhoneNumber,
        };
  }

  return { name: user?.name, phone: user?.phoneNumber };
}

export default function AdminOrderDetails({ payment }: AdminOrderDetailsProps) {
  const {
    user,
    cart,
    checkout,
    amount,
    createdAt,
    invoiceNumber,
    paymentGateway,
    paymentDate,
    refId,
    status,
    isPaid,
  } = payment;
  const receiver = getReceiver(payment);
  const isCourier = checkout?.deliveryMethod === "courier";
  const location = isCourier
    ? checkout?.address?.address
    : checkout?.branch?.address;
  const productDiscount = cart?.payDetail?.totalProductDiscount ?? 0;
  const totalDiscount = cart?.payDetail?.totalOffAmount ?? 0;
  const couponDiscount = Math.max(0, totalDiscount - productDiscount);
  const selectedPaymentGateway = paymentGateway ?? checkout?.paymentGateway;

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <section className="flex flex-col gap-4 rounded-lg border border-gray-4 p-4 lg:p-6">
        <div className="flex flex-col gap-4 border-b border-gray-4 pb-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-2 text-xs lg:text-sm">
            <div className="flex items-center flex-wrap gap-1">
              <span className="text-gray-8">شماره سفارش:</span>
              <span className="text-gray-7">{invoiceNumber || "-"}</span>
            </div>
            <div className="flex items-center flex-wrap gap-1">
              <span className="text-gray-8">تاریخ ثبت:</span>
              <span className="text-gray-7">{formatDateTime(createdAt)}</span>
            </div>
          </div>
          <OrderStatusSelect
            key={`${payment._id}-${payment.orderStatus ?? "PREPARING"}`}
            payment={payment}
          />
        </div>

        <div className="grid gap-3 text-xs lg:text-sm md:grid-cols-2">
          <div className="flex items-center flex-wrap gap-1">
            <div className="flex items-center gap-1 text-gray-8">
              <User className="size-4" />
              <span>تحویل‌گیرنده:</span>
            </div>
            <span className="text-gray-7">{receiver.name || "-"}</span>
          </div>

          <div className="flex items-center flex-wrap gap-1">
            <div className="flex items-center gap-1 text-gray-8">
              <Call className="size-4" />
              <span>شماره تماس:</span>
            </div>
            <span className="text-gray-7" dir="ltr">
              {receiver.phone ? toPersianDigits(receiver.phone) : "-"}
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-1">
            <div className="flex items-center gap-1 text-gray-8">
              <Location className="size-4" />
              <span>تحویل‌گیرنده:</span>
            </div>
            <span className="text-gray-7">
              {isCourier ? "آدرس ارسال: " : "شعبه تحویل: "}
              {location || "-"}
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-1">
            <div className="flex items-center gap-1 text-gray-8">
              <Location className="size-4" />
              <span>شعبه:</span>
            </div>
            <span className="text-gray-7">
              {checkout?.branch?.title || "-"}
            </span>
          </div>
        </div>

        {checkout?.note && (
          <div className="flex items-center gap-1 border-t border-gray-4 pt-3 text-xs lg:text-sm">
            <div className="flex items-center gap-1 text-gray-8">
              <span>توضیحات سفارش:</span>
            </div>
            <span className="text-gray-7">{checkout.note}</span>
          </div>
        )}
      </section>

      <section className="flex flex-col gap-4 rounded-lg border border-gray-4 p-4 lg:p-6">
        <h3 className="text-sm font-semibold text-gray-8 lg:text-lg">
          اقلام سفارش
        </h3>
        <div className="flex flex-col divide-y divide-gray-4">
          {cart?.productDetail?.map(
            ({
              _id,
              title,
              description,
              mainImageUrl,
              price,
              offPrice,
              discount,
              quantity,
            }) => (
              <div
                key={_id}
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-gray-2 lg:size-20">
                  <Image
                    src={mainImageUrl ?? "/images/empty/placeholder.png"}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="line-clamp-2 text-xs font-medium text-gray-8 lg:text-sm">
                    {title}
                  </span>
                  <span className="line-clamp-1 text-[10px] text-gray-6 lg:text-xs">
                    {description}
                  </span>
                  <span className="text-xs text-gray-6">
                    تعداد: {toPersianDigits(quantity)}
                  </span>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1 text-xs lg:text-sm">
                  {discount > 0 && (
                    <ProductDiscountBadge
                      price={price}
                      discount={discount}
                      className="flex items-center gap-1"
                    />
                  )}
                  <span className="text-gray-7">
                    {formatPrice(offPrice)} تومان
                  </span>
                  <span className="text-primary">
                    جمع: {formatPrice(offPrice * quantity)} تومان
                  </span>
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      <section className="rounded-lg border border-gray-4 p-4 lg:p-6 text-xs lg:text-sm">
        <div className="flex flex-col divide-y divide-gray-4">
          {productDiscount > 0 && (
            <div className="flex items-center justify-between pb-3 lg:pb-4 mb-3 lg:mb-4">
              <span className="text-gray-8">تخفیف محصولات</span>
              <span className="text-error">
                {formatPrice(productDiscount)} تومان
              </span>
            </div>
          )}
          {couponDiscount > 0 && (
            <div className="flex items-center justify-between pb-3 lg:pb-4 mb-3 lg:mb-4">
              <span className="text-gray-8">کد تخفیف</span>
              <span className="text-error">
                {formatPrice(couponDiscount)} تومان
              </span>
            </div>
          )}
          {checkout?.shippingCost !== undefined && (
            <div className="flex items-center justify-between pb-3 lg:pb-4">
              <span className="text-gray-8">هزینه ارسال</span>
              <span className="text-gray-7">
                {formatPrice(checkout.shippingCost)} تومان
              </span>
            </div>
          )}
          <div className="flex items-center justify-between py-3 lg:py-4">
            <span className="text-gray-8">مبلغ پرداختی</span>
            <span className="text-primary">{formatPrice(amount)} تومان</span>
          </div>
          <div className="flex items-center justify-between py-3 lg:py-4">
            <span className="text-gray-8">روش پرداخت:</span>
            <span className="text-gray-7">
              {payment.paymentMethod === "inPerson"
                ? "پرداخت در محل"
                : "پرداخت اینترنتی"}
            </span>
          </div>
          <div className="flex items-center justify-between py-3 lg:py-4">
            <span className="text-gray-8">وضعیت پرداخت:</span>
            <span
              className={
                isPaid && status === "COMPLETED" ? "text-primary" : "text-error"
              }
            >
              {isPaid && status === "COMPLETED"
                ? "پرداخت موفق"
                : "پرداخت ناموفق"}
            </span>
          </div>
          {payment.paymentMethod === "online" && (
            <div className="flex items-center justify-between py-3 lg:py-4">
              <span className="text-gray-8">درگاه:</span>
              <span className="text-gray-7">
                {selectedPaymentGateway
                  ? paymentGatewayLabels[selectedPaymentGateway]
                  : "-"}
              </span>
            </div>
          )}
          {paymentDate && (
            <div className="flex items-center justify-between py-3 lg:py-4">
              <span className="text-gray-8">تاریخ پرداخت:</span>
              <span className="text-gray-7">{formatDate(paymentDate)}</span>
            </div>
          )}
          {refId && (
            <div className="flex items-center justify-between py-3 lg:py-4">
              <span className="text-gray-8">شماره پیگیری:</span>
              <span className="text-gray-7">{toPersianDigits(refId)}</span>
            </div>
          )}
          {user?.email && (
            <div className="flex items-center justify-between pt-3 lg:pt-4">
              <span className="text-gray-8">ایمیل:</span>
              <span className="text-gray-7">{user.email}</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
