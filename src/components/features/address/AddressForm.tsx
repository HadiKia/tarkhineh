"use client";

import { type ComponentProps } from "react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  useWatch,
} from "react-hook-form";

import TextField from "@/components/common/TextField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AddressFormValues } from "@/validations/address";
import TextArea from "@/components/common/TextArea";

type AddressFormProps = {
  control: Control<AddressFormValues>;
  register: UseFormRegister<AddressFormValues>;
  errors: FieldErrors<AddressFormValues>;
  onSubmit: ComponentProps<"form">["onSubmit"];
  onCancel: () => void;
  isLoading: boolean;
  isSubmitDisabled: boolean;
  isEditing?: boolean;
};

const AddressForm = ({
  control,
  register,
  errors,
  onSubmit,
  onCancel,
  isLoading,
  isSubmitDisabled,
  isEditing = false,
}: AddressFormProps) => {
  const isSelfReceiver = useWatch({ control, name: "isSelfReceiver" });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 md:gap-4">
      <TextField
        id="title"
        label="عنوان آدرس"
        placeholder=" "
        error={errors.title?.message}
        {...register("title")}
      />

      <Controller
        control={control}
        name="isSelfReceiver"
        render={({ field: { value, onChange } }) => (
          <label className="flex cursor-pointer items-center gap-1 text-gray-8 text-xs lg:text-sm">
            <Checkbox
              id="isSelfReceiver"
              checked={value}
              onCheckedChange={onChange}
            />
            تحویل‌گیرنده خودم هستم
          </label>
        )}
      />

      {isSelfReceiver ? (
        <TextField
          id="phoneNumber"
          label="شماره همراه"
          placeholder=" "
          error={errors.phoneNumber?.message}
          {...register("phoneNumber")}
        />
      ) : (
        <>
          <TextField
            id="receiverName"
            label="نام و نام‌خانوادگی تحویل گیرنده"
            placeholder=" "
            error={errors.receiverName?.message}
            {...register("receiverName")}
          />
          <TextField
            id="receiverPhoneNumber"
            label="شماره همراه تحویل‌گیرنده"
            placeholder=" "
            error={errors.receiverPhoneNumber?.message}
            {...register("receiverPhoneNumber")}
          />
        </>
      )}

      <TextArea
        id="address"
        label="آدرس دقیق شما"
        placeholder=" "
        className="min-h-32 lg:min-h-40"
        error={errors.address?.message}
        {...register("address")}
      />

      <div className="flex w-full items-center justify-between gap-4 mt-3 md:mt-0">
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
          {isEditing ? "ذخیره تغییرات" : "ثبت آدرس"}
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;
