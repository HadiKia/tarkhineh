import type {
  CreatePaymentPayload,
  CreatePaymentResult,
  GetPaymentResult,
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
