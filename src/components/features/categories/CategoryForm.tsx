"use client";

import type { ComponentProps } from "react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  useWatch,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TextArea from "@/components/common/TextArea";
import TextField from "@/components/common/TextField";
import { Button } from "@/components/ui/button";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { useGetCategories } from "@/hooks/useCategories";
import { isPersistedCategory } from "@/utils/category";
import { CategoryFormValues } from "@/validations/category";
import {
  CategoryType,
  ProductCategoryType,
  PRODUCT_CATEGORY_TYPES,
} from "@/types";

type CategoryFormProps = {
  control: Control<CategoryFormValues>;
  register: UseFormRegister<CategoryFormValues>;
  errors: FieldErrors<CategoryFormValues>;
  onSubmit: ComponentProps<"form">["onSubmit"];
  onCancel: () => void;
  isLoading: boolean;
  isSubmitDisabled: boolean;
  isEditing?: boolean;
};

export function CategoryForm({
  control,
  register,
  errors,
  onSubmit,
  onCancel,
  isLoading,
  isSubmitDisabled,
  isEditing = false,
}: CategoryFormProps) {
  const productType = useWatch({ control, name: "productType" });

  const { data: mealCourseCategoriesData } = useGetCategories({
    type: CategoryType.PRODUCT,
    productType: ProductCategoryType.MEAL_COURSE,
  });

  const mealCourseCategories =
    mealCourseCategoriesData?.categories.filter(isPersistedCategory) ?? [];

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 lg:gap-6 lg:grid lg:grid-cols-2 max-w-179.5 mx-auto lg:py-8"
    >
      <TextField
        id="title"
        label="عنوان فارسی"
        placeholder=" "
        error={errors.title?.message}
        {...register("title")}
      />

      <TextField
        id="englishTitle"
        label="عنوان انگلیسی"
        placeholder=" "
        error={errors.englishTitle?.message}
        {...register("englishTitle")}
      />

      <Controller
        control={control}
        name="productType"
        render={({ field }) => (
          <Field data-invalid={Boolean(errors.productType)}>
            <FieldLabel className="text-xs text-gray-7 font-normal">
              نوع دسته‌بندی محصول
            </FieldLabel>

            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger aria-invalid={Boolean(errors.productType)}>
                <SelectValue placeholder="انتخاب کنید" />
              </SelectTrigger>

              <SelectContent position="popper" side="bottom">
                {PRODUCT_CATEGORY_TYPES.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.productType?.message && (
              <FieldDescription aria-invalid>
                {errors.productType.message}
              </FieldDescription>
            )}
          </Field>
        )}
      />

      {productType === ProductCategoryType.FOOD_GROUP && (
        <Controller
          control={control}
          name="parent"
          render={({ field }) => (
            <Field data-invalid={Boolean(errors.parent)}>
              <FieldLabel className="text-xs text-gray-7 font-normal">
                وعده غذایی
              </FieldLabel>

              <Select value={field.value || ""} onValueChange={field.onChange}>
                <SelectTrigger aria-invalid={Boolean(errors.parent)}>
                  <SelectValue placeholder="انتخاب کنید" />
                </SelectTrigger>

                <SelectContent position="popper" side="bottom">
                  {mealCourseCategories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.parent?.message && (
                <FieldDescription aria-invalid>
                  {errors.parent.message}
                </FieldDescription>
              )}
            </Field>
          )}
        />
      )}

      <TextArea
        id="description"
        label="توضیحات"
        placeholder=" "
        wrapperClassName="lg:col-span-2 lg:mt-4"
        className="min-h-28"
        error={errors.description?.message}
        {...register("description")}
      />

      <div className="flex w-full items-center justify-between gap-4 lg:col-start-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          انصراف
        </Button>

        <Button
          type="submit"
          isLoading={isLoading}
          disabled={isSubmitDisabled}
          className="flex-1"
        >
          {isEditing ? "ذخیره تغییرات" : "ایجاد دسته‌بندی"}
        </Button>
      </div>
    </form>
  );
}

export default CategoryForm;
