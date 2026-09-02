import * as yup from "yup";

import type { CouponType } from "@/types";

export type CouponFormValues = {
  code: string;
  amount: number;
  usageLimit: number;
  type: CouponType;
  categoryIds: string[];
  expireDate: string;
};

export const couponSchema: yup.ObjectSchema<CouponFormValues> = yup.object({
  code: yup
    .string()
    .trim()
    .required("کد تخفیف الزامی است")
    .min(5, "کد تخفیف باید حداقل ۵ کاراکتر باشد")
    .max(30, "کد تخفیف نباید بیشتر از ۳۰ کاراکتر باشد"),
  amount: yup
    .number()
    .typeError("مقدار تخفیف باید عدد باشد")
    .integer("مقدار تخفیف باید عدد صحیح باشد")
    .positive("مقدار تخفیف باید بیشتر از صفر باشد")
    .when("type", {
      is: "percent",
      then: (schema) => schema.max(100, "درصد تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد"),
    })
    .required("مقدار تخفیف الزامی است"),
  usageLimit: yup
    .number()
    .typeError("ظرفیت باید عدد باشد")
    .integer("ظرفیت باید عدد صحیح باشد")
    .min(1, "ظرفیت باید حداقل ۱ باشد")
    .required("ظرفیت کد تخفیف الزامی است"),
  type: yup
    .mixed<CouponType>()
    .oneOf(["percent", "fixedProduct"], "نوع کد تخفیف صحیح نیست")
    .required("نوع کد تخفیف الزامی است"),
  categoryIds: yup
    .array()
    .of(yup.string().required())
    .min(1, "حداقل یک دسته‌بندی را انتخاب کنید")
    .required("دسته‌بندی الزامی است"),
  expireDate: yup
    .string()
    .required("تاریخ انقضا الزامی است")
    .test(
      "future-date",
      "تاریخ انقضا باید در آینده باشد",
      (value) => {
        if (!value) return false;

        const expireDate = new Date(value);
        return !Number.isNaN(expireDate.getTime()) && expireDate > new Date();
      },
    ),
});
