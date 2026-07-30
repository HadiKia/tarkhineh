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
import { getCategoryById } from "@/services/categoryService";

import ProductDetailsSection from "@/components/sections/product/ProductDetailsSection";
import { ProductBreadcrumbData, ProductResult } from "@/types";


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

  // Resolve the parent mealCourse for breadcrumb navigation.
  // The product only carries the foodGroup category (no parentId),
  // so we fetch the full foodGroup record, then its parent mealCourse.
  const foodGroupData = await getCategoryById(
    productData.product.category._id,
  ).catch(() => null);

  const mealCourseData = foodGroupData?.category.parentId
    ? await getCategoryById(foodGroupData.category.parentId).catch(() => null)
    : null;

  const productBreadcrumbData: ProductBreadcrumbData = {
    mealCourseTitle: mealCourseData?.category.title ?? null,
    mealCourseEnglishTitle: mealCourseData?.category.englishTitle ?? null,
    foodGroupTitle: productData.product.category.title,
    foodGroupEnglishTitle: productData.product.category.englishTitle,
  };

  const queryClient = new QueryClient();
  queryClient.setQueryData(productQueryKeys.bySlug(slug), productData);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailsSection
        slug={slug}
        productBreadcrumbData={productBreadcrumbData}
      />
    </HydrationBoundary>
  );
}
