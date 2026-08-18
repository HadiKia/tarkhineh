import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createBranch,
  deleteBranch,
  getBranchById,
  getBranches,
  updateBranch,
} from "@/services/branchService";
import type {
  BranchListResult,
  BranchResult,
  CreateBranchPayload,
  UpdateBranchPayload,
} from "@/types";

export const branchQueryKeys = {
  all: ["branches"] as const,
  lists: () => [...branchQueryKeys.all, "list"] as const,
  list: () => [...branchQueryKeys.lists()] as const,
  details: () => [...branchQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...branchQueryKeys.details(), id] as const,
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

export const useGetBranch = (id: string) =>
  useQuery<BranchResult>({
    queryKey: branchQueryKeys.detail(id),
    queryFn: () => getBranchById(id),
    enabled: Boolean(id),
    retry: false,
  });

export const useUpdateBranch = (id: string) =>
  useMutation({
    mutationFn: (payload: UpdateBranchPayload) => updateBranch(id, payload),
  });

export const useDeleteBranch = (id: string) =>
  useMutation({
    mutationFn: () => deleteBranch(id),
  });
