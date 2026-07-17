"use client";

import { useMemo } from "react";
import { useGetCategories } from "@/hooks/useCategories";
import CategoryFilter from "./CategoryFilter";
import {
  CategoryType,
  ProductCategoryType,
  type Category,
  type CategoryListItem,
} from "@/types";

interface CategoryFilterContainerProps {
  mealCourses: CategoryListItem[];
  isLoadingMealCourses: boolean;
  selectedMealCourse: string | null;
  selectedFoodGroup: string | null;
  onSelectMealCourse: (englishTitle: string | null) => void;
  onSelectFoodGroup: (englishTitle: string | null) => void;
}

function isPersistedCategory(category: CategoryListItem): category is Category {
  return "_id" in category;
}

export default function CategoryFilterContainer({
  mealCourses,
  isLoadingMealCourses,
  selectedMealCourse,
  selectedFoodGroup,
  onSelectMealCourse,
  onSelectFoodGroup,
}: CategoryFilterContainerProps) {
  const selectedMealCourseId = useMemo(() => {
    if (!selectedMealCourse) return null;

    const found = mealCourses.find(
      (category) =>
        isPersistedCategory(category) &&
        category.englishTitle === selectedMealCourse,
    );

    if (!found || !isPersistedCategory(found)) {
      return null;
    }

    return found._id;
  }, [mealCourses, selectedMealCourse]);

  const { data: foodGroupData, isLoading: isLoadingFoodGroups } =
    useGetCategories(
      selectedMealCourseId
        ? {
            type: CategoryType.PRODUCT,
            productType: ProductCategoryType.FOOD_GROUP,
            parent: selectedMealCourseId,
          }
        : undefined,
    );

  const handleMealCourseSelect = (englishTitle: string) => {
    if (selectedMealCourse === englishTitle) {
      onSelectMealCourse(null);
      onSelectFoodGroup(null);
      return;
    }

    onSelectMealCourse(englishTitle);
    onSelectFoodGroup(null);
  };

  const handleFoodGroupSelect = (englishTitle: string) => {
    if (selectedFoodGroup === englishTitle) {
      onSelectFoodGroup(null);
      return;
    }

    onSelectFoodGroup(englishTitle);
  };

  return (
    <CategoryFilter
      mealCourses={mealCourses}
      foodGroups={foodGroupData?.categories ?? []}
      isLoadingMealCourses={isLoadingMealCourses}
      isLoadingFoodGroups={isLoadingFoodGroups}
      hasSelectedMealCourse={!!selectedMealCourseId}
      selectedMealCourse={selectedMealCourse}
      selectedFoodGroup={selectedFoodGroup}
      onSelectMealCourse={handleMealCourseSelect}
      onSelectFoodGroup={handleFoodGroupSelect}
    />
  );
}
