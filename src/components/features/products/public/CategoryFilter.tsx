"use client";

import { type CategoryListItem } from "@/types";
import { ArrowLeft2 } from "iconsax-reactjs";
import { CheckIcon } from "lucide-react";

interface CategoryFilterProps {
  mealCourses: CategoryListItem[];
  foodGroups: CategoryListItem[];
  hasSelectedMealCourse: boolean;
  selectedMealCourse: string | null;
  selectedFoodGroup: string | null;
  onSelectMealCourse: (englishTitle: string) => void;
  onSelectFoodGroup: (englishTitle: string) => void;
}

export default function CategoryFilter({
  mealCourses,
  foodGroups,
  hasSelectedMealCourse,
  selectedMealCourse,
  selectedFoodGroup,
  onSelectMealCourse,
  onSelectFoodGroup,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-col gap-y-2 lg:gap-y-4 mb-3 lg:mb-12">
      <div className="bg-gray-2">
        <div className="mx-auto max-w-306 flex items-center gap-x-4 overflow-x-auto px-4 xl:px-0 lg:gap-x-8">
          {mealCourses.map((category) => (
            <button
              key={category.englishTitle}
              type="button"
              onClick={() => onSelectMealCourse(category.englishTitle)}
              className={`shrink-0 border-b lg:border-b-2 transition-colors duration-300 ease-linear select-none ${
                selectedMealCourse === category.englishTitle
                  ? "text-sm lg:text-xl font-medium lg:font-bold text-primary border-b-primary py-2.5 lg:pb-4 lg:pt-4.5 pointer-events-none"
                  : "text-xs lg:text-xl text-gray-7 border-b-transparent py-3 lg:pb-4 lg:pt-4.5 cursor-pointer"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      <div>
        {hasSelectedMealCourse && (
          <div className="mx-auto max-w-306 flex items-center gap-x-2 overflow-x-auto scrollbar-none px-4 xl:px-0 ">
            {foodGroups.map((category) => (
              <button
                key={category.englishTitle}
                type="button"
                onClick={() => onSelectFoodGroup(category.englishTitle)}
                className={`shrink-0 flex items-center gap-x-1 text-xs lg:text-base py-1 px-2 rounded-lg lg:rounded-full transition-colors duration-300 ease-linear select-none ${
                  selectedFoodGroup === category.englishTitle
                    ? "bg-tint-1 text-primary pointer-events-none "
                    : "bg-gray-2 text-gray-8 cursor-pointer"
                }`}
              >
                {category.title}

                {selectedFoodGroup === category.englishTitle ? (
                  <CheckIcon className="size-3 lg:size-4" />
                ) : (
                  <ArrowLeft2 className="size-3 lg:size-4" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
