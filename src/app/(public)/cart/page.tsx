"use client";

import EmptyState from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { useGetUser } from "@/hooks/useAuth";
import useHydrated from "@/hooks/useHydrated";
import Link from "next/link";
import CartItemsList from "@/components/features/cart/CartItemsList";
import CartSummary from "@/components/features/cart/CartSummary";

export default function CartPage() {
  const { data } = useGetUser();
  const isHydrated = useHydrated();
  const products = data?.cart?.productDetail ?? [];
  const hasCart = isHydrated && products.length > 0;

  if (!hasCart) {
    return (
      <EmptyState
        title="سبد خرید شما خالی است!"
        className="lg:border lg:border-solid"
        action={
          <Button variant="outline" asChild className="w-38 lg:w-46">
            <Link href="/menu">منوی رستوران</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6 items-start p-6 border border-gray-4 rounded-lg lg:p-0 lg:rounded-none lg:border-none">
      <CartItemsList products={products} />
      <CartSummary payDetail={data?.cart?.payDetail ?? null} itemCount={products.length} />
    </div>
  );
}
