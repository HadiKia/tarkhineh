import { ID } from "./api";
import { Category } from "./category";

export interface Product {
  _id: ID;
  title: string;
  description: string;
  slug: string;
  category: Pick<Category, "_id" | "title" | "englishTitle">;
  imageUrls: string[];
  mainImageUrl: string | null;
  price: number;
  offPrice: number;
  discount: number;
  rating: number;
  numReviews: number;
  countInStock: number;
  likesCount: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListResponse {
  statusCode: number;
  data: {
    products: Product[];
  };
}

export type ProductListResult = ProductListResponse["data"];

export type ProductListParams = {
  search?: string;
  category?: string;
  sort?: string;
  type?: string;
  mealCourse?: string;
  foodGroup?: string;
};

export interface ProductResponse {
  statusCode: number;
  data: {
    product: Product;
  };
}

export type ProductResult = ProductResponse["data"];

export interface CreateProductPayload {
  title: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  offPrice: number;
  discount: number;
  countInStock: number;
  images: (File | string)[];
}

export type UpdateProductPayload = CreateProductPayload;
