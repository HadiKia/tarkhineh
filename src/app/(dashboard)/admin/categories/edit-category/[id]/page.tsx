"use client";

import { useParams } from "next/navigation";

import EmptyState from "@/components/common/EmptyState";
import TextAreaSkeleton from "@/components/common/TextAreaSkeleton";
import TextFieldSkeleton from "@/components/common/TextFieldSkeleton";
import CategoryFormContainer from "@/components/features/categories/CategoryFormContainer";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { ADMIN_CATEGORIES_PATH } from "@/constants/categories";
import { useGetCategory } from "@/hooks/useCategories";

const EditCategory = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isFetching } = useGetCategory(id);

  let content: React.ReactNode;

  if (isFetching) {
    content = (
      <div className="flex flex-col gap-4 lg:gap-6 lg:grid lg:grid-cols-2 max-w-179.5 mx-auto lg:py-8">
        <TextFieldSkeleton />
        <TextFieldSkeleton />
        <TextFieldSkeleton />
        <TextFieldSkeleton />
        <div className="lg:col-span-2">
          <TextAreaSkeleton />
        </div>
      </div>
    );
  } else if (!data?.category) {
    content = <EmptyState title="دسته‌بندی مورد نظر یافت نشد." />;
  } else {
    content = <CategoryFormContainer category={data?.category} />;
  }

  return (
    <>
      <DashboardHeader
        title="ویرایش دسته‌بندی"
        backHref={ADMIN_CATEGORIES_PATH}
      />

      {content}
    </>
  );
};

export default EditCategory;
