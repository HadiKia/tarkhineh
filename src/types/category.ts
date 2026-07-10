import { ID } from "./api";

export enum ProductCategoryType {
  MEAL_COURSE = "meal_course",
  FOOD_GROUP = "food_group",
}

export enum CategoryType {
  PRODUCT = "product",
  COMMENT = "comment",
  POST = "post",
  TICKET = "ticket",
}

export type StaticProductFilter = "popular" | "economic";

export interface Category {
  _id: ID;
  title: string;
  englishTitle: string;
  description: string;
  type: CategoryType;
  productType: ProductCategoryType | "static_filter" | null;
  parentId: ID | null;
  createdAt: string;
  updatedAt: string;
}

export interface StaticProductCategory {
  title: string;
  englishTitle: StaticProductFilter;
  description: string;
  type: CategoryType.PRODUCT;
  productType: "static_filter";
}

export type CategoryListItem = Category | StaticProductCategory;

export interface CategoryListResponse {
  statusCode: number;
  data: {
    categories: CategoryListItem[];
  };
}

export type CategoryListResult = CategoryListResponse["data"];

export type CategoryListParams = {
  type?: CategoryType;
  productType?: ProductCategoryType;
  parent?: string;
};

export interface CategoryResponse {
  statusCode: number;
  data: {
    category: Category;
  };
}

export interface CreateCategoryPayload {
  title: string;
  englishTitle: string;
  type: CategoryType;
  productType: ProductCategoryType;
  description: string;
  parent: string;
}

export interface UpdateCategoryPayload {
  title?: string;
  englishTitle?: string;
  type: CategoryType;
  productType: ProductCategoryType;
  description: string;
  parent?: string;
}

export interface CategoryMessageResponse {
  statusCode: number;
  data: {
    message: string;
  };
}

export type CategoryFormData = CreateCategoryPayload;

export const PRODUCT_CATEGORY_TYPES: { value: ProductCategoryType; label: string }[] = [
  { value: ProductCategoryType.MEAL_COURSE, label: "وعده غذایی (دسته اصلی)" },
  { value: ProductCategoryType.FOOD_GROUP, label: "گروه غذایی (زیرمجموعه دسته اصلی)" },
];

export const STATIC_FILTERS: { value: StaticProductFilter; label: string }[] = [
  { value: "popular", label: "پرفروش‌ترین‌ها" },
  { value: "economic", label: "ارزان‌ترین‌ها" },
];
