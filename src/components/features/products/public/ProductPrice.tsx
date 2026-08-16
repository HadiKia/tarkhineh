import ProductDiscountBadge from "@/components/features/products/public/ProductDiscountBadge";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/numberFormatter";

type ProductPriceProps = {
  price: number;
  offPrice: number;
  discount: number;
  className?: string;
  discountClassName?: string;
  freeClassName?: string;
  amountClassName?: string;
};

export default function ProductPrice({
  price,
  offPrice,
  discount,
  className,
  discountClassName,
  freeClassName,
  amountClassName,
}: ProductPriceProps) {
  const isFree = offPrice <= 0;

  return (
    <div className={cn("flex flex-col", className)}>
      {discount > 0 && (
        <ProductDiscountBadge
          price={price}
          discount={discount}
          className={cn("flex items-center gap-2", discountClassName)}
        />
      )}

      {isFree ? (
        <span className={cn("text-gray-8", freeClassName)}>رایگان</span>
      ) : (
        <div className={cn("flex items-center gap-1 text-gray-8", amountClassName)}>
          <span>{formatPrice(offPrice)}</span>
          <span>تومان</span>
        </div>
      )}
    </div>
  );
}
