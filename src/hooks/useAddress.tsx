import { getAddresses } from "@/services/addressService";
import { Address } from "@/types";
import { useQuery } from "@tanstack/react-query";

type GetAddressesResponse = {
  addresses: Address[];
};

export const useGetAddresses = () =>
  useQuery<GetAddressesResponse>({
    queryKey: ["get-addresses"],
    queryFn: getAddresses,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
