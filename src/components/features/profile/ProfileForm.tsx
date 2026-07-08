"use client";

import { type ChangeEvent } from "react";
import { type ComponentProps } from "react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";

import TextField from "@/components/common/TextField";
import FileInput from "@/components/common/FileInput";
import { Button } from "@/components/ui/button";
import { ProfileFormValues } from "@/validations/user";
import { formatPhone } from "@/utils/numberFormatter";
import { Edit } from "iconsax-reactjs";

type ProfileFormProps = {
  control: Control<ProfileFormValues>;
  register: UseFormRegister<ProfileFormValues>;
  errors: FieldErrors<ProfileFormValues>;
  onSubmit: ComponentProps<"form">["onSubmit"];
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  isLoading: boolean;
  isValid: boolean;
  isFetchingUser: boolean;
  avatarPreview: string | null;
  onAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAvatarRemove: () => void;
};

const ProfileForm = ({
  control,
  register,
  errors,
  onSubmit,
  isEditing,
  onEdit,
  onCancel,
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
      className="flex flex-col gap-4 lg:gap-6 lg:grid lg:grid-cols-2 max-w-179.5 mx-auto lg:py-8"
    >
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <TextField
            id="phoneNumber"
            label="شماره موبایل"
            placeholder=" "
            readOnly
            disabled
            error={errors.phoneNumber?.message}
            {...field}
            value={formatPhone(field.value ?? "")}
            loading={isFetchingUser}
          />
        )}
      />
      <TextField
        id="name"
        label="نام"
        placeholder=" "
        disabled={!isEditing}
        error={errors.name?.message}
        {...register("name")}
        loading={isFetchingUser}
      />
      <TextField
        id="email"
        type="email"
        label="ایمیل"
        placeholder=" "
        disabled={!isEditing}
        error={errors.email?.message}
        {...register("email")}
        loading={isFetchingUser}
      />
      <TextField
        id="biography"
        label="بیوگرافی (اختیاری)"
        placeholder=" "
        disabled={!isEditing}
        error={errors.biography?.message}
        {...register("biography")}
        loading={isFetchingUser}
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
        disabled={!isEditing}
        loading={isFetchingUser}
        wrapperClassName="lg:col-span-2"
      />

      {!isEditing ? (
        <Button
          type="button"
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            console.log("edit clicked");
            onEdit();
          }}
          isLoading={isFetchingUser}
          className="mx-auto lg:col-span-2 w-38.5 lg:w-69.5 "
        >
          <Edit />
          ویرایش اطلاعات شخصی
        </Button>
      ) : (
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
            disabled={!isValid || isFetchingUser}
            className="flex-1"
          >
            ذخیره اطلاعات
          </Button>
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
