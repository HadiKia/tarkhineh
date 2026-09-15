"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import EmptyState from "@/components/common/EmptyState";
import CartPaymentPageSkeleton from "@/components/features/cart/CartPaymentPageSkeleton";
import CartSummary from "@/components/features/cart/CartSummary";
import PaymentStepContent from "@/components/features/cart/PaymentStepContent";
import { useCartCheckout } from "@/contexts/CartCheckoutContext";
import { useGetUser } from "@/hooks/useAuth";
import useHydrated from "@/hooks/useHydrated";

export default function PaymentPage() {
  const router = useRouter();
  const { data, isLoading } = useGetUser();
  const isHydrated = useHydrated();
  const { isDeliveryStepComplete } = useCartCheckout();
  const products = data?.cart?.productDetail ?? [];

  useEffect(() => {
    if (
      isHydrated &&
      !isLoading &&
      products.length > 0 &&
      !isDeliveryStepComplete
    ) {
      router.replace("/cart/completion-of-information");
    }
  }, [isDeliveryStepComplete, isHydrated, isLoading, products.length, router]);

  if (!isHydrated || isLoading) {
    return <CartPaymentPageSkeleton />;
  }

  if (products.length === 0) {
    return <EmptyState title="سبد خرید شما خالی است!" />;
  }

  if (!isDeliveryStepComplete) {
    return <CartPaymentPageSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-12 lg:gap-6">
      <PaymentStepContent />
      <CartSummary
        payDetail={data?.cart?.payDetail ?? null}
        coupon={data?.cart?.coupon ?? null}
        itemCount={products.length}
        products={products}
        variant="payment"
      />
    </div>
  );
}
