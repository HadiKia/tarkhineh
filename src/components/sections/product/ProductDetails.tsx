import type { Product } from "@/types";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({
  product,
}: ProductDetailsProps) {
  return <div>ProductDetails</div>;
}