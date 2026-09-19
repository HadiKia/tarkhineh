import type { PaymentResult } from "@/types";

type OrderTrackingCardProps = {
  payment: PaymentResult;
};

export default function OrderTrackingCard({
  payment,
}: OrderTrackingCardProps) {
  const {
    _id,
    invoiceNumber,
    amount,
    paymentMethod,
    paymentGateway,
    description,
    paymentDate,
    status,
    isPaid,
    createdAt,
    cart,
    checkout,
  } = payment;

  console.log("Order tracking card data:", {
    _id,
    invoiceNumber,
    amount,
    paymentMethod,
    paymentGateway,
    description,
    paymentDate,
    status,
    isPaid,
    createdAt,
    cart,
    checkout,
  });

  return null;
}
