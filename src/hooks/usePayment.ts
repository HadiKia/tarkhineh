import { useMutation, useQuery } from "@tanstack/react-query";

import { createPayment, getPayment } from "@/services/paymentService";
import type { CreatePaymentPayload, GetPaymentResult } from "@/types";

export const paymentQueryKeys = {
  all: ["payments"] as const,
  details: () => [...paymentQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...paymentQueryKeys.details(), id] as const,
};

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
