"use client";

import { useMenuContext } from "@/contexts/MenuContext";
import ProductResultsSection from "@/components/sections/products/ProductResultsSection";

export default function ProductGridSection() {
  const {
    resolvedMealCourse,
    selectedFoodGroup,
    selectedSearch,
    selectedSort,
  } = useMenuContext();

  return (
    <ProductResultsSection
      params={{
        mealCourse: resolvedMealCourse ?? undefined,
        foodGroup: selectedFoodGroup ?? undefined,
        search: selectedSearch ?? undefined,
        sort: selectedSort ?? undefined,
      }}
    />
  );
}
