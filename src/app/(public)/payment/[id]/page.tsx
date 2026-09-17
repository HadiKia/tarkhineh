"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import EmptyState from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { useGetPayment } from "@/hooks/usePayment";
import { toPersianDigits } from "@/utils/numberFormatter";
import Image from "next/image";

export default function PaymentResultPage() {
  const params = useParams<{ id: string }>();
  const paymentId = typeof params.id === "string" ? params.id : "";
  const { data, isLoading, isError } = useGetPayment(paymentId);

  if (isLoading) {
    return (
      <p className="text-sm md:text-lg text-gray-7 text-center my-50">
        در حال دریافت نتیجه تراکنش...
      </p>
    );
  }

  if (isError || !data?.payment) {
    return <EmptyState title="نتیجه تراکنش پیدا نشد." />;
  }

  const { payment } = data;

  return (
    <section className=" bg-[url('/images/payment/celebration-mobile.png')] lg:bg-[url('/images/payment/celebration-desktop.png')] bg-cover bg-center bg-no-repeat px-5 pt-22.5 pb-50 xl:px-0 lg:py-12 lg:min-h-[calc(100dvh-19em)]">
      <div className="flex flex-col items-center justify-center max-w-306 mx-auto">
        <div className="relative w-30 h-28 lg:w-64 lg:h-60 mb-6 lg:mb-12">
          <Image src="/images/payment/vector.png" fill alt="logo" />
        </div>
        <h1 className="text-base lg:text-3xl text-center font-bold text-primary mb-4 lg:mb-6">
          سفارش شما با موفقیت ثبت شد
        </h1>
        <p className="flex items-center justify-center gap-2 flex-wrap text-xs lg:text-xl text-primary mb-12 lg:mb-12.5">
          <span>کد رهگیری سفارش شما:</span>
          <span>{toPersianDigits(payment.invoiceNumber ?? "-")}</span>
        </p>

        <div className="flex items-center flex-wrap gap-3 lg:gap-6 w-full lg:max-w-98">
          <Button variant="outline" asChild className="flex-1">
            <Link href="/menu">بازگشت به منو</Link>
          </Button>
          <Button variant="default" asChild className="flex-1">
            <Link href="/profile/order-tracking">پیگیری سفارش</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
