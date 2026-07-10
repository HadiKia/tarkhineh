import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "@/services/categoryService";
import type {
  CategoryListParams,
  CategoryListResult,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const categoryQueryKeys = {
  all: ["categories"] as const,

  lists: () => [...categoryQueryKeys.all, "list"] as const,

  list: (params?: CategoryListParams) =>
    [...categoryQueryKeys.lists(), params ?? {}] as const,

  details: () => [...categoryQueryKeys.all, "detail"] as const,

  detail: (id: string) => [...categoryQueryKeys.details(), id] as const,
};

export const useGetCategories = (params?: CategoryListParams) =>
  useQuery<CategoryListResult>({
    queryKey: categoryQueryKeys.list(params),
    queryFn: () => getCategories(params),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

export const useCreateCategory = () =>
  useMutation({
    mutationFn: (payload: CreateCategoryPayload) => createCategory(payload),
  });

export const useGetCategory = (id: string) =>
  useQuery({
    queryKey: categoryQueryKeys.detail(id),
    queryFn: () => getCategoryById(id),
    enabled: Boolean(id),
    retry: false,
  });

export const useUpdateCategory = (id: string) =>
  useMutation({
    mutationFn: (payload: UpdateCategoryPayload) => updateCategory(id, payload),
  });
