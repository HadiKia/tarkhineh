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
  const body = new FormData();
  body.append("title", payload.title);
  body.append("englishTitle", payload.englishTitle);
  body.append("type", payload.type);
  body.append("productType", payload.productType);
  body.append("description", payload.description);
  body.append("parent", payload.parent);
  if (payload.image instanceof File) body.append("image", payload.image);

  return http
    .post<{ data: { message: string } }>("/admin/category/add", body)
    .then(({ data }) => data.data);
}

export function updateCategory(id: string, payload: UpdateCategoryPayload) {
  const body = new FormData();
  if (payload.title !== undefined) body.append("title", payload.title);
  if (payload.englishTitle !== undefined)
    body.append("englishTitle", payload.englishTitle);
  body.append("type", payload.type);
  body.append("productType", payload.productType);
  body.append("description", payload.description);
  if (payload.parent !== undefined) body.append("parent", payload.parent);

  if (payload.image instanceof File) {
    body.append("image", payload.image);
  }
  const existingImage =
    typeof payload.image === "string"
      ? payload.image.includes("/uploads/")
        ? payload.image.substring(payload.image.indexOf("/uploads/") + 1)
        : payload.image
      : "";
  body.append("existingImage", existingImage);

  return http
    .patch<{ data: { message: string } }>(`/admin/category/update/${id}`, body)
    .then(({ data }) => data.data);
}

export function deleteCategory(id: string) {
  return http
    .delete<{ data: { message: string } }>(`/admin/category/remove/${id}`)
    .then(({ data }) => data.data);
}

export function reorderCategories(ids: string[]) {
  return http
    .patch<{ data: { message: string } }>("/admin/category/reorder", { ids })
    .then(({ data }) => data.data);
}
