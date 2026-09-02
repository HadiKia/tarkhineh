import { ID } from "./api";
import { ProductCategoryType } from "./category";

export type CouponType = "percent" | "fixedProduct";

export type CouponCategory = {
  _id: ID;
  title: string;
  englishTitle: string;
  productType: ProductCategoryType | null;
  parentId: ID | null;
};

export type CouponProduct = {
  _id: ID;
  title: string;
  slug: string;
};

export type Coupon = {
  _id: ID;
  code: string;
  type: CouponType;
  amount: number;
  expireDate: string;
  isActive: boolean;
  usageCount: number;
  usageLimit: number;
  productIds: CouponProduct[];
  categoryIds: CouponCategory[];
  createdAt: string;
  updatedAt: string;
};

export type CouponListResult = {
  coupons: Coupon[];
};

export type CreateCouponPayload = {
  code: string;
  amount: number;
  usageLimit: number;
  type: CouponType;
  categoryIds: string[];
  expireDate: string;
};
