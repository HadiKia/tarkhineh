"use client";

import type { CategoryListItem } from "@/types";
import useFavoriteUrlState from "@/hooks/useFavoriteUrlState";

import FavoriteCategoryFilter from "./FavoriteCategoryFilter";

type FavoriteCategoryFilterSectionProps = {
  mealCourses: CategoryListItem[];
};

export default function FavoriteCategoryFilterSection({
  mealCourses,
}: FavoriteCategoryFilterSectionProps) {
  const { selectedMealCourse, onSelectMealCourse } = useFavoriteUrlState();

  return (
    <FavoriteCategoryFilter
      mealCourses={mealCourses}
      selectedMealCourse={selectedMealCourse}
      onSelectMealCourse={onSelectMealCourse}
    />
  );
}
