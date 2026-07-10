import {
  Category,
  CategoryListItem,
  CategoryListParams,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "@/types";
import http from "./httpService";

export function getCategories(params?: CategoryListParams) {
  const searchParams = new URLSearchParams();
  if (params?.type) searchParams.append("type", params.type);
  if (params?.productType) searchParams.append("productType", params.productType);
  if (params?.parent) searchParams.append("parent", params.parent);

  const queryString = searchParams.toString();
  const url = `/category/list${queryString ? `?${queryString}` : ""}`;

  return http
    .get<{ data: { categories: CategoryListItem[] } }>(url)
    .then(({ data }) => data.data);
}

export function getCategoryById(id: string) {
  return http
    .get<{ data: { category: Category } }>(`/category/${id}`)
    .then(({ data }) => data.data);
}

export function createCategory(payload: CreateCategoryPayload) {
  return http
    .post<{ data: { message: string } }>("/admin/category/add", payload)
    .then(({ data }) => data.data);
}

export function updateCategory(id: string, payload: UpdateCategoryPayload) {
  return http
    .patch<{ data: { message: string } }>(`/admin/category/update/${id}`, payload)
    .then(({ data }) => data.data);
}

export function deleteCategory(id: string) {
  return http
    .delete<{ data: { message: string } }>(`/admin/category/remove/${id}`)
    .then(({ data }) => data.data);
}
