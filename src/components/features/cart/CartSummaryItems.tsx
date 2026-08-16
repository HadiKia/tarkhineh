"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Add, Minus, Trash } from "iconsax-reactjs";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAddToCart, useRemoveFromCart } from "@/hooks/useProducts";
import type { CartProductDetail } from "@/types";
import { formatPrice, toPersianDigits } from "@/utils/numberFormatter";

type CartSummaryItemsProps = { products: CartProductDetail[] };

function CartSummaryItem({ product }: { product: CartProductDetail }) {
  const queryClient = useQueryClient();
  const addMutation = useAddToCart(product._id);
  const removeMutation = useRemoveFromCart(product._id);
  const isMutating = addMutation.isPending || removeMutation.isPending;

  const changeQuantity = (direction: "increase" | "decrease") => {
    if (isMutating) return;
    if (direction === "increase" && product.quantity >= product.countInStock) {
      return;
    }

    const mutation = direction === "increase" ? addMutation : removeMutation;
    mutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-user"] });
      },
      onError: (error) => toast.error(error.message),
    });
  };

  return (
    <div className="flex items-center justify-between gap-2 px-2 py-3 even:bg-gray-2 odd:bg-gray-1 lg:px-4">
      <div className="min-w-0">
        <h3 className="line-clamp-1 text-xs font-semibold text-gray-8">
          {product.title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-gray-7">
          <span>{formatPrice(product.offPrice)}</span>
          <span>تومان</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 rounded bg-tint-1">
        <Button
          type="button"
          variant="link"
          className="px-1"
          disabled={isMutating || product.quantity >= product.countInStock}
          onClick={() => changeQuantity("increase")}
          aria-label="افزایش تعداد محصول"
        >
          <Add className="size-4" />
        </Button>
        <span className="min-w-3 text-center text-sm font-semibold text-primary" aria-live="polite">
          {toPersianDigits(product.quantity)}
        </span>
        <Button
          type="button"
          variant="link"
          className="px-1"
          disabled={isMutating}
          onClick={() => changeQuantity("decrease")}
          aria-label="کاهش تعداد محصول"
        >
          {product.quantity === 1 ? <Trash className="size-4" /> : <Minus className="size-4" />}
        </Button>
      </div>
    </div>
  );
}

export default function CartSummaryItems({ products }: CartSummaryItemsProps) {
  return (
    <section
      className="hidden lg:block mb-4 max-h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-5"
      aria-label="آیتم‌های سبد خرید"
    >
      {products.map((product) => (
        <CartSummaryItem key={product._id} product={product} />
      ))}
    </section>
  );
}
