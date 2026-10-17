"use client";

import EmptyState from "@/components/common/EmptyState";
import SearchNotFound from "@/components/common/SearchNotFound";
import ProductGrid from "@/components/features/products/public/ProductGrid";
import { useSuspenseProducts } from "@/hooks/useProducts";
import type { ProductListParams } from "@/types";

type ProductResultsSectionProps = {
  params?: ProductListParams;
};

export default function ProductResultsSection({
  params,
}: ProductResultsSectionProps) {
  const { data: productData } = useSuspenseProducts(params);
  const products = productData?.products ?? [];

  if (products.length === 0) {
    return params?.search ? (
      <SearchNotFound title={`نتیجه‌ای برای «${params.search}» یافت نشد.`} />
    ) : (
      <EmptyState title="محصولی یافت نشد." />
    );
  }

  return <ProductGrid products={products} />;
}
