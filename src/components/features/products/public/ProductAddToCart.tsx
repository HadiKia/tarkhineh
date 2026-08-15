"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useGetUser } from "@/hooks/useAuth";
import useHydrated from "@/hooks/useHydrated";
import { useAddToCart, useRemoveFromCart } from "@/hooks/useProducts";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { toPersianDigits } from "@/utils/numberFormatter";
import { Add, Minus } from "iconsax-reactjs";

interface ProductAddToCartProps {
  product: Product;
  className?: string;
  showQuantityControls?: boolean;
}

export default function ProductAddToCart({
  product,
  className,
  showQuantityControls = false,
}: ProductAddToCartProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: userData } = useGetUser();
  const mutation = useAddToCart(product._id);
  const removeMutation = useRemoveFromCart(product._id);
  const isOutOfStock = product.countInStock === 0;
  const [quantityOverride, setQuantityOverride] = useState<number | null>(null);
  const isHydrated = useHydrated();
  const cartItem = userData?.cart?.productDetail.find(
    ({ _id }) => _id === product._id,
  ) ?? userData?.user?.cart?.products?.find(
    ({ productId }) => productId === product._id,
  );
  const quantity = isHydrated
    ? (quantityOverride ?? cartItem?.quantity ?? 0)
    : 0;
  const isInCart = quantity > 0;
  const isMutating = mutation.isPending || removeMutation.isPending;

  const handleClick = useCallback(() => {
    if (isInCart && !showQuantityControls) {
      router.push("/cart");
      return;
    }
    if (!userData?.user) {
      toast.error("برای افزودن به سبد خرید ابتدا وارد حساب کاربری شوید", {
        id: "product-cart-auth",
      });
      return;
    }
    if (isOutOfStock || isMutating) return;

    mutation.mutate(undefined, {
      onSuccess: ({ message }) => {
        setQuantityOverride(Math.max(quantity, 1));
        toast.success(message);
        queryClient.invalidateQueries({ queryKey: ["get-user"] });
      },
      onError: (error) => toast.error(error.message),
    });
  }, [
    isInCart,
    isMutating,
    isOutOfStock,
    mutation,
    queryClient,
    quantity,
    router,
    showQuantityControls,
    userData?.user,
  ]);

  const changeQuantity = useCallback(
    (direction: "increase" | "decrease") => {
      if (!userData?.user || isMutating || isOutOfStock) return;
      if (direction === "increase" && quantity >= product.countInStock) return;

      const cartMutation = direction === "increase" ? mutation : removeMutation;
      cartMutation.mutate(undefined, {
        onSuccess: () => {
          const nextQuantity = quantity + (direction === "increase" ? 1 : -1);
          setQuantityOverride(nextQuantity);
          queryClient.invalidateQueries({ queryKey: ["get-user"] });
        },
        onError: (error) => toast.error(error.message),
      });
    },
    [
      isMutating,
      isOutOfStock,
      mutation,
      product.countInStock,
      quantity,
      queryClient,
      removeMutation,
      userData?.user,
    ],
  );

  if (showQuantityControls && isInCart) {
    return (
      <div
        className={cn(
          "flex items-center justify-center lg:justify-end gap-2",
          className,
        )}
      >
        <Button
          type="button"
          variant="default"
          disabled={isMutating || quantity >= product.countInStock}
          onClick={() => changeQuantity("increase")}
          aria-label="افزایش تعداد محصول"
        >
          <Add />
        </Button>
        <span
          className="min-w-6 text-center text-primary text-lg font-semibold"
          aria-live="polite"
        >
          {toPersianDigits(quantity)}
        </span>
        <Button
          type="button"
          variant="default"
          disabled={isMutating}
          onClick={() => changeQuantity("decrease")}
          aria-label="کاهش تعداد محصول"
        >
          <Minus />
        </Button>
      </div>
    );
  }

  return (
    <Button
      type="button"
      variant={isInCart ? "outline" : "default"}
      disabled={isOutOfStock}
      isLoading={isMutating}
      onClick={handleClick}
      className={cn(className)}
    >
      {isOutOfStock
        ? "ناموجود"
        : isInCart
          ? "مشاهده سبد خرید"
          : "افزودن به سبد خرید"}
    </Button>
  );
}
