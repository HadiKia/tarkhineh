"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "iconsax-reactjs";

import { Button } from "@/components/ui/button";
import { useGetUser } from "@/hooks/useAuth";
import useHydrated from "@/hooks/useHydrated";
import { toPersianDigits } from "@/utils/numberFormatter";

export default function CartHeaderButton() {
  const pathname = usePathname();
  const { data: userData } = useGetUser();
  const isHydrated = useHydrated();
  const isCartRoute = pathname === "/cart" || pathname.startsWith("/cart/");
  const cartItemCount = isHydrated
    ? (userData?.user?.cart?.products ?? []).length
    : 0;

  return (
    <Button
      variant={isCartRoute ? "default" : "secondary"}
      asChild
      className="p-1 lg:p-1.75"
    >
      <Link
        href="/cart"
        aria-label={`سبد خرید${cartItemCount ? `، ${cartItemCount} آیتم` : ""}`}
        className="relative"
      >
        <ShoppingCart className="w-4 h-4 lg:w-6 lg:h-6" />
        {cartItemCount > 0 && (
          <span className="absolute -top-2 inset-e-4 lg:top-0 lg:inset-e-auto lg:inset-s-0 flex min-w-4 items-center justify-center rounded-full bg-tint-6 px-1 text-xs text-white">
            {toPersianDigits(cartItemCount)}
          </span>
        )}
      </Link>
    </Button>
  );
}
