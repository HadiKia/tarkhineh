"use client";

import { useMemo } from "react";

import EmptyState from "@/components/common/EmptyState";
import useOrderTrackingUrlState from "@/hooks/useOrderTrackingUrlState";
import type { PaymentResult } from "@/types";

import OrderTrackingCard from "./OrderTrackingCard";
import OrderTrackingFilterSection from "./OrderTrackingFilterSection";

type OrderTrackingSectionProps = {
  payments: PaymentResult[];
  userName?: string;
};

export default function OrderTrackingSection({
  payments,
  userName,
}: OrderTrackingSectionProps) {
  const { selectedDeliveryMethod } = useOrderTrackingUrlState();
  const filteredPayments = useMemo(
    () =>
      selectedDeliveryMethod
        ? payments.filter(
            (payment) =>
              payment.checkout?.deliveryMethod === selectedDeliveryMethod,
          )
        : payments,
    [payments, selectedDeliveryMethod],
  );

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <OrderTrackingFilterSection />
      {filteredPayments.length > 0 ? (
        <section
          aria-label="سفارش‌ها"
          className="flex flex-col gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-5 lg:h-[calc(100dvh-30em)] lg:gap-4"
        >
          {filteredPayments.map((payment) => (
            <OrderTrackingCard
              key={payment._id}
              payment={payment}
              userName={userName}
            />
          ))}
        </section>
      ) : (
        <EmptyState title="سفارشی با این روش ارسال یافت نشد." />
      )}
    </div>
  );
}
