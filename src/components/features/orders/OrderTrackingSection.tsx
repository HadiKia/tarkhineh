import type { PaymentResult } from "@/types";

import OrderTrackingCard from "./OrderTrackingCard";

type OrderTrackingSectionProps = {
  payments: PaymentResult[];
  userName?: string;
};

export default function OrderTrackingSection({
  payments,
  userName,
}: OrderTrackingSectionProps) {
  return (
    <section aria-label="سفارش‌ها" className="flex flex-col gap-3 lg:gap-4 lg:h-[calc(100dvh-30em)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-5">
      {payments.map((payment) => (
        <OrderTrackingCard
          key={payment._id}
          payment={payment}
          userName={userName}
        />
      ))}
    </section>
  );
}
