import type {
  Branch,
  BranchListResult,
  CreateBranchPayload,
} from "@/types";
import http from "./httpService";

export function getBranches() {
  return http
    .get<{ data: BranchListResult }>("/branch/list")
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
