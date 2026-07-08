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
import { Textarea } from "@/components/ui/textarea";
import { AddressFormValues } from "@/validations/address";

type AddressFormProps = {
  control: Control<AddressFormValues>;
  register: UseFormRegister<AddressFormValues>;
  errors: FieldErrors<AddressFormValues>;
  onSubmit: ComponentProps<"form">["onSubmit"];
  onCancel: () => void;
  isLoading: boolean;
  isValid: boolean;
};

const AddressForm = ({
  control,
  register,
  errors,
  onSubmit,
  onCancel,
  isLoading,
  isValid,
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
            label="نام و نام خانوادگی تحویل‌گیرنده"
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

      <div className="flex flex-col gap-1">
        <Textarea
          id="address"
          placeholder=" "
          className="min-h-32"
          aria-invalid={Boolean(errors.address?.message)}
          {...register("address")}
        />
        {errors.address?.message && (
          <span className="text-xs font-normal text-destructive">
            {errors.address.message}
          </span>
        )}
      </div>

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
          disabled={!isValid}
          className="flex-1"
        >
          ثبت آدرس
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;
