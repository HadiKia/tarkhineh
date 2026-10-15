"use client";

import type { ComponentProps } from "react";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import TextArea from "@/components/common/TextArea";
import TextField from "@/components/common/TextField";
import FileInput from "@/components/common/FileInput";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import type { BranchFormValues } from "@/validations/branch";

type BranchFormProps = {
  register: UseFormRegister<BranchFormValues>;
  errors: FieldErrors<BranchFormValues>;
  onSubmit: ComponentProps<"form">["onSubmit"];
  onCancel: () => void;
  isLoading: boolean;
  isSubmitDisabled: boolean;
  isEditing?: boolean;
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
};

const BranchForm = ({
  register,
  errors,
  onSubmit,
  onCancel,
  isLoading,
  isSubmitDisabled,
  isEditing = false,
  imagePreview,
  onImageChange,
  onImageRemove,
}: BranchFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex max-w-179.5 flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:py-8"
    >
      <TextField
        id="title"
        label="عنوان شعبه"
        placeholder=" "
        error={errors.title?.message}
        {...register("title")}
      />

      <TextField
        id="phoneNumber1"
        label="شماره تلفن ۱"
        type="tel"
        inputMode="tel"
        placeholder=" "
        dir="ltr"
        error={errors.phoneNumber1?.message}
        {...register("phoneNumber1")}
      />

      <TextField
        id="phoneNumber2"
        label="شماره تلفن ۲ (اختیاری)"
        type="tel"
        inputMode="tel"
        placeholder=" "
        dir="ltr"
        error={errors.phoneNumber2?.message}
        {...register("phoneNumber2")}
      />

      <TextField
        id="workingHours"
        label="ساعات کاری"
        placeholder=" "
        error={errors.workingHours?.message}
        {...register("workingHours")}
      />

      <TextArea
        id="address"
        label="آدرس"
        placeholder=" "
        wrapperClassName="lg:col-span-2"
        className="min-h-32"
        error={errors.address?.message}
        {...register("address")}
      />

      <Field data-invalid={Boolean(errors.image)} className="lg:col-span-2">
        <FieldLabel className="text-xs text-gray-7 font-normal">
          تصویر شعبه
        </FieldLabel>
        <FileInput
          name="image"
          label="تصویر شعبه"
          placeholder="تصویر شعبه را انتخاب کنید..."
          accept="image/*"
          isRequired
          previewUrl={imagePreview}
          onChange={onImageChange}
          onRemove={onImageRemove}
          errors={errors}
        />
      </Field>

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
          {isEditing ? "ذخیره تغییرات" : "ایجاد شعبه"}
        </Button>
      </div>
    </form>
  );
};

export default BranchForm;
