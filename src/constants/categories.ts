import { ProductCategoryType } from "@/types";

export const ADMIN_CATEGORIES_PATH = "/admin/categories";
export const ADD_CATEGORY_PATH = `${ADMIN_CATEGORIES_PATH}/add-category`;

export const productTypeLabels: Record<ProductCategoryType, string> = {
  [ProductCategoryType.MEAL_COURSE]: "وعده غذایی",
  [ProductCategoryType.FOOD_GROUP]: "گروه غذایی",
};

export const categoryDateFormatter = new Intl.DateTimeFormat("fa-IR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export const formatCategoryDate = (date: string) =>
  categoryDateFormatter.format(new Date(date));
