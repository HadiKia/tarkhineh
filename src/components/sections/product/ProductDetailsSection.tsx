"use client";

import { ProductBreadcrumbData } from "@/types";
import ProductDetails from "./ProductDetails";

import { useSuspenseProductBySlug } from "@/hooks/useProducts";

interface ProductDetailsSectionProps {
  slug: string;
  productBreadcrumbData: ProductBreadcrumbData;
}

export default function ProductDetailsSection({
  slug,
  productBreadcrumbData,
}: ProductDetailsSectionProps) {
  const { data } = useSuspenseProductBySlug(slug);

  return (
    <ProductDetails
      product={data.product}
      productBreadcrumbData={productBreadcrumbData}
    />
  );
}
