"use client";

import { useParams } from "next/navigation";

import EmptyState from "@/components/common/EmptyState";
import TextFieldSkeleton from "@/components/common/TextFieldSkeleton";
import TextAreaSkeleton from "@/components/common/TextAreaSkeleton";
import ProductFormContainer from "@/components/features/products/ProductFormContainer";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { ADMIN_PRODUCTS_PATH } from "@/constants/products";
import { useGetProduct } from "@/hooks/useProducts";

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isFetching } = useGetProduct(id);

  let content: React.ReactNode;

  if (isFetching) {
    content = (
      <div className="flex flex-col gap-4 lg:gap-6 lg:grid lg:grid-cols-2 max-w-179.5 mx-auto lg:py-8">
        <TextFieldSkeleton />
        <TextFieldSkeleton />
        <div className="lg:col-span-2">
          <TextAreaSkeleton />
        </div>
        <TextFieldSkeleton />
        <TextFieldSkeleton />
        <TextFieldSkeleton />
        <TextFieldSkeleton />
        <TextFieldSkeleton />
        <TextFieldSkeleton />
      </div>
    );
  } else if (!data?.product) {
    content = <EmptyState title="محصول مورد نظر یافت نشد." />;
  } else {
    content = <ProductFormContainer product={data.product} />;
  }

  return (
    <>
      <DashboardHeader
        title="ویرایش محصول"
        backHref={ADMIN_PRODUCTS_PATH}
      />
      {content}
    </>
  );
};

export default EditProduct;
