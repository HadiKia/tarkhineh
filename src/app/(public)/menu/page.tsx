import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

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
import TextFieldSkeleton from "@/components/common/TextFieldSkeleton";
import SearchSection from "@/components/sections/menu/SearchSection";

type MenuSearchParams = {
  mealCourse?: string;
  foodGroup?: string;
  search?: string;
};

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<MenuSearchParams>;
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
        search: params.search,
        mealCourse: params.mealCourse,
        foodGroup: params.foodGroup,
      }),
      queryFn: () =>
        getProducts({
          search: params.search,
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
          <div className="mb-3.5 flex flex-col gap-y-3 lg:mb-12 lg:gap-y-0">
            <Suspense fallback={<CategoryFilterSkeleton />}>
              <CategoryFilterSection />
            </Suspense>

            <div className="mx-auto w-full max-w-306 relative ">
              <div className="w-full lg:max-w-md xl:max-w-125 px-4 lg:px-0 lg:absolute lg:-bottom-1 lg:inset-e-4 xl:inset-e-0">
                <Suspense fallback={<TextFieldSkeleton />}>
                  <SearchSection />
                </Suspense>
              </div>
            </div>
          </div>

          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGridSection />
          </Suspense>
        </MenuProvider>
      </HydrationBoundary>
    </>
  );
}
