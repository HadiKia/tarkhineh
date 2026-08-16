"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ProductPrice from "@/components/features/products/public/ProductPrice";
import ProductLike from "@/components/features/products/public/ProductLike";
import ProductAddToCart from "@/components/features/products/public/ProductAddToCart";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { toPersianDigits } from "@/utils/numberFormatter";
import ProductRating from "@/components/features/products/public/ProductRating";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { StarIcon } from "lucide-react";

interface FavoriteProductCardProps {
  product: Product;
}

export default function FavoriteProductCard({
  product,
}: FavoriteProductCardProps) {
  const router = useRouter();
  const {
    title,
    mainImageUrl,
    price,
    offPrice,
    discount,
    countInStock,
    slug,
    numReviews,
  } = product;

  const isOutOfStock = countInStock === 0;
  const productHref = `/menu/${slug}`;

  return (
    <article className="overflow-hidden rounded lg:rounded-lg border border-gray-4 bg-white flex flex-col h-full">
      <Link href={productHref} className="relative block h-26 lg:h-35">
        <Image
          src={mainImageUrl ?? "/images/empty/placeholder.png"}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw"
          className={cn("object-cover", isOutOfStock && "grayscale")}
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between p-2 lg:p-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <Link href={productHref} className="min-w-0">
            <h3 className="line-clamp-1 text-xs font-semibold text-gray-8 lg:text-xl">
              {title}
            </h3>
          </Link>

          <ProductLike
            product={product}
            className="size-6 shrink-0"
            onSuccess={(isLiked) => {
              if (!isLiked) router.refresh();
            }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 lg:mb-6 ">
          <div className="md:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-md"
                  aria-label="امتیازدهی به محصول"
                >
                  <StarIcon
                    size={16}
                    className="fill-warning-light text-warning-light"
                  />

                  <span className="text-xs text-gray-8">
                    {toPersianDigits(numReviews)}
                  </span>
                </button>
              </PopoverTrigger>

              <PopoverContent
                side="bottom"
                align="start"
                className="w-auto p-3"
              >
                <ProductRating
                  product={product}
                  onSuccess={() => router.refresh()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Desktop */}
          <div className="hidden md:block">
            <ProductRating
              product={product}
              onSuccess={() => router.refresh()}
            />
          </div>

          <ProductPrice
            price={price}
            offPrice={offPrice}
            discount={discount}
            className="justify-end gap-1"
            freeClassName="text-xs lg:text-base"
            amountClassName="text-xs lg:text-base"
          />
        </div>

        <ProductAddToCart product={product} />
      </div>
    </article>
  );
}
