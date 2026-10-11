"use client";

import Image from "next/image";
import Link from "next/link";

import { useGetCategories } from "@/hooks/useCategories";
import { CategoryType, ProductCategoryType } from "@/types";
import { isPersistedCategory } from "@/utils/category";
import MealCourseSkeleton from "./MealCourseSkeleton";
import { Button } from "@/components/ui/button";

export default function MealCourseSection() {
  const { data, isFetching } = useGetCategories({
    type: CategoryType.PRODUCT,
    productType: ProductCategoryType.MEAL_COURSE,
  });

  if (isFetching) {
    return <MealCourseSkeleton />;
  }

  const mealCourses = data?.categories.filter(isPersistedCategory) ?? [];

  if (mealCourses.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-306 px-4 py-6 lg:py-12 xl:px-0">
      <h2 className="mb-3 text-center text-base font-bold text-gray-8 lg:mb-8 lg:text-2xl">
        منوی رستوران
      </h2>

      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-8">
        {mealCourses.map((category) => (
          <div
            key={category._id}
            className="group relative flex flex-col items-center gap-2.5 lg:gap-4"
          >
            <div className="relative aspect-square size-30 lg:size-60 overflow-hidden z-1 rounded-full drop-shadow">
              <Image
                src={category.imageUrl ?? "/images/empty/placeholder.png"}
                alt={category.title}
                fill
                sizes="(min-width: 1024px) 240px, 120px"
                className="object-cover object-center transition-transform duration-300 ease-linear group-hover:scale-105"
              />
            </div>

            <div className="w-full h-20 lg:h-40 bg-primary rounded lg:rounded-lg shadow-cards-shadow absolute bottom-5.5 lg:bottom-6"></div>

            <Button
              variant="ghost"
              asChild
              className="bg-white hover:bg-white z-1 w-3/5 shadow-cards-shadow"
            >
              <Link href={`/menu?mealCourse=${category.englishTitle}`}>
                {category.title}
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
