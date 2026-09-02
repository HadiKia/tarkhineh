import type { CouponListResult, CreateCouponPayload } from "@/types";
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
