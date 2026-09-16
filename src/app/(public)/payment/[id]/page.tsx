"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import EmptyState from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { useGetPayment } from "@/hooks/usePayment";
import { formatPrice, toPersianDigits } from "@/utils/numberFormatter";

export default function PaymentResultPage() {
  const params = useParams<{ id: string }>();
  const paymentId = typeof params.id === "string" ? params.id : "";
  const { data, isLoading, isError } = useGetPayment(paymentId);

  if (isLoading) {
    return <p>در حال دریافت نتیجه تراکنش...</p>;
  }

  if (isError || !data?.payment) {
    return <EmptyState title="نتیجه تراکنش پیدا نشد." />;
  }

  const { payment } = data;

  return (
    <section className="mx-4 md:mx-auto flex max-w-120 flex-col items-center gap-6 rounded-lg border border-gray-4 p-6 text-center my-20 ">
      <div className="flex size-16 items-center justify-center rounded-full bg-tint-1 text-primary text-3xl">
        ✓
      </div>
      <h1 className="text-lg font-bold text-gray-8">سفارش شما با موفقیت ثبت شد</h1>
      <p className="text-sm text-gray-7">
        شماره پیگیری: {toPersianDigits(payment.invoiceNumber ?? "-")}
      </p>
      <p className="flex items-center gap-1 text-primary">
        <span>{formatPrice(payment.amount)}</span>
        <span>تومان</span>
      </p>
      <Button asChild className="w-full">
        <Link href="/menu">بازگشت به منوی رستوران</Link>
      </Button>
    </section>
  );
}
