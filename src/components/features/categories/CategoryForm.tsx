"use client";

import type { ComponentProps } from "react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  useWatch,
} from "react-hook-form";
import { ChevronDownIcon } from "lucide-react";

import TextArea from "@/components/common/TextArea";
import TextField from "@/components/common/TextField";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { useGetCategories } from "@/hooks/useCategories";
import { cn } from "@/lib/utils";
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
};

export function CategoryForm({
  control,
  register,
  errors,
  onSubmit,
  onCancel,
  isLoading,
  isSubmitDisabled,
}: CategoryFormProps) {
  const productType = useWatch({ control, name: "productType" });
  const parent = useWatch({ control, name: "parent" });

  const { data: mealCourseCategoriesData } = useGetCategories({
    type: CategoryType.PRODUCT,
    productType: ProductCategoryType.MEAL_COURSE,
  });

  const mealCourseCategories =
    mealCourseCategoriesData?.categories.filter(isPersistedCategory) ?? [];
  const selectedParentTitle = mealCourseCategories.find(
    (category) => category._id === parent,
  )?.title;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 md:gap-4">
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
        render={({ field: { value, onChange } }) => (
          <Field data-invalid={Boolean(errors.productType)}>
            <FieldLabel>نوع دسته‌بندی محصول</FieldLabel>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "h-11 w-full justify-between text-xs lg:text-sm",
                    errors.productType && "border-destructive",
                  )}
                  aria-invalid={Boolean(errors.productType)}
                >
                  {PRODUCT_CATEGORY_TYPES.find((item) => item.value === value)
                    ?.label ?? "انتخاب کنید"}
                  <ChevronDownIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                {PRODUCT_CATEGORY_TYPES.map((item) => (
                  <DropdownMenuItem
                    key={item.value}
                    onClick={() => onChange(item.value)}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
          render={({ field: { onChange } }) => (
            <Field data-invalid={Boolean(errors.parent)}>
              <FieldLabel>وعده غذایی</FieldLabel>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "h-11 w-full justify-between text-xs lg:text-sm",
                      errors.parent && "border-destructive",
                    )}
                    aria-invalid={Boolean(errors.parent)}
                  >
                    {selectedParentTitle ?? "انتخاب کنید"}
                    <ChevronDownIcon className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                  {mealCourseCategories.map((category) => (
                    <DropdownMenuItem
                      key={category._id}
                      onClick={() => onChange(category._id)}
                    >
                      {category.title}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
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
        className="min-h-28"
        error={errors.description?.message}
        {...register("description")}
      />

      <div className="mt-3 flex w-full items-center justify-between gap-4 md:mt-0">
        <Button
          type="button"
          variant="link"
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
          ایجاد دسته‌بندی
        </Button>
      </div>
    </form>
  );
}

export default CategoryForm;
