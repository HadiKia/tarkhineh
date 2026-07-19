"use client";

import { useHorizontalDrag } from "@/hooks/useHorizontalDrag";
import { cn } from "@/lib/utils";
import { type CategoryListItem } from "@/types";
import { ArrowLeft2 } from "iconsax-reactjs";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface CategoryFilterProps {
  mealCourses: CategoryListItem[];
  foodGroups: CategoryListItem[];
  staticFilters: CategoryListItem[];
  hasSelectedMealCourse: boolean;
  selectedMealCourse: string | null;
  selectedFoodGroup: string | null;
  selectedSort: string | null;
  onSelectMealCourse: (englishTitle: string) => void;
  onSelectFoodGroup: (englishTitle: string) => void;
  onSelectStaticFilter: (englishTitle: string) => void;
}

export default function CategoryFilter({
  mealCourses,
  foodGroups,
  staticFilters,
  hasSelectedMealCourse,
  selectedMealCourse,
  selectedFoodGroup,
  selectedSort,
  onSelectMealCourse,
  onSelectFoodGroup,
  onSelectStaticFilter,
}: CategoryFilterProps) {
  const mealCoursesDrag = useHorizontalDrag();
  const foodGroupsDrag = useHorizontalDrag();

  const [showEndFade, setShowEndFade] = useState(false);

  useEffect(() => {
    const el = foodGroupsDrag.ref.current;

    if (!el) return;

    const updateFade = () => {
      setShowEndFade(el.scrollWidth > el.clientWidth);
    };

    updateFade();

    const resizeObserver = new ResizeObserver(updateFade);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [foodGroups, staticFilters, foodGroupsDrag]);

  return (
    <div className="flex flex-col gap-y-2 lg:gap-y-4">
      <div className="bg-gray-2">
        <div
          ref={mealCoursesDrag.ref}
          {...mealCoursesDrag.handlers}
          className={cn(
            "mx-auto max-w-306",
            "flex items-center gap-x-4",
            "overflow-x-auto scrollbar-none",
            "px-4 lg:gap-x-8 xl:px-0",
            "active:cursor-grabbing",
            "touch-pan-x select-none",
          )}
        >
          {mealCourses.map((category) => (
            <button
              key={category.englishTitle}
              type="button"
              onClick={(e) => {
                if (mealCoursesDrag.isDragging.current.isDragging) {
                  e.preventDefault();
                  return;
                }

                onSelectMealCourse(category.englishTitle);
              }}
              className={cn(
                "shrink-0 select-none border-b transition-colors duration-300 ease-linear lg:border-b-2",
                selectedMealCourse === category.englishTitle
                  ? "pointer-events-none border-b-primary py-2.5 text-sm font-medium text-primary lg:pb-4 lg:pt-4.5 lg:text-xl lg:font-bold"
                  : "cursor-pointer border-b-transparent py-3 text-xs text-gray-7 lg:pb-4 lg:pt-4.5 lg:text-xl",
              )}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      <div className="h-6 lg:h-8">
        {hasSelectedMealCourse && (
          <div>
            <div className="mx-auto max-w-306 flex">
              <div
                ref={foodGroupsDrag.ref}
                {...foodGroupsDrag.handlers}
                className={cn(
                  "min-w-0 lg:max-w-lg xl:max-w-2xl",
                  "flex items-center gap-x-2",
                  "overflow-x-auto scrollbar-none",
                  "px-4 xl:px-0",
                  "active:cursor-grabbing",
                  "touch-pan-x select-none",
                )}
              >
                {foodGroups.map((category) => (
                  <button
                    key={category.englishTitle}
                    type="button"
                    onClick={(e) => {
                      if (foodGroupsDrag.isDragging.current.isDragging) {
                        e.preventDefault();
                        return;
                      }

                      onSelectFoodGroup(category.englishTitle);
                    }}
                    className={cn(
                      "flex shrink-0 items-center gap-x-1",
                      "select-none rounded-lg px-2 py-1",
                      "text-xs transition-colors duration-300 ease-linear lg:rounded-full lg:text-base",
                      selectedFoodGroup === category.englishTitle
                        ? "pointer-events-none bg-tint-1 text-primary"
                        : "cursor-pointer bg-gray-2 text-gray-8",
                    )}
                  >
                    {category.title}

                    {selectedFoodGroup === category.englishTitle ? (
                      <CheckIcon className="size-3 lg:size-4" />
                    ) : (
                      <ArrowLeft2 className="size-3 lg:size-4" />
                    )}
                  </button>
                ))}

                {staticFilters.map((filter) => (
                  <button
                    key={filter.englishTitle}
                    type="button"
                    onClick={(e) => {
                      if (foodGroupsDrag.isDragging.current.isDragging) {
                        e.preventDefault();
                        return;
                      }

                      onSelectStaticFilter(filter.englishTitle);
                    }}
                    className={cn(
                      "flex shrink-0 items-center gap-x-1",
                      "select-none rounded-lg px-2 py-1",
                      "text-xs transition-colors duration-300 ease-linear lg:rounded-full lg:text-base",
                      selectedSort === filter.englishTitle
                        ? "pointer-events-none bg-tint-1 text-primary"
                        : "cursor-pointer bg-gray-2 text-gray-8",
                    )}
                  >
                    {filter.title}

                    {selectedSort === filter.englishTitle ? (
                      <CheckIcon className="size-3 lg:size-4" />
                    ) : (
                      <ArrowLeft2 className="size-3 lg:size-4" />
                    )}
                  </button>
                ))}
              </div>

              {showEndFade && (
                <div className="pointer-events-none sticky inset-y-0 inset-e-0 hidden h-8 w-5 translate-x-5 bg-linear-to-r from-white to-transparent lg:block" />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
