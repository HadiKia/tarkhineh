import type { Category, CategoryListItem } from "@/types";

export const isPersistedCategory = (
  category: CategoryListItem,
): category is Category => "_id" in category;
