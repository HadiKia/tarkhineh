"use client";

import { useMenuContext } from "@/contexts/MenuContext";
import { useSuspenseCategories } from "@/hooks/useCategories";
import { CategoryType, ProductCategoryType } from "@/types";
import CategoryFilterContainer from "@/components/features/products/public/CategoryFilterContainer";

export default function CategoryFilterSection() {
  const {
    resolvedMealCourse,
    selectedFoodGroup,
    onSelectMealCourse,
    onSelectFoodGroup,
  } = useMenuContext();

  const { data: mealCourseData } = useSuspenseCategories({
    type: CategoryType.PRODUCT,
    productType: ProductCategoryType.MEAL_COURSE,
  });

  return (
    <CategoryFilterContainer
      mealCourses={mealCourseData?.categories ?? []}
      selectedMealCourse={resolvedMealCourse}
      selectedFoodGroup={selectedFoodGroup}
      onSelectMealCourse={onSelectMealCourse}
      onSelectFoodGroup={onSelectFoodGroup}
    />
  );
}
