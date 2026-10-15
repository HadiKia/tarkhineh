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
  const body = new FormData();
  body.append("title", payload.title);
  body.append("phoneNumber1", payload.phoneNumber1);
  body.append("phoneNumber2", payload.phoneNumber2 ?? "");
  body.append("address", payload.address);
  body.append("workingHours", payload.workingHours);
  if (payload.image instanceof File) body.append("image", payload.image);

  return http
    .post<{ data: { message: string; branch: Branch } }>(
      "/admin/branch/add",
      body,
    )
    .then(({ data }) => data.data);
}

export function updateBranch(id: string, payload: UpdateBranchPayload) {
  const body = new FormData();
  body.append("title", payload.title);
  body.append("phoneNumber1", payload.phoneNumber1);
  body.append("phoneNumber2", payload.phoneNumber2 ?? "");
  body.append("address", payload.address);
  body.append("workingHours", payload.workingHours);

  if (payload.image instanceof File) {
    body.append("image", payload.image);
  }
  const existingImage =
    typeof payload.image === "string"
      ? payload.image.includes("/uploads/")
        ? payload.image.substring(payload.image.indexOf("/uploads/") + 1)
        : payload.image
      : "";
  body.append("existingImage", existingImage);

  return http
    .patch<{ data: { message: string; branch: Branch } }>(
      `/admin/branch/update/${id}`,
      body,
    )
    .then(({ data }) => data.data);
}

export function deleteBranch(id: string) {
  return http
    .delete<{ data: { message: string } }>(`/admin/branch/remove/${id}`)
    .then(({ data }) => data.data);
}
