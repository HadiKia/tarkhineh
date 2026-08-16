"use client";

import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Add, Minus, Trash } from "iconsax-reactjs";
import { toast } from "sonner";

import ProductPrice from "@/components/features/products/public/ProductPrice";
import ProductRating from "@/components/features/products/public/ProductRating";
import { Button } from "@/components/ui/button";
import {
  useAddToCart,
  useRemoveFromCart,
  useRemoveProductFromCart,
} from "@/hooks/useProducts";
import type { CartProductDetail } from "@/types";
import type { Product } from "@/types";
import { formatPrice, toPersianDigits } from "@/utils/numberFormatter";

type CartItemCardProps = { product: CartProductDetail };

export default function CartItemCard({ product }: CartItemCardProps) {
  const queryClient = useQueryClient();
  const {
    _id,
    slug,
    title,
    description,
    mainImageUrl,
    rating,
    price,
    offPrice,
    discount,
    quantity,
    countInStock,
  } = product;
  const addMutation = useAddToCart(_id);
  const decreaseMutation = useRemoveFromCart(_id);
  const deleteMutation = useRemoveProductFromCart(_id);
  const isMutating =
    addMutation.isPending ||
    decreaseMutation.isPending ||
    deleteMutation.isPending;
  const productHref = `/menu/${slug}`;

  const invalidateCart = () =>
    queryClient.invalidateQueries({ queryKey: ["get-user"] });

  const changeQuantity = (direction: "increase" | "decrease") => {
    if (isMutating) return;
    if (direction === "increase" && quantity >= countInStock) return;

    const mutation = direction === "increase" ? addMutation : decreaseMutation;
    mutation.mutate(undefined, {
      onSuccess: invalidateCart,
      onError: (error) => toast.error(error.message),
    });
  };

  const removeProduct = () => {
    if (isMutating) return;
    deleteMutation.mutate(undefined, {
      onSuccess: () => {
        invalidateCart();
      },
      onError: (error) => toast.error(error.message),
    });
  };

  return (
    <article className="flex shrink-0 gap-2 overflow-hidden p-2 lg:gap-0 lg:shrink-0 lg:rounded-lg lg:border lg:border-gray-4 lg:p-0">
      <div className="hidden md:block relative w-23 shrink-0 lg:w-42.5 rounded overflow-hidden lg:rounded-none lg:min-h-39.5">
        <Link href={productHref}>
          <Image
            src={mainImageUrl ?? "/images/empty/placeholder.png"}
            alt={title}
            fill
            sizes="(min-width:1024px) 170px, 92px"
            className="object-cover"
          />
        </Link>
      </div>
      <div className="flex items-center justify-between flex-1 gap-2 lg:px-8 lg:py-4 lg:flex-col">
        <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
          <Link href={productHref} className="min-w-0">
            <h2 className="wrap-break-word line-clamp-1 text-xs font-semibold text-gray-8 lg:line-clamp-2 lg:text-xl">
              {title}
            </h2>
          </Link>
          <div className="lg:hidden">
            <div className="flex items-center gap-1.5 text-xs text-gray-7 lg:text-lg">
              <span>{formatPrice(offPrice)}</span>
              <span>تومان</span>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            className="p-0 hidden lg:block"
            disabled={isMutating}
            onClick={removeProduct}
            aria-label={`حذف ${title} از سبد خرید`}
          >
            <Trash className="size-6" />
          </Button>
        </div>
        <div className="lg:hidden">
          <div className="flex items-center gap-2 bg-tint-1 rounded">
            <Button
              type="button"
              variant="link"
              className="px-1"
              disabled={isMutating || quantity >= countInStock}
              onClick={() => changeQuantity("increase")}
              aria-label="افزایش تعداد محصول"
            >
              <Add className="size-4" />
            </Button>
            <span
              className="min-w-3 text-center text-sm font-semibold text-primary"
              aria-live="polite"
            >
              {toPersianDigits(quantity)}
            </span>
            <Button
              type="button"
              variant="link"
              className="px-1"
              disabled={isMutating}
              onClick={() => changeQuantity("decrease")}
              aria-label="کاهش تعداد محصول"
            >
              {quantity === 1 ? (
                <Trash className="size-4" />
              ) : (
                <Minus className="size-4" />
              )}
            </Button>
          </div>
        </div>
        <p className="hidden w-full wrap-break-word text-gray-8 lg:line-clamp-2 lg:text-sm">
          {description}
        </p>

        <div className="hidden lg:flex w-full items-end justify-between gap-2">
          <div className="flex items-center gap-6">
            <ProductRating
              product={{ _id, rating } as unknown as Product}
              onSuccess={() => {
                queryClient.invalidateQueries({ queryKey: ["get-user"] });
              }}
            />
            <div className="flex items-center gap-2 bg-tint-1 rounded">
              <Button
                type="button"
                variant="link"
                className="px-1"
                disabled={isMutating || quantity >= countInStock}
                onClick={() => changeQuantity("increase")}
                aria-label="افزایش تعداد محصول"
              >
                <Add className="size-4" />
              </Button>
              <span
                className="min-w-3 text-center text-sm font-semibold text-primary"
                aria-live="polite"
              >
                {toPersianDigits(quantity)}
              </span>
              <Button
                type="button"
                variant="link"
                className="px-1"
                disabled={isMutating}
                onClick={() => changeQuantity("decrease")}
                aria-label="کاهش تعداد محصول"
              >
                {quantity === 1 ? (
                  <Trash className="size-4" />
                ) : (
                  <Minus className="size-4" />
                )}
              </Button>
            </div>
          </div>

          <ProductPrice
            price={price}
            offPrice={offPrice}
            discount={discount}
            className="items-end"
            freeClassName="text-sm md:text-lg"
            amountClassName="text-sm md:text-lg"
          />
        </div>
      </div>
    </article>
  );
}
