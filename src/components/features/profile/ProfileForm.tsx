"use client";

import { type ChangeEvent } from "react";
import { type ComponentProps } from "react";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";

import TextField from "@/components/common/TextField";
import FileInput from "@/components/common/FileInput";
import { Button } from "@/components/ui/button";
import { ProfileFormValues } from "@/validations/user";

type ProfileFormProps = {
  register: UseFormRegister<ProfileFormValues>;
  errors: FieldErrors<ProfileFormValues>;
  onSubmit: ComponentProps<"form">["onSubmit"];
  isLoading: boolean;
  isValid: boolean;
  isFetchingUser: boolean;
  avatarPreview: string | null;
  onAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAvatarRemove: () => void;
};

const ProfileForm = ({
  register,
  errors,
  onSubmit,
  isLoading,
  isValid,
  isFetchingUser,
  avatarPreview,
  onAvatarChange,
  onAvatarRemove,
}: ProfileFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 lg:gap-6 lg:grid lg:grid-cols-2 max-w-179.5 mx-auto lg:pt-8"
    >
      <TextField
        id="phoneNumber"
        label="شماره موبایل"
        placeholder=" "
        readOnly
        disabled
        error={errors.phoneNumber?.message}
        {...register("phoneNumber")}
      />
      <TextField
        id="name"
        label="نام"
        placeholder=" "
        error={errors.name?.message}
        {...register("name")}
      />
      <TextField
        id="email"
        type="email"
        label="ایمیل"
        placeholder=" "
        error={errors.email?.message}
        {...register("email")}
      />
      <TextField
        id="biography"
        label="بیوگرافی (اختیاری)"
        placeholder=" "
        error={errors.biography?.message}
        {...register("biography")}
      />

      <FileInput
        name="avatarUrl"
        label="آواتار"
        placeholder="تصویر پروفایل خود را انتخاب کنید..."
        accept="image/*"
        previewUrl={avatarPreview}
        onChange={onAvatarChange}
        onRemove={onAvatarRemove}
        errors={errors}
        wrapperClassName="lg:col-span-2"
      />

      <Button
        type="submit"
        isLoading={isLoading}
        disabled={!isValid || isFetchingUser}
        className="w-full lg:col-start-2 mt-4 lg:mt-0"
      >
        ذخیره اطلاعات
      </Button>
    </form>
  );
};

export default ProfileForm;
