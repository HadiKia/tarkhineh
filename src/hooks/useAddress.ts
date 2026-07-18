import {
  addAddress,
  deleteAddress,
  getAddress,
  getAddresses,
  updateAddress,
} from "@/services/addressService";
import type { Address, CreateAddressPayload } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

type GetAddressesResponse = {
  addresses: Address[];
};

export const addressQueryKeys = {
  all: ["addresses"] as const,

  lists: () => [...addressQueryKeys.all, "list"] as const,

  list: () => [...addressQueryKeys.lists()] as const,

  details: () => [...addressQueryKeys.all, "detail"] as const,

  detail: (id: string) => [...addressQueryKeys.details(), id] as const,
};

export const useGetAddresses = () =>
  useQuery<GetAddressesResponse>({
    queryKey: addressQueryKeys.list(),
    queryFn: getAddresses,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

export const useGetAddress = (id: string) =>
  useQuery({
    queryKey: addressQueryKeys.detail(id),
    queryFn: () => getAddress(id),
    enabled: Boolean(id),
    retry: false,
  });

export const useCreateAddress = () =>
  useMutation({
    mutationFn: (payload: CreateAddressPayload) => addAddress(payload),
  });

export const useUpdateAddress = (id: string) =>
  useMutation({
    mutationFn: (payload: CreateAddressPayload) => updateAddress(id, payload),
  });

export const useDeleteAddress = (id: string) =>
  useMutation({
    mutationFn: () => deleteAddress(id),
  });
