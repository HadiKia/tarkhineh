import type {
  Branch,
  BranchListResult,
  CreateBranchPayload,
  BranchResult,
  UpdateBranchPayload,
} from "@/types";
import http from "./httpService";

export function getBranches() {
  return http
    .get<{ data: BranchListResult }>("/branch/list")
    .then(({ data }) => data.data);
}

export function getBranchById(id: string) {
  return http
    .get<{ data: BranchResult }>(`/branch/${id}`)
    .then(({ data }) => data.data);
}

export function createBranch(payload: CreateBranchPayload) {
  return http
    .post<{ data: { message: string; branch: Branch } }>(
      "/admin/branch/add",
      payload,
    )
    .then(({ data }) => data.data);
}

export function updateBranch(id: string, payload: UpdateBranchPayload) {
  return http
    .patch<{ data: { message: string; branch: Branch } }>(
      `/admin/branch/update/${id}`,
      payload,
    )
    .then(({ data }) => data.data);
}

export function deleteBranch(id: string) {
  return http
    .delete<{ data: { message: string } }>(`/admin/branch/remove/${id}`)
    .then(({ data }) => data.data);
}
