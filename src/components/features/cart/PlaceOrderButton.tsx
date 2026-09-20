"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useBranchContext } from "@/contexts/BranchContext";
import { useCartCheckout } from "@/contexts/CartCheckoutContext";
import { useCreatePayment } from "@/hooks/usePayment";
import type { ApiError } from "@/types";
import { CardCoin } from "iconsax-reactjs";

type PlaceOrderButtonProps = {
  className?: string;
};

export default function PlaceOrderButton({
  className,
}: PlaceOrderButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useCreatePayment();
  const { selectedBranchId } = useBranchContext();
  const {
    deliveryMethod,
    selectedAddressId,
    paymentMethod,
    paymentGateway,
    orderNote,
    isDeliveryStepComplete,
    resetCheckout,
  } = useCartCheckout();

  const isDisabled =
    mutation.isPending ||
    !isDeliveryStepComplete ||
    (deliveryMethod === "pickup" && !selectedBranchId);

  const handleSubmit = async () => {
    if (isDisabled || !deliveryMethod) return;

    try {
      const { payment, message } = await mutation.mutateAsync({
        deliveryMethod,
        addressId: deliveryMethod === "courier" ? selectedAddressId : null,
        branchId: selectedBranchId,
        note: orderNote,
        paymentMethod,
        paymentGateway: paymentMethod === "online" ? paymentGateway : null,
      });

      await queryClient.invalidateQueries({ queryKey: ["get-user"] });
      resetCheckout();
      toast.success(message);
      router.replace(`/payment/${payment._id}`);
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(
        apiError.response?.data?.message || "ثبت سفارش با خطا مواجه شد",
      );
    }
  };

  return (
    <Button
      type="button"
      disabled={isDisabled}
      isLoading={mutation.isPending}
      onClick={handleSubmit}
      className={className}
    >
      <span>تایید و پرداخت</span>
      <CardCoin aria-hidden="true" />
    </Button>
  );
}
