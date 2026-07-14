import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/productService";
import type {
  CreateProductPayload,
  ProductListParams,
  ProductListResult,
  ProductResult,
  UpdateProductPayload,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const productQueryKeys = {
  all: ["products"] as const,
  lists: () => [...productQueryKeys.all, "list"] as const,
  list: (params?: ProductListParams) =>
    [...productQueryKeys.lists(), params ?? {}] as const,
  details: () => [...productQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...productQueryKeys.details(), id] as const,
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
