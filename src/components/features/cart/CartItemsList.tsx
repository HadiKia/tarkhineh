import CartItemCard from "@/components/features/cart/CartItemCard";
import type { CartProductDetail } from "@/types";

type CartItemsListProps = {
  products: CartProductDetail[];
};

export default function CartItemsList({ products }: CartItemsListProps) {
  return (
    <section
      className="flex flex-col lg:gap-4 min-h-0 h-50 lg:h-[calc(100dvh-30em)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-5 lg:col-span-8 xl:col-span-7 lg:p-6 lg:border lg:border-gray-4 lg:rounded-lg *:odd:bg-gray-1 *:even:bg-gray-2 lg:*:odd:bg-transparent lg:*:even:bg-transparent"
      aria-label="آیتم‌های سبد خرید"
    >
      {products.map((product) => (
        <CartItemCard key={product._id} product={product} />
      ))}
    </section>
  );
}
