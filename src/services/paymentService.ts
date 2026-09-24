import type {
  AdminPaymentListResult,
  CreatePaymentPayload,
  CreatePaymentResult,
  GetAdminPaymentResult,
  GetPaymentResult,
  UpdateOrderStatusPayload,
  UpdateOrderStatusResult,
} from "@/types";

import http from "./httpService";

export function createPayment(payload: CreatePaymentPayload) {
  return http
    .post<{ data: CreatePaymentResult }>("/payment/create", payload)
    .then(({ data }) => data.data);
}

export function getPayment(id: string) {
  return http
    .get<{ data: GetPaymentResult }>(`/payment/${id}`)
    .then(({ data }) => data.data);
}

export function getAdminPayments() {
  return http
    .get<{ data: AdminPaymentListResult }>("/admin/payment/list")
    .then(({ data }) => data.data);
}

export function getAdminPayment(id: string) {
  return http
    .get<{ data: GetAdminPaymentResult }>(`/admin/payment/${id}`)
    .then(({ data }) => data.data);
}

export function updateOrderStatus(
  id: string,
  payload: UpdateOrderStatusPayload,
) {
  return http
    .patch<{ data: UpdateOrderStatusResult }>(
      `/admin/payment/${id}/status`,
      payload,
    )
    .then(({ data }) => data.data);
}
