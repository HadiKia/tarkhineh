import type { CouponListResult } from "@/types";
import http from "./httpService";

export function getCoupons() {
  return http
    .get<{ data: CouponListResult }>("/admin/coupon/list")
    .then(({ data }) => data.data);
}
