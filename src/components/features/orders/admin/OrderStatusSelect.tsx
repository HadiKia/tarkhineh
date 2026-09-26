"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  deliveryMethodLabels,
  getOrderStatusOptions,
} from "@/constants/orders";
import { paymentQueryKeys, useUpdateOrderStatus } from "@/hooks/usePayment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AdminPaymentResult, ApiError, OrderStatus } from "@/types";

type OrderStatusSelectProps = {
  payment: AdminPaymentResult;
};

export default function OrderStatusSelect({
  payment,
}: OrderStatusSelectProps) {
  const queryClient = useQueryClient();
  const updateMutation = useUpdateOrderStatus(payment._id);
  const deliveryMethod = payment.checkout?.deliveryMethod ?? "courier";
  const options = getOrderStatusOptions(deliveryMethod);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(
    payment.orderStatus ?? "PREPARING",
  );

  const handleChange = async (value: string) => {
    const nextStatus = value as OrderStatus;
    const previousStatus = orderStatus;

    setOrderStatus(nextStatus);

    try {
      const response = await updateMutation.mutateAsync({
        orderStatus: nextStatus,
      });

      toast.success(response.message);
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: paymentQueryKeys.adminList(),
        }),
        queryClient.invalidateQueries({
          queryKey: paymentQueryKeys.adminDetail(payment._id),
        }),
      ]);
    } catch (error) {
      setOrderStatus(previousStatus);
      const apiError = error as ApiError;
      toast.error(
        apiError.response?.data?.message ?? "وضعیت سفارش به‌روزرسانی نشد",
      );
    }
  };

  return (
    <div className="flex min-w-40 lg:min-w-45 flex-col gap-1.5">
      <span className="text-xs text-gray-6">
        روش تحویل: {deliveryMethodLabels[deliveryMethod]}
      </span>
      <Select
        value={orderStatus}
        onValueChange={handleChange}
        disabled={updateMutation.isPending}
      >
        <SelectTrigger aria-label="وضعیت سفارش">
          <SelectValue placeholder="انتخاب وضعیت" />
        </SelectTrigger>
        <SelectContent position="popper">
          {options.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
