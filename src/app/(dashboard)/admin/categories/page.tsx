"use client";

import CategoriesTable from "@/components/features/categories/CategoriesTable";
import CategoriesTableSkeleton from "@/components/features/categories/CategoriesTableSkeleton";
import EmptyState from "@/components/common/EmptyState";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { ADD_CATEGORY_PATH } from "@/constants/categories";
import { useGetCategories } from "@/hooks/useCategories";
import { CategoryType } from "@/types";
import { isPersistedCategory } from "@/utils/category";
import { Add, AddCircle } from "iconsax-reactjs";
import Link from "next/link";
import { useMemo } from "react";

const Categories = () => {
  const { data, isFetching } = useGetCategories({
    type: CategoryType.PRODUCT,
  });

  const categories = useMemo(
    () => data?.categories.filter(isPersistedCategory) ?? [],
    [data?.categories],
  );

  return (
    <div className="relative">
      <DashboardHeader title="دسته‌بندی‌ها" />

      <Button
        type="button"
        variant="default"
        className="lg:hidden absolute inset-e-0 -top-1"
        asChild
      >
        <Link href={ADD_CATEGORY_PATH}>
          <Add />{" "}
        </Link>
      </Button>
      <Button
        type="button"
        variant="link"
        asChild
        className="hidden lg:flex absolute inset-e-0 top-0 gap-0.5! text-xs!"
      >
        <Link href={ADD_CATEGORY_PATH}>
          <AddCircle className="size-4" />
          ایجاد دسته‌بندی
        </Link>
      </Button>

      {isFetching ? (
        <CategoriesTableSkeleton />
      ) : categories.length > 0 ? (
        <CategoriesTable categories={categories} />
      ) : (
        <EmptyState
          title="هنوز هیچ دسته‌بندی ثبت نشده است."
          action={
            <Button variant="outline" asChild className="w-44">
              <Link href={ADD_CATEGORY_PATH}>ایجاد دسته‌بندی</Link>
            </Button>
          }
        />
      )}
    </div>
  );
};

export default Categories;
