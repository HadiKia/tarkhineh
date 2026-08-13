"use client";

import EmptyState from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { useGetUser } from "@/hooks/useAuth";
import useHydrated from "@/hooks/useHydrated";
import Link from "next/link";

export default function CartPage() {
  const { data } = useGetUser();
  const isHydrated = useHydrated();
  const hasCart = isHydrated && Boolean(data?.user?.cart?.products?.length);

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

  return <p>content</p>;
}
