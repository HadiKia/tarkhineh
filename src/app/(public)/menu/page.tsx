"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetCategories } from "@/hooks/useCategories";
import { CategoryType, ProductCategoryType } from "@/types";
import { useGetProducts } from "@/hooks/useProducts";
import ProductGrid from "@/components/features/products/public/ProductGrid";
import HeroCarousel from "@/components/sections/hero/HeroCarousel";
import { HERO_SLIDES } from "@/constants/menuHero";
import CategoryFilterContainer from "@/components/features/products/public/CategoryFilterContainer";

export default function MenuPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedMealCourse, setSelectedMealCourse] = useState<string | null>(
    () => searchParams.get("mealCourse"),
  );

  const [selectedFoodGroup, setSelectedFoodGroup] = useState<string | null>(
    () => searchParams.get("foodGroup"),
  );

  const { data: mealCourseData, isLoading: loadingMealCourses } =
    useGetCategories({
      type: CategoryType.PRODUCT,
      productType: ProductCategoryType.MEAL_COURSE,
    });

  useEffect(() => {
    if (mealCourseData?.categories?.length && selectedMealCourse === null) {
      setSelectedMealCourse(mealCourseData.categories[0].englishTitle);
    }
  }, [mealCourseData, selectedMealCourse]);

  const updateParams = (meal: string | null, food: string | null) => {
    const params = new URLSearchParams();
    if (meal) params.set("mealCourse", meal);
    if (food) params.set("foodGroup", food);
    router.replace(`/menu?${params.toString()}`);
  };

  const handleSelectMealCourse = (englishTitle: string | null) => {
    setSelectedMealCourse(englishTitle);
    setSelectedFoodGroup(null);
    updateParams(englishTitle, null);
  };

  const handleSelectFoodGroup = (englishTitle: string | null) => {
    setSelectedFoodGroup(englishTitle);
    updateParams(selectedMealCourse, englishTitle);
  };

  const { data: productData, isLoading: loadingProducts } = useGetProducts({
    mealCourse: selectedMealCourse ?? undefined,
    foodGroup: selectedFoodGroup ?? undefined,
  });

  return (
    <>
      <HeroCarousel slides={HERO_SLIDES} />
      <CategoryFilterContainer
        mealCourses={mealCourseData?.categories ?? []}
        isLoadingMealCourses={loadingMealCourses}
        selectedMealCourse={selectedMealCourse}
        selectedFoodGroup={selectedFoodGroup}
        onSelectMealCourse={handleSelectMealCourse}
        onSelectFoodGroup={handleSelectFoodGroup}
      />

      {loadingProducts ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-gray-5">در حال بارگذاری محصولات...</p>
        </div>
      ) : (
        <ProductGrid products={productData?.products ?? []} />
      )}
    </>
  );
}
