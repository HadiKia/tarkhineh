import { formatPrice, toPersianDigits } from "@/utils/numberFormatter";

interface ProductDiscountBadgeProps {
  price: number;
  discount: number;
  className?: string;
}

export default function ProductDiscountBadge({
  price,
  discount,
  className,
}: ProductDiscountBadgeProps) {
  if (discount <= 0) return null;

  return (
    <div className={className}>
      <span className="text-xs text-gray-5 line-through lg:text-base">
        {formatPrice(price)}
      </span>

      <span className="rounded-lg bg-error-extraLight px-2 py-0.5 text-xs font-medium text-error">
        {toPersianDigits(discount)}%
      </span>
    </div>
  );
}