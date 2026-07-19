"use client";

import { useCallback, useMemo } from "react";
import useMenuUrlState from "./useMenuUrlState";

export default function useMenuFilters() {
  const {
    selectedMealCourse,
    selectedFoodGroup,
    selectedSearch,

    setSelectedMealCourse,
    setSelectedFoodGroup,
    setSelectedSearch,

    updateParams,
  } = useMenuUrlState();

  const initializeMealCourse = useCallback(
    (englishTitle: string) => {
      setSelectedMealCourse((current) => current ?? englishTitle);
    },
    [setSelectedMealCourse],
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
      selectedFoodGroup,
      selectedSearch,

      initializeMealCourse,

      onSelectMealCourse,
      onSelectFoodGroup,
      onSearch,
    }),
    [
      selectedMealCourse,
      selectedFoodGroup,
      selectedSearch,

      initializeMealCourse,

      onSelectMealCourse,
      onSelectFoodGroup,
      onSearch,
    ],
  );
}
