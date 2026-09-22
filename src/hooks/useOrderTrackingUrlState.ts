"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import type { DeliveryMethod } from "@/contexts/CartCheckoutContext";

type OrderTrackingFilters = {
  deliveryMethod?: DeliveryMethod | null;
};

const ORDER_TRACKING_PATH = "/profile/order-tracking";

export default function useOrderTrackingUrlState() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deliveryMethodParam = searchParams.get("deliveryMethod");
  const selectedDeliveryMethod: DeliveryMethod | null =
    deliveryMethodParam === "courier" || deliveryMethodParam === "pickup"
      ? deliveryMethodParam
      : null;

  const updateParams = useCallback(
    (updates: OrderTrackingFilters) => {
      const params = new URLSearchParams(searchParams.toString());

      if ("deliveryMethod" in updates) {
        if (updates.deliveryMethod) {
          params.set("deliveryMethod", updates.deliveryMethod);
        } else {
          params.delete("deliveryMethod");
        }
      }

      router.replace(
        params.size
          ? `${ORDER_TRACKING_PATH}?${params.toString()}`
          : ORDER_TRACKING_PATH,
        { scroll: false },
      );
    },
    [router, searchParams],
  );

  return useMemo(
    () => ({
      selectedDeliveryMethod,
      onSelectDeliveryMethod: (deliveryMethod: DeliveryMethod | null) =>
        updateParams({ deliveryMethod }),
    }),
    [selectedDeliveryMethod, updateParams],
  );
}
