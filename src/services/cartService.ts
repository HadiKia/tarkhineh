import type { CartDetail } from "@/types";

import http from "./httpService";

export type AddToCartResponse = {
  statusCode: number;
  data: { message: string };
};

export type AddCouponToCartResponse = {
  statusCode: number;
  data: { message: string; cart: CartDetail };
};

export type RemoveCouponFromCartResponse = {
  statusCode: number;
  data: { message: string; cart: CartDetail };
};

export function addToCart(productId: string) {
  return http
    .post<AddToCartResponse>("/cart/add", { productId })
    .then(({ data }) => data.data);
}

export function removeFromCart(productId: string) {
  return http
    .post<AddToCartResponse>("/cart/remove", { productId })
    .then(({ data }) => data.data);
}

export function removeProductFromCart(productId: string) {
  return http
    .delete<AddToCartResponse>(`/cart/product/${productId}`)
    .then(({ data }) => data.data);
}

export function clearCart() {
  return http
    .delete<AddToCartResponse>("/cart")
    .then(({ data }) => data.data);
}

export function addCouponToCart(couponCode: string) {
  return http
    .post<AddCouponToCartResponse>("/cart/coupon", { couponCode })
    .then(({ data }) => data.data);
}

export function removeCouponFromCart() {
  return http
    .delete<RemoveCouponFromCartResponse>("/cart/coupon")
    .then(({ data }) => data.data);
}
