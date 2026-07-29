import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { productQueryKeys } from "@/hooks/useProducts";
import { getProductBySlug } from "@/services/productService";

import ProductDetailsSection from "@/components/sections/product/ProductDetailsSection";
import { ProductResult } from "@/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function MenuProductPage({ params }: Props) {
  const { slug } = await params;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  let productData: ProductResult;
  try {
    productData = await getProductBySlug(slug, { cookieHeader });
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }
    throw error;
  }

  const queryClient = new QueryClient();
  queryClient.setQueryData(productQueryKeys.bySlug(slug), productData);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailsSection slug={slug} />
    </HydrationBoundary>
  );
}
