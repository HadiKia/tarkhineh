import * as yup from "yup";

export const sendOTPSchema = yup.object({
  phoneNumber: yup
    .string()
    .required("شماره همراه الزامی است")
    .matches(/^09\d{9}$/, "شماره همراه معتبر نیست"),
});

export const checkOTPSchema = yup.object({
  phoneNumber: yup.string().required(),
  otp: yup
    .string()
    .required("کد تأیید الزامی است")
    .matches(/^\d{6}$/, "کد تأیید باید ۶ رقم باشد"),
});

export type SendOTPFormValues = yup.InferType<typeof sendOTPSchema>;
export type CheckOTPFormValues = yup.InferType<typeof checkOTPSchema>;