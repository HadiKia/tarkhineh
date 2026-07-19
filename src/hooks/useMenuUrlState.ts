"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type MenuFilters = {
  mealCourse?: string | null;
  foodGroup?: string | null;
  search?: string | null;
};

export default function useMenuUrlState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedMealCourse, setSelectedMealCourse] = useState<string | null>(
    () => searchParams.get("mealCourse"),
  );

  const [selectedFoodGroup, setSelectedFoodGroup] = useState<string | null>(
    () => searchParams.get("foodGroup"),
  );

  const [selectedSearch, setSelectedSearch] = useState<string | null>(() =>
    searchParams.get("search"),
  );

  useEffect(() => {
    setSelectedMealCourse(searchParams.get("mealCourse"));
    setSelectedFoodGroup(searchParams.get("foodGroup"));
    setSelectedSearch(searchParams.get("search"));
  }, [searchParams]);

  const updateParams = useCallback(
    (updates: MenuFilters) => {
      const params = new URLSearchParams(searchParams.toString());

      if ("mealCourse" in updates) {
        if (updates.mealCourse) {
          params.set("mealCourse", updates.mealCourse);
        } else {
          params.delete("mealCourse");
        }
      }

      if ("foodGroup" in updates) {
        if (updates.foodGroup) {
          params.set("foodGroup", updates.foodGroup);
        } else {
          params.delete("foodGroup");
        }
      }

      if ("search" in updates) {
        if (updates.search) {
          params.set("search", updates.search);
        } else {
          params.delete("search");
        }
      }

      router.replace(params.size ? `/menu?${params.toString()}` : "/menu", {
        scroll: false,
      });
    },
    [router, searchParams],
  );

  return {
    selectedMealCourse,
    selectedFoodGroup,
    selectedSearch,

    setSelectedMealCourse,
    setSelectedFoodGroup,
    setSelectedSearch,

    updateParams,
  };
}
