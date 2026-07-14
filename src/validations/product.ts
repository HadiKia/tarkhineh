import * as yup from "yup";
import {
  MAX_PRODUCT_IMAGE_SIZE,
  MAX_PRODUCT_IMAGE_SIZE_MESSAGE,
} from "@/constants/upload";

export type ProductFormValues = {
  title: string;
  slug: string;
  description: string;
  mealCourse: string;
  foodGroup: string;
  slideCount: number;
  images: (File | string)[];
  price: string;
  offPrice: string;
  discount: string;
  countInStock: string;
};

export const productSchema: yup.ObjectSchema<ProductFormValues> = yup.object({
  title: yup
    .string()
    .required("عنوان محصول الزامی است")
    .min(3, "عنوان محصول باید حداقل ۳ کاراکتر باشد")
    .max(30, "عنوان محصول نباید بیشتر از ۳۰ کاراکتر باشد"),
  slug: yup
    .string()
    .required("اسلاگ الزامی است")
    .matches(
      /^[a-z0-9-]+$/,
      "فقط حروف انگلیسی کوچک، اعداد و خط تیره مجاز است"
    ),
  description: yup
    .string()
    .required("توضیحات الزامی است")
    .min(3, "توضیحات باید حداقل ۳ کاراکتر باشد"),
  mealCourse: yup.string().required("وعده غذایی الزامی است"),
  foodGroup: yup.string().required("گروه غذایی الزامی است"),
  slideCount: yup
    .number()
    .typeError("تعداد تصاویر باید یک عدد باشد")
    .required("تعداد تصاویر الزامی است")
    .min(1, "حداقل یک تصویر الزامی است")
    .max(10, "حداکثر ۱۰ تصویر"),
  images: yup
    .array()
    .min(1, "حداقل یک تصویر الزامی است")
    .test("fileSize", MAX_PRODUCT_IMAGE_SIZE_MESSAGE, (value) => {
      if (!value || value.length === 0) return true;
      return value.every((item) => {
        if (typeof item === "string") return true;
        return item.size <= MAX_PRODUCT_IMAGE_SIZE;
      });
    })
    .required("تصاویر الزامی است"),
  price: yup
    .string()
    .required("قیمت الزامی است")
    .test("is-valid-price", "قیمت باید یک عدد مثبت باشد", (value) => {
      if (!value || value === "") return false;
      const num = Number(value);
      return !isNaN(num) && num > 0;
    }),
  offPrice: yup
    .string()
    .defined()
    .test("is-valid-offPrice", "قیمت نهایی باید یک عدد مثبت باشد", (value) => {
      if (!value || value === "") return true;
      const num = Number(value);
      return !isNaN(num) && num >= 0;
    }),
  discount: yup
    .string()
    .defined()
    .test("is-valid-discount", "تخفیف باید یک عدد باشد", (value) => {
      if (!value || value === "") return true;
      const num = Number(value);
      return !isNaN(num) && num >= 0 && num <= 100;
    }),
  countInStock: yup
    .string()
    .required("موجودی الزامی است")
    .test("is-valid-count", "موجودی باید ۰ یا بیشتر باشد", (value) => {
      if (!value || value === "") return false;
      const num = Number(value);
      return !isNaN(num) && num >= 0 && Number.isInteger(num);
    }),
});
