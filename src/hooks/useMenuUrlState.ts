"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function useMenuUrlState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedMealCourse, setSelectedMealCourse] = useState<string | null>(
    () => searchParams.get("mealCourse"),
  );

  const [selectedFoodGroup, setSelectedFoodGroup] = useState<string | null>(
    () => searchParams.get("foodGroup"),
  );

  useEffect(() => {
    setSelectedMealCourse(searchParams.get("mealCourse"));
    setSelectedFoodGroup(searchParams.get("foodGroup"));
  }, [searchParams]);

  const updateParams = useCallback(
    (mealCourse: string | null, foodGroup: string | null) => {
      const params = new URLSearchParams();

      if (mealCourse) {
        params.set("mealCourse", mealCourse);
      }

      if (foodGroup) {
        params.set("foodGroup", foodGroup);
      }

      router.replace(params.size ? `/menu?${params.toString()}` : "/menu");
    },
    [router],
  );

  return {
    selectedMealCourse,
    selectedFoodGroup,
    setSelectedMealCourse,
    setSelectedFoodGroup,
    updateParams,
  };
}
