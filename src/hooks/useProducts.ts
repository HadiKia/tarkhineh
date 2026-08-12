import {
  getProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  rateProduct,
  likeProduct,
} from "@/services/productService";
import type {
  CreateProductPayload,
  LikeProductResponse,
  ProductListParams,
  ProductListResult,
  ProductResult,
  RateProductPayload,
  RateProductResponse,
  UpdateProductPayload,
} from "@/types";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { addToCart, removeFromCart } from "@/services/cartService";

export const productQueryKeys = {
  all: ["products"] as const,
  lists: () => [...productQueryKeys.all, "list"] as const,
  list: (params?: ProductListParams) =>
    [...productQueryKeys.lists(), params ?? {}] as const,
  details: () => [...productQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...productQueryKeys.details(), id] as const,
  slugs: () => [...productQueryKeys.all, "slug"] as const,
  bySlug: (slug: string) => [...productQueryKeys.slugs(), slug] as const,
};

export const useGetProducts = (params?: ProductListParams) =>
  useQuery<ProductListResult>({
    queryKey: productQueryKeys.list(params),
    queryFn: () => getProducts(params),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

export const useGetProduct = (id: string) =>
  useQuery<ProductResult>({
    queryKey: productQueryKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: Boolean(id),
    retry: false,
  });

export const useCreateProduct = () =>
  useMutation({
    mutationFn: (payload: CreateProductPayload) => createProduct(payload),
  });

export const useUpdateProduct = (id: string) =>
  useMutation({
    mutationFn: (payload: UpdateProductPayload) => updateProduct(id, payload),
  });

export const useDeleteProduct = (id: string) =>
  useMutation({
    mutationFn: () => deleteProduct(id),
  });

export const useRateProduct = (productId: string) =>
  useMutation<RateProductResponse, Error, RateProductPayload>({
    mutationFn: (payload) => rateProduct(productId, payload),
  });

export const useLikeProduct = (productId: string) =>
  useMutation<LikeProductResponse, Error>({
    mutationFn: () => likeProduct(productId),
  });

export const useAddToCart = (productId: string) =>
  useMutation({
    mutationFn: () => addToCart(productId),
  });

export const useRemoveFromCart = (productId: string) =>
  useMutation({
    mutationFn: () => removeFromCart(productId),
  });

export const useSuspenseProducts = (params?: ProductListParams) =>
  useSuspenseQuery<ProductListResult>({
    queryKey: productQueryKeys.list(params),
    queryFn: () => getProducts(params),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

export const useSuspenseProductBySlug = (slug: string) =>
  useSuspenseQuery<ProductResult>({
    queryKey: productQueryKeys.bySlug(slug),
    queryFn: () => getProductBySlug(slug),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
