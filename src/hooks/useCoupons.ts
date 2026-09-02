import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createCoupon,
  getCouponById,
  getCoupons,
  updateCoupon,
} from "@/services/couponService";
import type {
  Coupon,
  CouponListResult,
  CreateCouponPayload,
  UpdateCouponPayload,
} from "@/types";

export const couponQueryKeys = {
  all: ["coupons"] as const,
  lists: () => [...couponQueryKeys.all, "list"] as const,
  list: () => [...couponQueryKeys.lists()] as const,
  details: () => [...couponQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...couponQueryKeys.details(), id] as const,
};

export const useGetCoupons = () =>
  useQuery<CouponListResult>({
    queryKey: couponQueryKeys.list(),
    queryFn: getCoupons,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

export const useCreateCoupon = () =>
  useMutation({
    mutationFn: (payload: CreateCouponPayload) => createCoupon(payload),
  });

export const useGetCoupon = (id: string) =>
  useQuery<{ coupon: Coupon }>({
    queryKey: couponQueryKeys.detail(id),
    queryFn: () => getCouponById(id),
    enabled: Boolean(id),
    retry: false,
  });

export const useUpdateCoupon = (id: string) =>
  useMutation({
    mutationFn: (payload: UpdateCouponPayload) => updateCoupon(id, payload),
  });
