import Image from "next/image";

import { Product } from "@/types";
import { formatPrice } from "@/utils/numberFormatter";

import ProductRating from "./ProductRating";
import { cn } from "@/lib/utils";
import ProductLike from "./ProductLike";
import Link from "next/link";
import ProductDiscountBadge from "./ProductDiscountBadge";
import ProductAddToCart from "./ProductAddToCart";

interface ProductCardProps {
  product: Product;
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
    slug,
  } = product;

  const hasDiscount = discount > 0;
  const isFree = offPrice <= 0;
  const isOutOfStock = countInStock === 0;
  const productHref = `/menu/${slug}`;

  return (
    <article className="flex overflow-hidden rounded-sm border border-gray-4 bg-white transition-opacity lg:rounded-lg">
      <div className="relative w-23 shrink-0 lg:w-42.5">
        <Link href={productHref}>
          <Image
            src={mainImageUrl ?? "/images/empty/placeholder.png"}
            alt={title}
            fill
            sizes="(min-width:1024px) 170px, 92px"
            className={cn("object-cover", isOutOfStock && "grayscale")}
          />
        </Link>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 p-2 lg:relative lg:gap-2.75 lg:ps-8 lg:pe-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <Link href={productHref}>
              <h3 className="lg:pe-6 wrap-break-word line-clamp-1 text-xs font-semibold text-gray-8 lg:line-clamp-2 lg:text-xl">
                {title}
              </h3>
            </Link>
          </div>

          {hasDiscount && (
            <ProductDiscountBadge
              price={price}
              discount={discount}
              className="flex shrink-0 items-center gap-2 lg:hidden"
            />
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
              <ProductDiscountBadge
                price={price}
                discount={discount}
                className="hidden items-center gap-2 lg:flex"
              />
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

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-1 items-center gap-2">
            <ProductLike
              product={product}
              className="size-4 lg:absolute lg:top-2 lg:inset-e-4 lg:size-6"
            />
            <ProductRating product={product} />
          </div>

          <ProductAddToCart
            product={product}
            className={cn("flex-1 xl:min-w-61", isOutOfStock && "min-w-28.75")}
          />
        </div>
      </div>
    </article>
  );
}
