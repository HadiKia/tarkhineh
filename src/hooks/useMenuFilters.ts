"use client";

import { useCallback, useMemo } from "react";
import useMenuUrlState from "./useMenuUrlState";

export default function useMenuFilters() {
  const {
    selectedMealCourse,
    selectedFoodGroup,
    setSelectedMealCourse,
    setSelectedFoodGroup,
    updateParams,
  } = useMenuUrlState();

  const initializeMealCourse = useCallback((englishTitle: string) => {
    setSelectedMealCourse((current) => current ?? englishTitle);
  }, []);

  const onSelectMealCourse = useCallback(
    (englishTitle: string | null) => {
      setSelectedMealCourse(englishTitle);
      setSelectedFoodGroup(null);

      updateParams(englishTitle, null);
    },
    [setSelectedMealCourse, setSelectedFoodGroup, updateParams],
  );

  const onSelectFoodGroup = useCallback(
    (englishTitle: string | null) => {
      setSelectedFoodGroup(englishTitle);

      updateParams(selectedMealCourse, englishTitle);
    },
    [selectedMealCourse, setSelectedFoodGroup, updateParams],
  );

  return useMemo(
    () => ({
      selectedMealCourse,
      selectedFoodGroup,
      initializeMealCourse,
      onSelectMealCourse,
      onSelectFoodGroup,
    }),
    [
      selectedMealCourse,
      selectedFoodGroup,
      initializeMealCourse,
      onSelectMealCourse,
      onSelectFoodGroup,
    ],
  );
}
