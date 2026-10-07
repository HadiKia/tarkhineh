import type { UserListParams, UserListResult } from "@/types";
import http from "./httpService";

export function getUsers(
  params?: UserListParams,
  options?: { cookieHeader?: string },
) {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.append("page", String(params.page));
  if (params?.limit) searchParams.append("limit", String(params.limit));
  if (params?.search) searchParams.append("search", params.search);

  const queryString = searchParams.toString();
  const url = `/admin/user/list${queryString ? `?${queryString}` : ""}`;

  return http
    .get<{ data: UserListResult }>(url, {
      headers: options?.cookieHeader
        ? { Cookie: options.cookieHeader }
        : undefined,
    })
    .then(({ data }) => data.data);
}
