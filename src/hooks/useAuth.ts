import { getUserProfile } from "@/services/authService";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";

type GetUserResponse = {
  user: User;
};

export const useGetUser = () =>
  useQuery<GetUserResponse>({
    queryKey: ["get-user"],
    queryFn: getUserProfile,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
