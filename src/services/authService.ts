import { SendOTPFormValues, CheckOTPFormValues } from "@/types";
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
