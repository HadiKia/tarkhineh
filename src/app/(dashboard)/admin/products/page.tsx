"use client";

import ProductsTable from "@/components/features/products/admin/ProductsTable";
import ProductsTableSkeleton from "@/components/features/products/admin/ProductsTableSkeleton";
import EmptyState from "@/components/common/EmptyState";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { ADD_PRODUCT_PATH } from "@/constants/products";
import { useGetProducts } from "@/hooks/useProducts";
import { Add, AddCircle } from "iconsax-reactjs";
import Link from "next/link";

const Products = () => {
  const { data, isFetching } = useGetProducts();

  return (
    <div className="relative">
      <DashboardHeader title="محصولات" />

      <Button
        type="button"
        variant="default"
        className="lg:hidden absolute inset-e-0 -top-1"
        asChild
      >
        <Link href={ADD_PRODUCT_PATH}>
          <Add />
        </Link>
      </Button>
      <Button
        type="button"
        variant="link"
        asChild
        className="hidden lg:flex absolute inset-e-0 top-0 gap-0.5! text-xs!"
      >
        <Link href={ADD_PRODUCT_PATH}>
          <AddCircle className="size-4" />
          ایجاد محصول
        </Link>
      </Button>

      {isFetching ? (
        <ProductsTableSkeleton />
      ) : data?.products && data.products.length > 0 ? (
        <ProductsTable products={data.products} />
      ) : (
        <EmptyState
          title="هنوز هیچ محصولی ثبت نشده است."
          action={
            <Button variant="outline" asChild className="w-44">
              <Link href={ADD_PRODUCT_PATH}>ایجاد محصول</Link>
            </Button>
          }
        />
      )}
    </div>
  );
};

export default Products;
