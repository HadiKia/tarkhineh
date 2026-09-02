import { useMutation, useQuery } from "@tanstack/react-query";

import { createCoupon, getCoupons } from "@/services/couponService";
import type { CouponListResult, CreateCouponPayload } from "@/types";

export const couponQueryKeys = {
  all: ["coupons"] as const,
  lists: () => [...couponQueryKeys.all, "list"] as const,
  list: () => [...couponQueryKeys.lists()] as const,
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
