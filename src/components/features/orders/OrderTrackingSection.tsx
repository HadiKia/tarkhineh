import type { PaymentResult } from "@/types";

import OrderTrackingCard from "./OrderTrackingCard";

type OrderTrackingSectionProps = {
  payments: PaymentResult[];
};

export default function OrderTrackingSection({
  payments,
}: OrderTrackingSectionProps) {
  return (
    <section aria-label="سفارش‌ها">
      {payments.map((payment) => (
        <OrderTrackingCard key={payment._id} payment={payment} />
      ))}
    </section>
  );
}
