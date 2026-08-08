import type { Product } from "@/types";

import FavoriteProductCard from "./FavoriteProductCard";

interface FavoriteProductGridProps {
  products: Product[];
}

export default function FavoriteProductGrid({
  products,
}: FavoriteProductGridProps) {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-5 lg:gap-y-6">
      {products.map((product) => (
        <FavoriteProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
