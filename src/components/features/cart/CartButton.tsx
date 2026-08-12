"use client";

import Link from "next/link";
import { ShoppingCart } from "iconsax-reactjs";
import type { VariantProps } from "class-variance-authority";

import { Button, buttonVariants } from "@/components/ui/button";
import { useGetUser } from "@/hooks/useAuth";
import useHydrated from "@/hooks/useHydrated";
import { toPersianDigits } from "@/utils/numberFormatter";
import { cn } from "@/lib/utils";

type CartButtonProps = {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  className?: string;
  iconClassName?: string;
};

export default function CartButton({
  variant = "secondary",
  className,
  iconClassName,
}: CartButtonProps) {
  const { data: userData } = useGetUser();
  const isHydrated = useHydrated();
  const cartItemCount = isHydrated
    ? (userData?.user?.cart?.products ?? []).length
    : 0;

  return (
    <Button variant={variant} asChild className={className}>
      <Link
        href="/cart"
        aria-label={`سبد خرید${cartItemCount ? `، ${cartItemCount} آیتم` : ""}`}
        className="relative"
      >
        <ShoppingCart className={cn(iconClassName)} />
        {cartItemCount > 0 && (
          <span className="absolute -top-1.5 -inset-s-1.5 flex min-w-4 items-center justify-center rounded-full bg-tint-6 px-1 text-xs text-white lg:top-0 lg:inset-e-auto lg:inset-s-0">
            {toPersianDigits(cartItemCount)}
          </span>
        )}
      </Link>
    </Button>
  );
}
