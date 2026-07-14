"use client";

import { useMemo } from "react";
import { useGetCategories } from "@/hooks/useCategories";
import {
  CategoryType,
  ProductCategoryType,
  type Category,
  type CategoryListItem,
  type StaticProductCategory,
} from "@/types";

interface CategoryFilterProps {
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

export default function CategoryFilter({
  mealCourses,
  isLoadingMealCourses,
  selectedMealCourse,
  selectedFoodGroup,
  onSelectMealCourse,
  onSelectFoodGroup,
}: CategoryFilterProps) {
  const selectedMealCourseId = useMemo(() => {
    if (!selectedMealCourse || !mealCourses.length) return null;
    const found = mealCourses.find(
      (c) => isPersistedCategory(c) && c.englishTitle === selectedMealCourse,
    );
    return found && isPersistedCategory(found) ? found._id : null;
  }, [selectedMealCourse, mealCourses]);

  const { data: foodGroupData, isLoading: loadingFoodGroups } =
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
    } else {
      onSelectMealCourse(englishTitle);
      onSelectFoodGroup(null);
    }
  };

  const handleFoodGroupSelect = (englishTitle: string) => {
    if (selectedFoodGroup === englishTitle) {
      onSelectFoodGroup(null);
    } else {
      onSelectFoodGroup(englishTitle);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-7">وعده غذایی</h3>
        <div className="flex flex-wrap gap-2">
          {isLoadingMealCourses ? (
            <div className="text-xs text-gray-5">در حال بارگذاری...</div>
          ) : (
            mealCourses.map((category) => (
              <button
                key={
                  isPersistedCategory(category)
                    ? category._id
                    : category.englishTitle
                }
                type="button"
                onClick={() =>
                  isPersistedCategory(category) &&
                  handleMealCourseSelect(category.englishTitle)
                }
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedMealCourse === category.englishTitle
                    ? "bg-primary text-white"
                    : "bg-gray-1 text-gray-7 hover:bg-gray-2"
                }`}
              >
                {category.title}
              </button>
            ))
          )}
        </div>
      </div>

      {selectedMealCourseId && (
        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-7">گروه غذایی</h3>
          <div className="flex flex-wrap gap-2">
            {loadingFoodGroups ? (
              <div className="text-xs text-gray-5">در حال بارگذاری...</div>
            ) : (
              (foodGroupData?.categories ?? []).map((category) => {
                const isStatic =
                  !isPersistedCategory(category) ||
                  (category as StaticProductCategory).productType ===
                    "static_filter";

                return (
                  <button
                    key={category.englishTitle}
                    type="button"
                    onClick={() => handleFoodGroupSelect(category.englishTitle)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      selectedFoodGroup === category.englishTitle
                        ? "bg-primary text-white"
                        : "bg-gray-1 text-gray-7 hover:bg-gray-2"
                    }`}
                  >
                    {category.title}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
