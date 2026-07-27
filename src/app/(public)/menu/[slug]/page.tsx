import { cookies } from "next/headers";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { productQueryKeys } from "@/hooks/useProducts";
import { getProductBySlug } from "@/services/productService";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function MenuProductPage({ params }: Props) {
  const { slug } = await params;

  const queryClient = new QueryClient();

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  await queryClient.prefetchQuery({
    queryKey: productQueryKeys.bySlug(slug),
    queryFn: () => getProductBySlug(slug, { cookieHeader }),
  });

  const product = queryClient.getQueryData(productQueryKeys.bySlug(slug));

  console.log(product);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {null}
    </HydrationBoundary>
  );
}
