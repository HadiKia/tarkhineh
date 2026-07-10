import {
  createCategory,
  getCategories,
} from "@/services/categoryService";
import type {
  CategoryListParams,
  CategoryListResult,
  CreateCategoryPayload,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const categoryQueryKeys = {
  all: ["categories"] as const,
  list: (params?: CategoryListParams) => ["categories", params ?? {}] as const,
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
