import http from "./httpService";

export type AddToCartResponse = {
  statusCode: number;
  data: { message: string };
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

export function clearCart() {
  return http
    .delete<AddToCartResponse>("/cart")
    .then(({ data }) => data.data);
}
