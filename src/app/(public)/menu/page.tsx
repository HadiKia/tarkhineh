import { Suspense } from "react";
import { cookies } from "next/headers";
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
import {
  CategoryType,
  ProductCategoryType,
  type CategoryListResult,
} from "@/types";

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
  sort?: string;
};

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<MenuSearchParams>;
}) {
  const params = await searchParams;

  const queryClient = new QueryClient();

  // Forward browser cookies to preserve authenticated SSR state.
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  // Prefetch categories first to resolve the default meal course.
  await queryClient.prefetchQuery({
    queryKey: categoryQueryKeys.list({
      type: CategoryType.PRODUCT,
      productType: ProductCategoryType.MEAL_COURSE,
    }),
    queryFn: () =>
      getCategories({
        type: CategoryType.PRODUCT,
        productType: ProductCategoryType.MEAL_COURSE,
      }),
  });

  const categoriesData = queryClient.getQueryData<CategoryListResult>(
    categoryQueryKeys.list({
      type: CategoryType.PRODUCT,
      productType: ProductCategoryType.MEAL_COURSE,
    }),
  );
  const defaultMealCourse =
    categoriesData?.categories?.[0]?.englishTitle ?? null;

  // Resolve the meal course used by both SSR and the client.
  // URL parameter has priority; otherwise use the first category.
  const effectiveMealCourse =
    params.mealCourse ?? defaultMealCourse ?? undefined;

  // Prefetch products using the resolved meal course so the SSR query
  // matches the client query during hydration.
  await queryClient.prefetchQuery({
    queryKey: productQueryKeys.list({
      search: params.search,
      mealCourse: effectiveMealCourse,
      foodGroup: params.foodGroup,
      sort: params.sort,
    }),
    queryFn: () =>
      getProducts(
        {
          search: params.search,
          mealCourse: effectiveMealCourse,
          foodGroup: params.foodGroup,
          sort: params.sort,
        },
        { cookieHeader },
      ),
  });

  return (
    <>
      <HeroCarousel slides={HERO_SLIDES} />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <MenuProvider defaultMealCourse={defaultMealCourse}>
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
