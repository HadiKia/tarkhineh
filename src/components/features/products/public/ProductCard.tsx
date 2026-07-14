import { Product } from "@/types";
import Image from "next/image";
import { Star, Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price);
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discount > 0;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-2 bg-white transition-shadow hover:shadow-md">
      <div className="relative aspect-square">
        <Image
          src={product.mainImageUrl ?? "/images/placeholder.png"}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
        />
      </div>

      <div className="p-3">
        <h3 className="mb-1 line-clamp-1 text-sm font-medium text-gray-8">
          {product.title}
        </h3>

        <div className="mb-2 flex items-center gap-1">
          <Star className="size-3.5 fill-yellow-5 text-yellow-5" />
          <span className="text-xs text-gray-6">
            {product.rating.toFixed(1)} ({product.numReviews})
          </span>
        </div>

        <div className="flex items-center justify-between">
          {hasDiscount && (
            <span className=" rounded-full bg-error-extraLight px-2 py-0.5 text-xs font-medium text-destructive">
              {product.discount}%
            </span>
          )}
          <div className="flex items-center gap-1.5">
            {hasDiscount && (
              <span className="text-xs text-gray-5 line-through">
                {formatPrice(product.price)}
              </span>
            )}
            <span className="text-sm font-bold text-primary">
              {formatPrice(product.offPrice)}
            </span>
            <span className="text-xs text-gray-5">تومان</span>
          </div>
        </div>
      </div>
    </div>
  );
}
