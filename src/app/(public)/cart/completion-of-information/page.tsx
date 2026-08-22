"use client";

import EmptyState from "@/components/common/EmptyState";
import CartDeliveryMethod from "@/components/features/cart/CartDeliveryMethod";
import CartSummary from "@/components/features/cart/CartSummary";
import { useGetUser } from "@/hooks/useAuth";
import useHydrated from "@/hooks/useHydrated";

export default function CompletionOfInformationPage() {
  const { data } = useGetUser();
  const isHydrated = useHydrated();
  const products = data?.cart?.productDetail ?? [];

  if (isHydrated && products.length === 0) {
    return <EmptyState title="سبد خرید شما خالی است!" />;
  }

  return (
    <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-12 lg:gap-6">
      <CartDeliveryMethod />
      <CartSummary
        payDetail={data?.cart?.payDetail ?? null}
        itemCount={products.length}
        products={products}
        variant="checkout"
      />
    </div>
  );
}
