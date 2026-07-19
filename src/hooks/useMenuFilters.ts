"use client";

import { useCallback, useMemo } from "react";
import useMenuUrlState from "./useMenuUrlState";

export default function useMenuFilters(defaultMealCourse?: string | null) {
  const {
    selectedMealCourse,
    selectedFoodGroup,
    selectedSearch,

    setSelectedMealCourse,
    setSelectedFoodGroup,
    setSelectedSearch,

    updateParams,
  } = useMenuUrlState();

  const resolvedMealCourse = useMemo(
    () => selectedMealCourse ?? defaultMealCourse ?? null,
    [selectedMealCourse, defaultMealCourse],
  );

  const onSelectMealCourse = useCallback(
    (englishTitle: string | null) => {
      setSelectedMealCourse(englishTitle);
      setSelectedFoodGroup(null);

      updateParams({
        mealCourse: englishTitle,
        foodGroup: null,
      });
    },
    [setSelectedMealCourse, setSelectedFoodGroup, updateParams],
  );

  const onSelectFoodGroup = useCallback(
    (englishTitle: string | null) => {
      setSelectedFoodGroup(englishTitle);

      updateParams({
        foodGroup: englishTitle,
      });
    },
    [setSelectedFoodGroup, updateParams],
  );

  const onSearch = useCallback(
    (value: string | null) => {
      setSelectedSearch(value);

      updateParams({
        search: value,
      });
    },
    [setSelectedSearch, updateParams],
  );

  return useMemo(
    () => ({
      selectedMealCourse,
      resolvedMealCourse,
      selectedFoodGroup,
      selectedSearch,

      onSelectMealCourse,
      onSelectFoodGroup,
      onSearch,
    }),
    [
      selectedMealCourse,
      resolvedMealCourse,
      selectedFoodGroup,
      selectedSearch,

      onSelectMealCourse,
      onSelectFoodGroup,
      onSearch,
    ],
  );
}
