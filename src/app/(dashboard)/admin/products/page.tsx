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
import { useSearchParams } from "next/navigation";
import SearchRouteSection from "@/components/sections/search/SearchRouteSection";
import ProductsPagination from "@/components/features/products/admin/ProductsPagination";

const Products = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.trim() ?? "";
  const pageParam = Number(searchParams.get("page"));
  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;
  const limit = 8;
  const { data, isFetching } = useGetProducts(
    search ? { search, page, limit } : { page, limit },
  );

  return (
    <div className="relative">
      <DashboardHeader title="محصولات" />

      <div className="my-6 max-w-98 ms-auto">
        <SearchRouteSection
          value={search}
          redirectOnEmpty
          searchPath="/admin/products"
          emptySearchPath="/admin/products"
          placeholder="جستجوی محصول..."
        />
      </div>

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

      <ProductsPagination
        page={data?.pagination.page ?? page}
        totalPages={data?.pagination.totalPages ?? 0}
        search={search}
      />
    </div>
  );
};

export default Products;
