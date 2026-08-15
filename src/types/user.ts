import { ID, ISODateString } from "./api";
import type { Product } from "./product";

export type UserRole = "ADMIN" | "USER";

export type CartProduct = {
  productId: ID;
  quantity: number;
};

export type UserCart = {
  products: CartProduct[];
  coupon: string | null;
};

export type CartProductDetail = {
  _id: ID;
  slug: string;
  title: string;
  description: string;
  mainImageUrl: string | null;
  rating: number;
  numReviews: number;
  countInStock: number;
  price: number;
  offPrice: number;
  discount: number;
  quantity: number;
};

export type CartPayDetail = {
  totalProductDiscount: number;
  totalProductPrice: number;
  totalPrice: number;
};

export type CartDetail = {
  productDetail: CartProductDetail[];
  payDetail: CartPayDetail | null;
};

export type User = {
  _id: ID;
  name?: string;
  email?: string;
  phoneNumber: string;
  biography: string | null;
  avatarUrl: string | null;
  role: UserRole;
  isVerifiedPhoneNumber: boolean;
  isActive: boolean;
  likedProducts: Product[];
  Products: ID[];
  cart: UserCart;
  resetLink: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type UpdateProfilePayload = {
  name: string;
  email: string;
  phoneNumber?: string;
  biography?: string;
  avatarUrl?: File | string | null;
};

export type UpdateProfileResponse = {
  data: {
    message: string;
  };
};
