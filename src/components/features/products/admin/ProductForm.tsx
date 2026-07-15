"use client";

import type { ComponentProps } from "react";
import {
  Controller,
  type Control,
  type FieldError,
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
import FileInput from "@/components/common/FileInput";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { MAX_PRODUCT_IMAGE_SIZE } from "@/constants/upload";
import { useGetCategories } from "@/hooks/useCategories";
import { isPersistedCategory } from "@/utils/category";
import { ProductFormValues } from "@/validations/product";
import { CategoryType, ProductCategoryType } from "@/types";

const SLIDE_COUNT_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1);

type ProductFormProps = {
  control: Control<ProductFormValues>;
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  onSubmit: ComponentProps<"form">["onSubmit"];
  onCancel: () => void;
  isLoading: boolean;
  isSubmitDisabled: boolean;
  isEditing?: boolean;
  imagePreviews: (string | null)[];
  onImageChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  onImageRemove: (index: number) => void;
  computedOffPrice: number;
};

export function ProductForm({
  control,
  register,
  errors,
  onSubmit,
  onCancel,
  isLoading,
  isSubmitDisabled,
  isEditing = false,
  imagePreviews,
  onImageChange,
  onImageRemove,
  computedOffPrice,
}: ProductFormProps) {
  const mealCourse = useWatch({ control, name: "mealCourse" });
  const slideCount = useWatch({ control, name: "slideCount" });
  const images = useWatch({ control, name: "images" });

  const { data: mealCourseData } = useGetCategories({
    type: CategoryType.PRODUCT,
    productType: ProductCategoryType.MEAL_COURSE,
  });

  const mealCourseCategories =
    mealCourseData?.categories.filter(isPersistedCategory) ?? [];

  const selectedMealCourseId = mealCourseCategories.find(
    (c) => c.englishTitle === mealCourse,
  )?._id;

  const { data: foodGroupData } = useGetCategories(
    selectedMealCourseId
      ? {
          type: CategoryType.PRODUCT,
          productType: ProductCategoryType.FOOD_GROUP,
          parent: selectedMealCourseId,
        }
      : undefined,
  );

  const foodGroupCategories = (foodGroupData?.categories ?? []).filter(
    isPersistedCategory,
  );

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 lg:gap-6 lg:grid lg:grid-cols-2 max-w-179.5 mx-auto lg:py-8"
    >
      <TextField
        id="title"
        label="عنوان محصول"
        placeholder=" "
        error={errors.title?.message}
        {...register("title")}
      />

      <TextField
        id="slug"
        label="اسلاگ"
        placeholder=" "
        dir="ltr"
        error={errors.slug?.message}
        {...register("slug")}
      />

      <TextArea
        id="description"
        label="توضیحات"
        placeholder=" "
        wrapperClassName="lg:col-span-2"
        className="min-h-28"
        error={errors.description?.message}
        {...register("description")}
      />

      <Controller
        control={control}
        name="mealCourse"
        render={({ field }) => (
          <Field data-invalid={Boolean(errors.mealCourse)}>
            <FieldLabel className="text-xs text-gray-7 font-normal">
              وعده غذایی
            </FieldLabel>
            <Select
              value={field.value || undefined}
              onValueChange={field.onChange}
            >
              <SelectTrigger aria-invalid={Boolean(errors.mealCourse)}>
                <SelectValue placeholder="انتخاب کنید" />
              </SelectTrigger>
              <SelectContent position="popper" side="bottom">
                {mealCourseCategories.map((category) => (
                  <SelectItem key={category._id} value={category.englishTitle}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.mealCourse?.message && (
              <FieldDescription aria-invalid>
                {errors.mealCourse.message}
              </FieldDescription>
            )}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="foodGroup"
        render={({ field }) => (
          <Field data-invalid={Boolean(errors.foodGroup)}>
            <FieldLabel className="text-xs text-gray-7 font-normal">
              گروه غذایی
            </FieldLabel>
            <Select
              value={field.value || undefined}
              onValueChange={field.onChange}
              disabled={!mealCourse}
            >
              <SelectTrigger aria-invalid={Boolean(errors.foodGroup)}>
                <SelectValue placeholder="انتخاب کنید" />
              </SelectTrigger>
              <SelectContent position="popper" side="bottom">
                {foodGroupCategories.map((category) => (
                  <SelectItem
                    key={category.englishTitle}
                    value={category.englishTitle}
                  >
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.foodGroup?.message && (
              <FieldDescription aria-invalid>
                {errors.foodGroup.message}
              </FieldDescription>
            )}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="slideCount"
        render={({ field }) => (
          <Field
            data-invalid={Boolean(errors.slideCount)}
            className="lg:col-span-2"
          >
            <FieldLabel className="text-xs text-gray-7 font-normal">
              تعداد تصاویر اسلاید
            </FieldLabel>
            <Select
              value={String(field.value)}
              onValueChange={(val) => field.onChange(Number(val))}
            >
              <SelectTrigger aria-invalid={Boolean(errors.slideCount)}>
                <SelectValue placeholder="انتخاب کنید" />
              </SelectTrigger>
              <SelectContent position="popper" side="bottom">
                {SLIDE_COUNT_OPTIONS.map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.slideCount?.message && (
              <FieldDescription aria-invalid>
                {errors.slideCount.message}
              </FieldDescription>
            )}
          </Field>
        )}
      />

      <div className="lg:col-span-2">
        <Controller
          control={control}
          name="images"
          render={({ field }) => (
            <Field data-invalid={Boolean(errors.images)}>
              <FieldLabel className="text-xs text-gray-7 font-normal">
                تصاویر محصول
              </FieldLabel>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {Array.from({ length: slideCount || 1 }).map((_, i) => (
                  <FileInput
                    key={i}
                    name={`images-${i}`}
                    label={`تصویر اسلاید ${i + 1}`}
                    accept="image/*"
                    placeholder={`تصویر اسلاید ${i + 1}`}
                    previewUrl={imagePreviews[i] ?? null}
                    onChange={(e) => onImageChange(i, e)}
                    onRemove={() => onImageRemove(i)}
                    errors={
                      errors.images?.[i]
                        ? { [`images-${i}`]: errors.images[i] }
                        : errors.images?.message &&
                            images?.[i] &&
                            typeof images[i] !== "string" &&
                            images[i].size > MAX_PRODUCT_IMAGE_SIZE
                          ? { [`images-${i}`]: { message: errors.images.message } as FieldError }
                          : undefined
                    }
                  />
                ))}
              </div>
            </Field>
          )}
        />
      </div>

      <TextField
        id="countInStock"
        label="موجودی"
        placeholder=" "
        dir="ltr"
        error={errors.countInStock?.message}
        {...register("countInStock")}
      />

      <TextField
        id="price"
        label="قیمت (تومان)"
        placeholder=" "
        dir="ltr"
        error={errors.price?.message}
        {...register("price")}
      />

      <TextField
        id="discount"
        label="تخفیف (%)"
        placeholder=" "
        dir="ltr"
        error={errors.discount?.message}
        {...register("discount")}
      />

      <Controller
        control={control}
        name="offPrice"
        render={({ field }) => (
          <TextField
            dir="ltr"
            id="offPrice"
            label="قیمت نهایی (تومان)"
            placeholder=" "
            readOnly
            disabled
            error={errors.offPrice?.message}
            {...field}
            value={Math.max(0, computedOffPrice).toLocaleString("fa-IR")}
          />
        )}
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
          {isEditing ? "ذخیره تغییرات" : "ایجاد محصول"}
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;
