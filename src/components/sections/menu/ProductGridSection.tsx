"use client";

import { useMenuContext } from "@/contexts/MenuContext";
import { useSuspenseProducts } from "@/hooks/useProducts";
import ProductGrid from "@/components/features/products/public/ProductGrid";

export default function ProductGridSection() {
  const { selectedMealCourse, selectedFoodGroup } = useMenuContext();

  const { data: productData } = useSuspenseProducts({
    mealCourse: selectedMealCourse ?? undefined,
    foodGroup: selectedFoodGroup ?? undefined,
  });

  return <ProductGrid products={productData?.products ?? []} />;
}
