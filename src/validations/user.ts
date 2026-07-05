import * as yup from "yup";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

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
      "حجم فایل انتخاب شده باید کمتر از ۲۰ مگابایت باشد",
      (value) => {
        if (!value || typeof value === "string") return true;
        return value.size <= MAX_FILE_SIZE;
      },
    ),
});

export type ProfileFormValues = yup.InferType<typeof profileSchema>;
