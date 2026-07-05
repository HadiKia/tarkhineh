"use client";

import { type ChangeEvent } from "react";
import { type ComponentProps } from "react";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";

import TextField from "@/components/common/TextField";
import FileInput from "@/components/common/FileInput";
import { Button } from "@/components/ui/button";
import { ProfileFormValues } from "@/validations/user";
import { Edit } from "iconsax-reactjs";

type ProfileFormProps = {
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
        disabled={!isEditing}
        error={errors.name?.message}
        {...register("name")}
      />
      <TextField
        id="email"
        type="email"
        label="ایمیل"
        placeholder=" "
        disabled={!isEditing}
        error={errors.email?.message}
        {...register("email")}
      />
      <TextField
        id="biography"
        label="بیوگرافی (اختیاری)"
        placeholder=" "
        disabled={!isEditing}
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
        disabled={!isEditing}
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
          className="mx-auto lg:col-span-2 lg:w-69.5"
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
