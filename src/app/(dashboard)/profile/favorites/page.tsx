import { cookies } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import EmptyState from "@/components/common/EmptyState";
import FavoriteProductsSection from "@/components/features/products/favorites/FavoriteProductsSection";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/services/categoryService";
import { getUserProfile } from "@/services/authService";
import { CategoryType, ProductCategoryType } from "@/types";

type FavoritesSearchParams = {
  mealCourse?: string;
  search?: string;
};

const ALLOWED_PARAMS = new Set(["mealCourse", "search"]);

export default async function ProfileFavoritesPage({
  searchParams,
}: {
  searchParams: Promise<FavoritesSearchParams>;
}) {
  const params = await searchParams;
  const paramKeys = Object.keys(params);
  const hasUnknownParams = paramKeys.some((key) => !ALLOWED_PARAMS.has(key));

  if (hasUnknownParams) {
    redirect("/profile/favorites");
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const [{ user }, categoriesData] = await Promise.all([
    getUserProfile({ cookieHeader }),
    getCategories({
      type: CategoryType.PRODUCT,
      productType: ProductCategoryType.MEAL_COURSE,
    }),
  ]);
  const likedProducts = user?.likedProducts ?? [];
  const mealCourses = categoriesData.categories ?? [];

  if (
    params.mealCourse &&
    !mealCourses.some((category) => category.englishTitle === params.mealCourse)
  ) {
    notFound();
  }

  return (
    <>
      <DashboardHeader title="علاقمندی‌ها" />

      {likedProducts.length > 0 ? (
        <FavoriteProductsSection
          products={likedProducts}
          mealCourses={mealCourses}
        />
      ) : (
        <EmptyState
          title="شما در حال حاضر هیچ محصولی را به علاقه‌مندی‌ها اضافه نکرده‌اید!"
          action={
            <Button variant="outline" asChild className="w-38 lg:w-72">
              <Link href="/menu">منوی رستوران</Link>
            </Button>
          }
        />
      )}
    </>
  );
}
