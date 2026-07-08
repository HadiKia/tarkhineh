import { CreateAddressPayload, CreateAddressResponse, Address } from "@/types";
import http from "./httpService";

export function getAddresses() {
  return http
    .get<{ data: { addresses: Address[] } }>("/user/addresses")
    .then(({ data }) => data.data);
}

export function addAddress(payload: CreateAddressPayload) {
  return http
    .post<CreateAddressResponse>("/user/addresses", payload)
    .then(({ data }) => data);
}

export function deleteAddress(id: string) {
  return http
    .delete<{ data: { message: string } }>("/user/addresses/" + id)
    .then(({ data }) => data);
}

export function updateAddress(
  id: string,
  payload: CreateAddressPayload,
) {
  return http
    .patch<{ data: { message: string } }>("/user/addresses/" + id, payload)
    .then(({ data }) => data);
}
