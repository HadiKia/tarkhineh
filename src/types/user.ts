import { ID, ISODateString } from "./api";

export type UserRole = "ADMIN" | "USER";

export type CartProduct = {
  productId: ID;
  quantity: number;
};

export type UserCart = {
  products: CartProduct[];
  coupon: string | null;
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
  likedProducts: ID[];
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
};

export type UpdateProfileResponse = {
  message: string;
};
