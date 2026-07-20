import Image from "next/image";
import { Heart } from "iconsax-reactjs";

import { Product } from "@/types";
import { formatPrice, toPersianDigits } from "@/utils/numberFormatter";

import { Button } from "@/components/ui/button";
import ProductRating from "./ProductRating";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

interface DiscountBadgeProps {
  price: number;
  discount: number;
}

function DiscountBadge({ price, discount }: DiscountBadgeProps) {
  return (
    <>
      <span className="text-xs text-gray-5 line-through lg:text-base">
        {formatPrice(price)}
      </span>

      <span className="rounded-lg bg-error-extraLight px-2 py-0.5 text-xs font-medium text-error">
        {toPersianDigits(discount)}%
      </span>
    </>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const {
    title,
    description,
    mainImageUrl,
    price,
    offPrice,
    discount,
    countInStock,
  } = product;

  const hasDiscount = discount > 0;
  const isFree = offPrice <= 0;
  const isOutOfStock = countInStock === 0;

  return (
    <article className="flex overflow-hidden rounded-sm border border-gray-4 bg-white transition-opacity lg:rounded-lg">
      <div className="relative w-23 shrink-0 lg:w-42.5">
        <Image
          src={mainImageUrl ?? "/images/empty/placeholder.png"}
          alt={title}
          fill
          sizes="(min-width:1024px) 170px, 92px"
          className={cn("object-cover", isOutOfStock && "grayscale")}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 p-2 lg:relative lg:gap-2.75 lg:ps-8 lg:pe-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="wrap-break-word line-clamp-1 text-xs font-semibold text-gray-8 lg:line-clamp-2 lg:text-xl">
              {title}
            </h3>
          </div>

          {hasDiscount && (
            <div className="flex shrink-0 items-center gap-2 lg:hidden">
              <DiscountBadge price={price} discount={discount} />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 lg:gap-4">
          <div className="min-w-0 flex-1">
            <p className="wrap-break-word line-clamp-1 text-xs text-gray-8 lg:line-clamp-2 lg:text-sm">
              {description}
            </p>
          </div>

          <div className="lg:min-h-13 flex shrink-0 flex-col items-end justify-center">
            {hasDiscount && (
              <div className="hidden items-center gap-2 lg:flex">
                <DiscountBadge price={price} discount={discount} />
              </div>
            )}

            {isFree ? (
              <span className="text-gray-8 lg:text-lg">رایگان</span>
            ) : (
              <div className="flex items-center gap-2 text-xs text-gray-8 lg:gap-1 lg:text-lg">
                <span>{formatPrice(offPrice)}</span>
                <span>تومان</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:gap-5">
          <div className="flex flex-1 items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              className="shrink-0 p-0 text-gray-7 hover:text-gray-7 size-4 lg:absolute lg:top-2 lg:inset-e-4 lg:size-6"
            >
              <Heart />
            </Button>
            <ProductRating />
          </div>

          <Button
            type="button"
            disabled={isOutOfStock}
            className={cn("flex-1 xl:min-w-61", isOutOfStock && "min-w-28.75")}
          >
            {isOutOfStock ? "ناموجود" : "افزودن به سبد خرید"}
          </Button>
        </div>
      </div>
    </article>
  );
}
