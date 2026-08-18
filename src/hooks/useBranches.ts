import { useMutation, useQuery } from "@tanstack/react-query";

import { createBranch, getBranches } from "@/services/branchService";
import type { CreateBranchPayload, BranchListResult } from "@/types";

export const branchQueryKeys = {
  all: ["branches"] as const,
  lists: () => [...branchQueryKeys.all, "list"] as const,
  list: () => [...branchQueryKeys.lists()] as const,
};

export const useGetBranches = () =>
  useQuery<BranchListResult>({
    queryKey: branchQueryKeys.list(),
    queryFn: getBranches,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

export const useCreateBranch = () =>
  useMutation({
    mutationFn: (payload: CreateBranchPayload) => createBranch(payload),
  });
