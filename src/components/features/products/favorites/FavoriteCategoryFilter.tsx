"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import type { CategoryListItem } from "@/types";
import { CheckIcon } from "lucide-react";
import { ArrowLeft2 } from "iconsax-reactjs";
import { useHorizontalDrag } from "@/hooks/useHorizontalDrag";

type FavoriteCategoryFilterProps = {
  mealCourses: CategoryListItem[];
  selectedMealCourse: string | null;
  onSelectMealCourse: (englishTitle: string | null) => void;
};

export default function FavoriteCategoryFilter({
  mealCourses,
  selectedMealCourse,
  onSelectMealCourse,
}: FavoriteCategoryFilterProps) {
  const mealCoursesDrag = useHorizontalDrag();

  const [showEndFade, setShowEndFade] = useState(false);

  useEffect(() => {
    const el = mealCoursesDrag.ref.current;

    if (!el) return;

    const updateFade = () => {
      setShowEndFade(el.scrollWidth > el.clientWidth);
    };

    updateFade();

    const resizeObserver = new ResizeObserver(updateFade);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [mealCourses]);

  return (
    <div className="flex">
      <div
        ref={mealCoursesDrag.ref}
        {...mealCoursesDrag.handlers}
        className={cn(
          "min-w-0 lg:max-w-xs xl:max-w-105",
          "flex items-center gap-x-2",
          "overflow-x-auto scrollbar-none",
          "active:cursor-grabbing",
          "touch-pan-x select-none",
        )}
      >
        <button
          type="button"
          onClick={(e) => {
            if (mealCoursesDrag.isDragging.current.isDragging) {
              e.preventDefault();
              return;
            }

            onSelectMealCourse(null);
          }}
          className={cn(
            "flex shrink-0 items-center gap-x-1",
            "select-none rounded-lg px-2 py-1",
            "text-xs transition-colors duration-300 ease-linear lg:rounded-full lg:text-base",
            selectedMealCourse === null
              ? "pointer-events-none bg-tint-1 text-primary"
              : "cursor-pointer bg-gray-2 text-gray-8",
          )}
        >
          همه
          {selectedMealCourse === null ? (
            <CheckIcon className="size-3 lg:size-4" />
          ) : (
            <ArrowLeft2 className="size-3 lg:size-4" />
          )}
        </button>

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
              "flex shrink-0 items-center gap-x-1",
              "select-none rounded-lg px-2 py-1",
              "text-xs transition-colors duration-300 ease-linear lg:rounded-full lg:text-base",
              selectedMealCourse === category.englishTitle
                ? "pointer-events-none bg-tint-1 text-primary"
                : "cursor-pointer bg-gray-2 text-gray-8",
            )}
          >
            {category.title}

            {selectedMealCourse === category.englishTitle ? (
              <CheckIcon className="size-3 lg:size-4" />
            ) : (
              <ArrowLeft2 className="size-3 lg:size-4" />
            )}
          </button>
        ))}
      </div>

      {showEndFade && (
        <div className="pointer-events-none sticky inset-y-0 inset-e-0 hidden h-8 w-5 translate-x-4 lg:translate-x-4 bg-linear-to-r from-white to-transparent md:block" />
      )}
    </div>
  );
}
