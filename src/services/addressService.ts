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
