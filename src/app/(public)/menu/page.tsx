import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import MenuProvider from "@/contexts/MenuContext";
import { HERO_SLIDES } from "@/constants/menuHero";
import { productQueryKeys } from "@/hooks/useProducts";
import { categoryQueryKeys } from "@/hooks/useCategories";
import { getProducts } from "@/services/productService";
import { getCategories } from "@/services/categoryService";
import { CategoryType, ProductCategoryType } from "@/types";

import HeroCarousel from "@/components/sections/hero/HeroCarousel";
import CategoryFilterSection from "@/components/sections/menu/CategoryFilterSection";
import ProductGridSection from "@/components/sections/menu/ProductGridSection";
import CategoryFilterSkeleton from "@/components/sections/menu/CategoryFilterSkeleton";
import ProductGridSkeleton from "@/components/sections/menu/ProductGridSkeleton";

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ mealCourse?: string; foodGroup?: string }>;
}) {
  const params = await searchParams;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: categoryQueryKeys.list({
        type: CategoryType.PRODUCT,
        productType: ProductCategoryType.MEAL_COURSE,
      }),
      queryFn: () =>
        getCategories({
          type: CategoryType.PRODUCT,
          productType: ProductCategoryType.MEAL_COURSE,
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: productQueryKeys.list({
        mealCourse: params.mealCourse,
        foodGroup: params.foodGroup,
      }),
      queryFn: () =>
        getProducts({
          mealCourse: params.mealCourse,
          foodGroup: params.foodGroup,
        }),
    }),
  ]);

  return (
    <>
      <HeroCarousel slides={HERO_SLIDES} />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <MenuProvider>
          <Suspense fallback={<CategoryFilterSkeleton />}>
            <CategoryFilterSection />
          </Suspense>

          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGridSection />
          </Suspense>
        </MenuProvider>
      </HydrationBoundary>
    </>
  );
}
