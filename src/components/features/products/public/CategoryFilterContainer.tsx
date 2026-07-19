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
  selectedMealCourse: string | null;
  selectedFoodGroup: string | null;
  selectedSort: string | null;
  onSelectMealCourse: (englishTitle: string | null) => void;
  onSelectFoodGroup: (englishTitle: string | null) => void;
  onSelectSort: (englishTitle: string | null) => void;
}

function isPersistedCategory(category: CategoryListItem): category is Category {
  return "_id" in category;
}

export default function CategoryFilterContainer({
  mealCourses,
  selectedMealCourse,
  selectedFoodGroup,
  selectedSort,
  onSelectMealCourse,
  onSelectFoodGroup,
  onSelectSort,
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

  const { data: foodGroupData } = useGetCategories(
    selectedMealCourseId
      ? {
          type: CategoryType.PRODUCT,
          productType: ProductCategoryType.FOOD_GROUP,
          parent: selectedMealCourseId,
        }
      : undefined,
  );

  const { realFoodGroups, staticFilters } = useMemo(() => {
    const categories = foodGroupData?.categories ?? [];
    return {
      realFoodGroups: categories.filter(isPersistedCategory),
      staticFilters: categories.filter((c) => !isPersistedCategory(c)),
    };
  }, [foodGroupData]);

  const handleMealCourseSelect = (englishTitle: string) => {
    if (selectedMealCourse === englishTitle) {
      onSelectMealCourse(null);
      return;
    }

    onSelectMealCourse(englishTitle);
  };

  const handleFoodGroupSelect = (englishTitle: string) => {
    if (selectedFoodGroup === englishTitle) {
      onSelectFoodGroup(null);
      return;
    }

    onSelectFoodGroup(englishTitle);
  };

  const handleStaticFilterSelect = (englishTitle: string) => {
    if (selectedSort === englishTitle) {
      onSelectSort(null);
      return;
    }

    onSelectSort(englishTitle);
  };

  return (
    <CategoryFilter
      mealCourses={mealCourses}
      foodGroups={realFoodGroups}
      staticFilters={staticFilters}
      hasSelectedMealCourse={!!selectedMealCourseId}
      selectedMealCourse={selectedMealCourse}
      selectedFoodGroup={selectedFoodGroup}
      selectedSort={selectedSort}
      onSelectMealCourse={handleMealCourseSelect}
      onSelectFoodGroup={handleFoodGroupSelect}
      onSelectStaticFilter={handleStaticFilterSelect}
    />
  );
}
