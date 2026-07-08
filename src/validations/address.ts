import * as yup from "yup";

export const addressSchema = yup.object({
  title: yup.string().required("عنوان آدرس الزامی است"),
  isSelfReceiver: yup.boolean().default(true),
  phoneNumber: yup
    .string()
    .default("")
    .when("isSelfReceiver", {
      is: true,
      then: (schema) =>
        schema
          .required("پر کردن این فیلد الزامی است!")
          .matches(/^09\d{9}$/, "شماره همراه معتبر نیست"),
    }),
  receiverName: yup
    .string()
    .default("")
    .when("isSelfReceiver", {
      is: false,
      then: (schema) => schema.required("نام تحویل‌گیرنده الزامی است"),
    }),
  receiverPhoneNumber: yup
    .string()
    .default("")
    .when("isSelfReceiver", {
      is: false,
      then: (schema) =>
        schema
          .required("پر کردن این فیلد الزامی است!")
          .matches(/^09\d{9}$/, "شماره همراه معتبر نیست"),
    }),
  address: yup.string().required("آدرس الزامی است"),
});

export type AddressFormValues = yup.InferType<typeof addressSchema>;
