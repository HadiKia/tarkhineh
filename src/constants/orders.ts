import type { DeliveryMethod } from "@/contexts/CartCheckoutContext";
import type { OrderStatus } from "@/types";
import { Box, Home, TickCircle, TruckFast, type Icon } from "iconsax-reactjs";

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

export type OrderStatusStep = {
  value: OrderStatus;
  label: string;
  icon: Icon;
};

const orderStatusStepsByDeliveryMethod = {
  pickup: [
    {
      value: "PREPARING",
      label: orderStatusLabels.PREPARING,
      icon: Home,
    },
    {
      value: "READY_FOR_PICKUP",
      label: orderStatusLabels.READY_FOR_PICKUP,
      icon: Box,
    },
    {
      value: "DELIVERED",
      label: orderStatusLabels.DELIVERED,
      icon: TickCircle,
    },
  ],
  courier: [
    {
      value: "PREPARING",
      label: orderStatusLabels.PREPARING,
      icon: Home,
    },
    {
      value: "OUT_FOR_DELIVERY",
      label: orderStatusLabels.OUT_FOR_DELIVERY,
      icon: TruckFast,
    },
    {
      value: "DELIVERED",
      label: orderStatusLabels.DELIVERED,
      icon: TickCircle,
    },
  ],
} satisfies Record<DeliveryMethod, OrderStatusStep[]>;

export function getOrderStatusOptions(deliveryMethod: DeliveryMethod) {
  return orderStatusStepsByDeliveryMethod[deliveryMethod];
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
