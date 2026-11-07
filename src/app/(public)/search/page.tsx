import { Suspense } from "react";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { productQueryKeys } from "@/hooks/useProducts";
import { getProducts } from "@/services/productService";
import ProductGridSkeleton from "@/components/sections/menu/ProductGridSkeleton";
import ProductResultsSection from "@/components/sections/products/ProductResultsSection";
import SearchRouteSection from "@/components/sections/search/SearchRouteSection";

type SearchParams = {
  search?: string;
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const { search } = await searchParams;
  const query = search?.trim();

  return {
    title: query ? `نتایج جستجو برای "${query}"` : "جستجو",
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const search = params.search?.trim() ?? "";
  const queryClient = new QueryClient();

  if (search) {
    const cookieHeader = (await cookies()).toString();

    await queryClient.fetchQuery({
      queryKey: productQueryKeys.list({ search }),
      queryFn: () => getProducts({ search }, { cookieHeader }),
    });
  }

  return (
    <>
      <div className="mx-auto w-full sm:max-w-98 px-4 py-6 lg:py-12 xl:px-0">
        <SearchRouteSection value={search} redirectOnEmpty />
      </div>

      {search ? (
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductResultsSection params={{ search }} />
          </Suspense>
        </HydrationBoundary>
      ) : null}
    </>
  );
}
