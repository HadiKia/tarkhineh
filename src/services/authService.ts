import {
  SendOTPFormValues,
  CheckOTPFormValues,
  UpdateProfileResponse,
  UpdateProfilePayload,
} from "@/types";
import http from "./httpService";

export function getOTP(data: SendOTPFormValues) {
  return http.post("/user/get-otp", data).then(({ data }) => data.data);
}

export function checkOTP(data: CheckOTPFormValues) {
  return http.post("/user/check-otp", data).then(({ data }) => data.data);
}

export function getUserProfile() {
  return http.get("/user/profile").then(({ data }) => data.data);
}

export function updateProfile(payload: UpdateProfilePayload) {
  const body = new FormData();

  body.append("name", payload.name);
  body.append("email", payload.email);
  body.append("biography", payload.biography ?? "");
  if (payload.phoneNumber) body.append("phoneNumber", payload.phoneNumber);

  if (payload.avatarUrl instanceof File) {
    body.append("avatarUrl", payload.avatarUrl);
  } else if (payload.avatarUrl === null) {
    body.append("avatarUrl", "null");
  }

  return http
    .patch<UpdateProfileResponse>("/user/update", body)
    .then(({ data }) => data);
}

export function logout() {
  return http.post("/user/logout");
}
