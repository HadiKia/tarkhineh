import type {
  Coupon,
  CouponListResult,
  CreateCouponPayload,
  UpdateCouponPayload,
} from "@/types";
import http from "./httpService";

export function getCoupons() {
  return http
    .get<{ data: CouponListResult }>("/admin/coupon/list")
    .then(({ data }) => data.data);
}

export function createCoupon(payload: CreateCouponPayload) {
  return http
    .post<{ data: { message: string } }>("/admin/coupon/add", payload)
    .then(({ data }) => data.data);
}

export function getCouponById(id: string) {
  return http
    .get<{ data: { coupon: Coupon } }>(`/admin/coupon/${id}`)
    .then(({ data }) => data.data);
}

export function updateCoupon(id: string, payload: UpdateCouponPayload) {
  return http
    .patch<{ data: { message: string } }>(`/admin/coupon/update/${id}`, payload)
    .then(({ data }) => data.data);
}

export function deleteCoupon(id: string) {
  return http
    .delete<{ data: { message: string } }>(`/admin/coupon/remove/${id}`)
    .then(({ data }) => data.data);
}
