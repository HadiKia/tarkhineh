import * as yup from "yup";

const phoneNumberSchema = yup
  .string()
  .trim()
  .min(3, "شماره تلفن معتبر نیست")
  .max(30, "شماره تلفن نباید بیشتر از ۳۰ کاراکتر باشد");

const optionalPhoneNumberSchema = yup
  .string()
  .trim()
  .test(
    "optional-phone-number-length",
    "شماره تلفن معتبر نیست",
    (value) => !value || (value.length >= 3 && value.length <= 30),
  );

export const branchSchema: yup.ObjectSchema<BranchFormValues> = yup.object({
  title: yup
    .string()
    .required("عنوان شعبه الزامی است")
    .min(3, "عنوان شعبه باید حداقل ۳ کاراکتر باشد")
    .max(100, "عنوان شعبه نباید بیشتر از ۱۰۰ کاراکتر باشد"),
  phoneNumber1: phoneNumberSchema.required("شماره تلفن اول الزامی است"),
  phoneNumber2: optionalPhoneNumberSchema.defined().default(""),
  address: yup
    .string()
    .required("آدرس شعبه الزامی است")
    .min(3, "آدرس شعبه باید حداقل ۳ کاراکتر باشد")
    .max(500, "آدرس شعبه نباید بیشتر از ۵۰۰ کاراکتر باشد"),
  workingHours: yup
    .string()
    .required("ساعات کاری الزامی است")
    .min(3, "ساعات کاری باید حداقل ۳ کاراکتر باشد")
    .max(200, "ساعات کاری نباید بیشتر از ۲۰۰ کاراکتر باشد"),
});

export type BranchFormValues = {
  title: string;
  phoneNumber1: string;
  phoneNumber2: string;
  address: string;
  workingHours: string;
};

export const toCreateBranchPayload = (values: BranchFormValues) => ({
  title: values.title,
  phoneNumber1: values.phoneNumber1,
  phoneNumber2: values.phoneNumber2,
  address: values.address,
  workingHours: values.workingHours,
});
