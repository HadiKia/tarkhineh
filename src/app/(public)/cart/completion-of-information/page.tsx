"use client";

import EmptyState from "@/components/common/EmptyState";
import TextArea from "@/components/common/TextArea";
import CartCompletionOfInformationPageSkeleton from "@/components/features/cart/CartCompletionOfInformationPageSkeleton";
import CartDeliveryMethod from "@/components/features/cart/CartDeliveryMethod";
import CartSummary from "@/components/features/cart/CartSummary";
import { useGetUser } from "@/hooks/useAuth";
import useHydrated from "@/hooks/useHydrated";
import { useCartCheckout } from "@/contexts/CartCheckoutContext";

export default function CompletionOfInformationPage() {
  const { data, isLoading } = useGetUser();
  const isHydrated = useHydrated();
  const products = data?.cart?.productDetail ?? [];
  const { orderNote, setOrderNote } = useCartCheckout();

  if (!isHydrated || isLoading) {
    return <CartCompletionOfInformationPageSkeleton />;
  }

  if (products.length === 0) {
    return <EmptyState title="سبد خرید شما خالی است!" />;
  }

  return (
    <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-12 lg:gap-6">
      <section className="lg:col-span-8 xl:col-span-7 flex flex-col gap-3 lg:gap-6">
      <CartDeliveryMethod />
       <TextArea
        id="order-notes"
        label=""
        placeholder="توضیحات سفارش (اختیاری)"
        value={orderNote}
        onChange={(event) => setOrderNote(event.target.value)}
        className="min-h-28.5 rounded-lg p-4 lg:px-6"
      />
      </section>
      <CartSummary
        payDetail={data?.cart?.payDetail ?? null}
        coupon={data?.cart?.coupon ?? null}
        itemCount={products.length}
        products={products}
        variant="checkout"
      />
    </div>
  );
}
