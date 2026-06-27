import * as yup from "yup";

export const sendOTPSchema = yup.object({
  phoneNumber: yup
    .string()
    .required("شماره همراه الزامی است")
    .matches(/^09\d{9}$/, "شماره همراه معتبر نیست"),
});

export type SendOTPFormValues = yup.InferType<typeof sendOTPSchema>;
