import * as yup from "yup";
import {
  MAX_AVATAR_FILE_SIZE,
  MAX_AVATAR_FILE_SIZE_MESSAGE,
} from "@/constants/upload";
import { toPersianDigits } from "@/utils/numberFormatter";

export const profileSchema = yup.object({
  phoneNumber: yup
    .string()
    .required("پر کردن این فیلد الزامی است!")
    .matches(/^09\d{9}$/, "شماره همراه معتبر نیست"),
  name: yup.string().required("نام الزامی است"),
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
  biography: yup.string().default(""),
  avatarUrl: yup
    .mixed<File | string>()
    .nullable()
    .default(null)
    .test(
      "fileSize",
      toPersianDigits(MAX_AVATAR_FILE_SIZE_MESSAGE),
      (value) => {
        if (!value || typeof value === "string") return true;
        return value.size <= MAX_AVATAR_FILE_SIZE;
      },
    ),
});

export type ProfileFormValues = yup.InferType<typeof profileSchema>;
