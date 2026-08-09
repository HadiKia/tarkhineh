"use client";

import { useMemo } from "react";

import EmptyState from "@/components/common/EmptyState";
import EmptySearch from "@/components/common/SearchNotFound";
import type { CategoryListItem, Product } from "@/types";
import useFavoriteUrlState from "@/hooks/useFavoriteUrlState";

import FavoriteCategoryFilterSection from "./FavoriteCategoryFilterSection";
import FavoriteProductGrid from "./FavoriteProductGrid";
import FavoriteSearchSection from "./FavoriteSearchSection";

type FavoriteProductsSectionProps = {
  products: Product[];
  mealCourses: CategoryListItem[];
};

export default function FavoriteProductsSection({
  products,
  mealCourses,
}: FavoriteProductsSectionProps) {
  const { selectedMealCourse, selectedSearch } = useFavoriteUrlState();

  const selectedMealCourseId = useMemo(() => {
    const category = mealCourses.find(
      (item) => item.englishTitle === selectedMealCourse,
    );

    return category && "_id" in category ? category._id : null;
  }, [mealCourses, selectedMealCourse]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = selectedSearch.trim().toLowerCase();

    return products.filter((product) => {
      const matchesMealCourse =
        !selectedMealCourse ||
        product.category.englishTitle === selectedMealCourse ||
        product.category.parentId === selectedMealCourseId;

      const matchesSearch =
        !normalizedSearch ||
        product.title.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);

      return matchesMealCourse && matchesSearch;
    });
  }, [products, selectedMealCourse, selectedMealCourseId, selectedSearch]);

  const hasSearch = selectedSearch.trim().length > 0;

  return (
    <div className="flex flex-col gap-6 lg:gap-10">
      <div className="flex flex-col justify-between md:flex-row gap-5 lg:gap-10 md:items-center ">
        <FavoriteCategoryFilterSection mealCourses={mealCourses} />

        <div className="w-full md:max-w-sm xl:min-w-87.5">
          <FavoriteSearchSection />
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <FavoriteProductGrid products={filteredProducts} />
      ) : hasSearch ? (
        <EmptySearch title={`نتیجه‌ای برای «${selectedSearch}» یافت نشد.`} />
      ) : (
        <EmptyState title="محصولی یافت نشد." />
      )}
    </div>
  );
}
