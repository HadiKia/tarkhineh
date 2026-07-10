import * as yup from "yup";

import { CategoryType, ProductCategoryType } from "@/types";

export type CategoryFormValues = {
  title: string;
  englishTitle: string;
  productType: ProductCategoryType;
  parent?: string;
  description: string;
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
});
