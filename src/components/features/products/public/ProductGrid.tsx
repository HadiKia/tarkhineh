import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-sm text-gray-5">محصولی یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-306 px-4 xl:px-0 flex flex-col lg:grid lg:grid-cols-2 gap-3 lg:gap-6 mb-6 mb:pb-12">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
