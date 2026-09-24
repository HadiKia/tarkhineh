import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createPayment,
  getAdminPayments,
  getPayment,
  updateOrderStatus,
} from "@/services/paymentService";
import type {
  AdminPaymentListResult,
  CreatePaymentPayload,
  GetPaymentResult,
  UpdateOrderStatusPayload,
} from "@/types";

export const paymentQueryKeys = {
  all: ["payments"] as const,
  details: () => [...paymentQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...paymentQueryKeys.details(), id] as const,
  adminList: () => [...paymentQueryKeys.all, "admin-list"] as const,
};

export const useGetAdminPayments = () =>
  useQuery<AdminPaymentListResult>({
    queryKey: paymentQueryKeys.adminList(),
    queryFn: getAdminPayments,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

export const useUpdateOrderStatus = (id: string) =>
  useMutation({
    mutationFn: (payload: UpdateOrderStatusPayload) =>
      updateOrderStatus(id, payload),
  });

export const useCreatePayment = () =>
  useMutation({
    mutationFn: (payload: CreatePaymentPayload) => createPayment(payload),
  });

export const useGetPayment = (id: string) =>
  useQuery<GetPaymentResult>({
    queryKey: paymentQueryKeys.detail(id),
    queryFn: () => getPayment(id),
    enabled: Boolean(id),
    retry: false,
  });
