import * as yup from "yup";

import {
  MAX_PRODUCT_IMAGE_SIZE,
  MAX_PRODUCT_IMAGE_SIZE_MESSAGE,
} from "@/constants/upload";
import { CategoryType, ProductCategoryType } from "@/types";

export type CategoryFormValues = {
  title: string;
  englishTitle: string;
  productType: ProductCategoryType;
  parent?: string;
  description: string;
  image: File | string | null;
};

export const categorySchema: yup.ObjectSchema<CategoryFormValues> = yup.object({
  title: yup
    .string()
    .required("عنوان فارسی الزامی است")
    .min(3, "عنوان فارسی باید حداقل ۳ کاراکتر باشد")
    .max(100, "عنوان فارسی نباید بیشتر از ۱۰۰ کاراکتر باشد"),
  englishTitle: yup
    .string()
    .required("عنوان انگلیسی الزامی است")
    .matches(/^[A-Za-z0-9_-]+$/, "فقط حروف انگلیسی، اعداد، - و _ مجاز است")
    .min(3, "عنوان انگلیسی باید حداقل ۳ کاراکتر باشد")
    .max(100, "عنوان انگلیسی نباید بیشتر از ۱۰۰ کاراکتر باشد"),
  productType: yup
    .mixed<ProductCategoryType>()
    .oneOf(Object.values(ProductCategoryType), "نوع دسته‌بندی محصول صحیح نیست")
    .required("نوع دسته‌بندی محصول الزامی است"),
  parent: yup.string().when("productType", {
    is: ProductCategoryType.FOOD_GROUP,
    then: (schema) => schema.required("وعده غذایی برای گروه غذایی الزامی است"),
    otherwise: (schema) => schema.defined().default(""),
  }),
  description: yup
    .string()
    .required("توضیحات الزامی است")
    .min(3, "توضیحات باید حداقل ۳ کاراکتر باشد")
    .max(200, "توضیحات نباید بیشتر از ۲۰۰ کاراکتر باشد"),
  image: yup
    .mixed<File | string>()
    .nullable()
    .default(null)
    .test(
      "required-for-meal-course",
      "تصویر برای وعده غذایی الزامی است",
      function (value) {
        const { productType } = this.parent as CategoryFormValues;
        if (productType !== ProductCategoryType.MEAL_COURSE) return true;
        return Boolean(value);
      },
    )
    .test("fileSize", MAX_PRODUCT_IMAGE_SIZE_MESSAGE, (value) => {
      if (!value || typeof value === "string") return true;
      return value.size <= MAX_PRODUCT_IMAGE_SIZE;
    }),
});

export const toCreateCategoryPayload = (values: CategoryFormValues) => ({
  title: values.title,
  englishTitle: values.englishTitle,
  type: CategoryType.PRODUCT,
  productType: values.productType,
  parent:
    values.productType === ProductCategoryType.FOOD_GROUP
      ? (values.parent ?? "")
      : "",
  description: values.description,
  image: values.image ?? null,
});
