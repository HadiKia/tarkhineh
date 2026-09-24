"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getOrderStatusOptions,
  deliveryMethodLabels,
} from "@/constants/orders";
import { paymentQueryKeys, useUpdateOrderStatus } from "@/hooks/usePayment";
import type { AdminPaymentResult, ApiError, OrderStatus } from "@/types";

type UpdateOrderStatusModalProps = {
  open: boolean;
  onClose: () => void;
  payment: AdminPaymentResult | null;
};

export default function UpdateOrderStatusModal({
  open,
  onClose,
  payment,
}: UpdateOrderStatusModalProps) {
  const queryClient = useQueryClient();
  const paymentId = payment?._id ?? "";
  const updateMutation = useUpdateOrderStatus(paymentId);
  const deliveryMethod = payment?.checkout?.deliveryMethod ?? "courier";
  const options = getOrderStatusOptions(deliveryMethod);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(
    payment?.orderStatus ?? "PREPARING",
  );

  const handleUpdate = async () => {
    if (!payment) return;

    try {
      const response = await updateMutation.mutateAsync({ orderStatus });

      toast.success(response.message);
      await queryClient.invalidateQueries({
        queryKey: paymentQueryKeys.adminList(),
      });
      onClose();
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(
        apiError.response?.data?.message ?? "وضعیت سفارش به‌روزرسانی نشد",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تغییر وضعیت سفارش</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-y-8 px-6 py-4 md:px-17.25 md:pt-8 md:pb-6">
          <p className="text-center text-xs text-gray-8 md:text-base">
            روش تحویل: {deliveryMethodLabels[deliveryMethod]}
          </p>

          <Select
            value={orderStatus}
            onValueChange={(value) => setOrderStatus(value as OrderStatus)}
            disabled={updateMutation.isPending}
          >
            <SelectTrigger aria-label="وضعیت سفارش">
              <SelectValue placeholder="انتخاب وضعیت" />
            </SelectTrigger>
            <SelectContent position="popper">
              {options.map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center justify-between gap-4 md:gap-5">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={updateMutation.isPending}
              className="flex-1"
            >
              انصراف
            </Button>
            <Button
              type="button"
              onClick={handleUpdate}
              isLoading={updateMutation.isPending}
              className="flex-1"
            >
              ثبت وضعیت
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
