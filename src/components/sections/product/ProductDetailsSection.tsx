"use client";

import ProductDetails from "./ProductDetails";

import { useSuspenseProductBySlug } from "@/hooks/useProducts";

interface ProductDetailsSectionProps {
  slug: string;
}

export default function ProductDetailsSection({
  slug,
}: ProductDetailsSectionProps) {
  const { data } = useSuspenseProductBySlug(slug);

  return <ProductDetails product={data.product} />;
}
