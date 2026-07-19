"use client";

import { useCallback, useMemo } from "react";
import useMenuUrlState from "./useMenuUrlState";

export default function useMenuFilters(defaultMealCourse?: string | null) {
  const {
    selectedMealCourse,
    selectedFoodGroup,
    selectedSearch,
    selectedSort,

    setSelectedMealCourse,
    setSelectedFoodGroup,
    setSelectedSearch,
    setSelectedSort,

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
      setSelectedSort(null);

      updateParams({
        mealCourse: englishTitle,
        foodGroup: null,
        sort: null,
      });
    },
    [setSelectedMealCourse, setSelectedFoodGroup, setSelectedSort, updateParams],
  );

  const onSelectFoodGroup = useCallback(
    (englishTitle: string | null) => {
      setSelectedFoodGroup(englishTitle);
      setSelectedSort(null);

      updateParams({
        foodGroup: englishTitle,
        sort: null,
      });
    },
    [setSelectedFoodGroup, setSelectedSort, updateParams],
  );

  const onSelectSort = useCallback(
    (englishTitle: string | null) => {
      setSelectedSort(englishTitle);
      setSelectedFoodGroup(null);

      updateParams({
        sort: englishTitle,
        foodGroup: null,
      });
    },
    [setSelectedSort, setSelectedFoodGroup, updateParams],
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
      selectedSort,

      onSelectMealCourse,
      onSelectFoodGroup,
      onSelectSort,
      onSearch,
    }),
    [
      selectedMealCourse,
      resolvedMealCourse,
      selectedFoodGroup,
      selectedSearch,
      selectedSort,

      onSelectMealCourse,
      onSelectFoodGroup,
      onSelectSort,
      onSearch,
    ],
  );
}
