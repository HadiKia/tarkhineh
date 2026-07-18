"use client";

import { useEffect } from "react";
import { useMenuContext } from "@/contexts/MenuContext";
import { useSuspenseCategories } from "@/hooks/useCategories";
import { CategoryType, ProductCategoryType } from "@/types";
import CategoryFilterContainer from "@/components/features/products/public/CategoryFilterContainer";

export default function CategoryFilterSection() {
  const {
    selectedMealCourse,
    selectedFoodGroup,
    initializeMealCourse,
    onSelectMealCourse,
    onSelectFoodGroup,
  } = useMenuContext();

  const { data: mealCourseData } = useSuspenseCategories({
    type: CategoryType.PRODUCT,
    productType: ProductCategoryType.MEAL_COURSE,
  });

  const firstMealCourse = mealCourseData?.categories?.[0];

  useEffect(() => {
    if (!firstMealCourse || selectedMealCourse !== null) {
      return;
    }

    initializeMealCourse(firstMealCourse.englishTitle);
  }, [firstMealCourse, selectedMealCourse, initializeMealCourse]);

  return (
    <CategoryFilterContainer
      mealCourses={mealCourseData?.categories ?? []}
      selectedMealCourse={selectedMealCourse}
      selectedFoodGroup={selectedFoodGroup}
      onSelectMealCourse={onSelectMealCourse}
      onSelectFoodGroup={onSelectFoodGroup}
    />
  );
}
