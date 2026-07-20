"use client";

import { useMenuContext } from "@/contexts/MenuContext";
import { useSuspenseProducts } from "@/hooks/useProducts";
import ProductGrid from "@/components/features/products/public/ProductGrid";
import EmptyState from "@/components/common/EmptyState";

export default function ProductGridSection() {
  const {
    resolvedMealCourse,
    selectedFoodGroup,
    selectedSearch,
    selectedSort,
  } = useMenuContext();

  const { data: productData } = useSuspenseProducts({
    mealCourse: resolvedMealCourse ?? undefined,
    foodGroup: selectedFoodGroup ?? undefined,
    search: selectedSearch ?? undefined,
    sort: selectedSort ?? undefined,
  });

  const products = productData?.products ?? [];

  if (products.length === 0) {
    return selectedSearch ? (
      <p>{`نتیجه‌ای برای «${selectedSearch}» یافت نشد`}</p>
    ) : (
      <EmptyState title="محصولی یافت نشد." />
    );
  }

  return <ProductGrid products={products} />;
}
