"use client";

import useOrderTrackingUrlState from "@/hooks/useOrderTrackingUrlState";

import OrderTrackingFilter from "./OrderTrackingFilter";

export default function OrderTrackingFilterSection() {
  const { selectedDeliveryMethod, onSelectDeliveryMethod } =
    useOrderTrackingUrlState();

  return (
    <OrderTrackingFilter
      selectedDeliveryMethod={selectedDeliveryMethod}
      onSelectDeliveryMethod={onSelectDeliveryMethod}
    />
  );
}
