import { SendOTPFormValues } from "@/types";
import http from "./httpService";

export function getOTP(data: SendOTPFormValues) {
  return http.post("/user/get-otp", data).then(({ data }) => data.data);
}
