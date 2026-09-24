import type { DeliveryMethod } from "@/contexts/CartCheckoutContext";
import type { OrderStatus } from "@/types";

export const ADMIN_ORDERS_PATH = "/admin/orders";

export const orderStatusLabels: Record<OrderStatus, string> = {
  PREPARING: "در حال آماده‌سازی",
  OUT_FOR_DELIVERY: "ارسال توسط پیک",
  READY_FOR_PICKUP: "آماده تحویل حضوری",
  DELIVERED: "تحویل سفارش",
};

export const deliveryMethodLabels: Record<DeliveryMethod, string> = {
  courier: "ارسال توسط پیک",
  pickup: "تحویل حضوری",
};

export function getOrderStatusOptions(deliveryMethod: DeliveryMethod) {
  return deliveryMethod === "pickup"
    ? ([
        ["PREPARING", orderStatusLabels.PREPARING],
        ["READY_FOR_PICKUP", orderStatusLabels.READY_FOR_PICKUP],
        ["DELIVERED", orderStatusLabels.DELIVERED],
      ] as const)
    : ([
        ["PREPARING", orderStatusLabels.PREPARING],
        ["OUT_FOR_DELIVERY", orderStatusLabels.OUT_FOR_DELIVERY],
        ["DELIVERED", orderStatusLabels.DELIVERED],
      ] as const);
}

export function getOrderStatusLabel(
  status: OrderStatus | undefined,
  deliveryMethod?: DeliveryMethod,
) {
  if (!status) return orderStatusLabels.PREPARING;

  if (status === "OUT_FOR_DELIVERY" && deliveryMethod === "pickup") {
    return orderStatusLabels.READY_FOR_PICKUP;
  }

  return orderStatusLabels[status];
}
