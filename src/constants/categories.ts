import { ProductCategoryType } from "@/types";

export const ADMIN_CATEGORIES_PATH = "/admin/categories";
export const ADD_CATEGORY_PATH = `${ADMIN_CATEGORIES_PATH}/add-category`;
export const EDIT_CATEGORY_PATH = `${ADMIN_CATEGORIES_PATH}/edit-category`;

export const productTypeLabels: Record<ProductCategoryType, string> = {
  [ProductCategoryType.MEAL_COURSE]: "وعده غذایی",
  [ProductCategoryType.FOOD_GROUP]: "گروه غذایی",
};
