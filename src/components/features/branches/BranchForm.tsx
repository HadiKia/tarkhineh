"use client";

import type { ComponentProps } from "react";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import TextArea from "@/components/common/TextArea";
import TextField from "@/components/common/TextField";
import { Button } from "@/components/ui/button";
import type { BranchFormValues } from "@/validations/branch";

type BranchFormProps = {
  register: UseFormRegister<BranchFormValues>;
  errors: FieldErrors<BranchFormValues>;
  onSubmit: ComponentProps<"form">["onSubmit"];
  onCancel: () => void;
  isLoading: boolean;
  isSubmitDisabled: boolean;
  isEditing?: boolean;
};

const BranchForm = ({
  register,
  errors,
  onSubmit,
  onCancel,
  isLoading,
  isSubmitDisabled,
  isEditing = false,
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
