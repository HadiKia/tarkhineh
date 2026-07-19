"use client";

import { useMenuContext } from "@/contexts/MenuContext";
import { useSuspenseProducts } from "@/hooks/useProducts";
import ProductGrid from "@/components/features/products/public/ProductGrid";

export default function ProductGridSection() {
  const { resolvedMealCourse, selectedFoodGroup, selectedSearch, selectedSort } =
    useMenuContext();

  const { data: productData } = useSuspenseProducts({
    mealCourse: resolvedMealCourse ?? undefined,
    foodGroup: selectedFoodGroup ?? undefined,
    search: selectedSearch ?? undefined,
    sort: selectedSort ?? undefined,
  });

  const products = productData?.products ?? [];

  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">
          {selectedSearch
            ? `نتیجه‌ای برای «${selectedSearch}» یافت نشد`
            : "محصولی یافت نشد"}
        </p>
      </div>
    );
  }

  return <ProductGrid products={products} />;
}
