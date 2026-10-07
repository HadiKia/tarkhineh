import { useQuery } from "@tanstack/react-query";

import { getUsers } from "@/services/userService";
import type { UserListParams, UserListResult } from "@/types";

export const userQueryKeys = {
  all: ["users"] as const,
  lists: () => [...userQueryKeys.all, "list"] as const,
  list: (params?: UserListParams) =>
    [...userQueryKeys.lists(), params ?? {}] as const,
};

export const useGetUsers = (params?: UserListParams) =>
  useQuery<UserListResult>({
    queryKey: userQueryKeys.list(params),
    queryFn: () => getUsers(params),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
