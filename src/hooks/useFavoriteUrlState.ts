"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type FavoriteFilters = {
  mealCourse?: string | null;
  search?: string | null;
};

const FAVORITES_PATH = "/profile/favorites";

export default function useFavoriteUrlState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedMealCourse = searchParams.get("mealCourse");
  const selectedSearch = searchParams.get("search") ?? "";

  const updateParams = useCallback(
    (updates: FavoriteFilters) => {
      const params = new URLSearchParams(searchParams.toString());

      if ("mealCourse" in updates) {
        if (updates.mealCourse) {
          params.set("mealCourse", updates.mealCourse);
        } else {
          params.delete("mealCourse");
        }
      }

      if ("search" in updates) {
        const search = updates.search?.trim();

        if (search) {
          params.set("search", search);
        } else {
          params.delete("search");
        }
      }

      router.replace(
        params.size ? `${FAVORITES_PATH}?${params.toString()}` : FAVORITES_PATH,
        { scroll: false },
      );
    },
    [router, searchParams],
  );

  return useMemo(
    () => ({
      selectedMealCourse,
      selectedSearch,
      onSelectMealCourse: (englishTitle: string | null) =>
        updateParams({ mealCourse: englishTitle }),
      onSearch: (value: string | null) => updateParams({ search: value }),
    }),
    [selectedMealCourse, selectedSearch, updateParams],
  );
}
