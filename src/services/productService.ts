import {
  CreateProductPayload,
  ProductListParams,
  ProductListResult,
  ProductResult,
  UpdateProductPayload,
} from "@/types";
import http from "./httpService";

export function getProducts(params?: ProductListParams) {
  const searchParams = new URLSearchParams();
  if (params?.search) searchParams.append("search", params.search);
  if (params?.category) searchParams.append("category", params.category);
  if (params?.sort) searchParams.append("sort", params.sort);
  if (params?.type) searchParams.append("type", params.type);
  if (params?.mealCourse) searchParams.append("mealCourse", params.mealCourse);
  if (params?.foodGroup) searchParams.append("foodGroup", params.foodGroup);
  if (params?.page) searchParams.append("page", String(params.page));
  if (params?.limit) searchParams.append("limit", String(params.limit));

  const queryString = searchParams.toString();
  const url = `/product/list${queryString ? `?${queryString}` : ""}`;

  return http
    .get<{ data: ProductListResult }>(url)
    .then(({ data }) => data.data);
}

export function getProductById(id: string) {
  return http
    .get<{ data: ProductResult }>(`/product/${id}`)
    .then(({ data }) => data.data);
}

export function createProduct(payload: CreateProductPayload) {
  const body = new FormData();
  body.append("title", payload.title);
  body.append("slug", payload.slug);
  body.append("description", payload.description);
  body.append("category", payload.category);
  body.append("price", String(payload.price));
  body.append("offPrice", String(payload.offPrice));
  body.append("discount", String(payload.discount));
  body.append("countInStock", String(payload.countInStock));
  payload.images.forEach((img) => body.append("images", img));

  return http
    .post<{ data: { message: string; product: ProductResult["product"] } }>(
      "/admin/product/add",
      body
    )
    .then(({ data }) => data.data);
}

export function updateProduct(id: string, payload: UpdateProductPayload) {
  const body = new FormData();
  body.append("title", payload.title);
  body.append("slug", payload.slug);
  body.append("description", payload.description);
  body.append("category", payload.category);
  body.append("price", String(payload.price));
  body.append("offPrice", String(payload.offPrice));
  body.append("discount", String(payload.discount));
  body.append("countInStock", String(payload.countInStock));

  const existingImages: string[] = [];
  payload.images.forEach((img) => {
    if (img instanceof File) {
      body.append("images", img);
    } else {
      const relativePath = img.includes("/uploads/")
        ? img.substring(img.indexOf("/uploads/") + 1)
        : img;
      existingImages.push(relativePath);
    }
  });

  if (existingImages.length > 0) {
    existingImages.forEach((path) => body.append("existingImages", path));
  } else if (payload.images.length === 0) {
    body.append("existingImages", "");
  }

  return http
    .patch<{ data: { message: string } }>(
      `/admin/product/update/${id}`,
      body
    )
    .then(({ data }) => data.data);
}

export function deleteProduct(id: string) {
  return http
    .delete<{ data: { message: string } }>(`/admin/product/remove/${id}`)
    .then(({ data }) => data.data);
}
