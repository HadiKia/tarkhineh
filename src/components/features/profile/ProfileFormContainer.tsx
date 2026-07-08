"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import { useGetUser } from "@/hooks/useAuth";
import { updateProfile } from "@/services/authService";
import { profileSchema, ProfileFormValues } from "@/validations/user";
import { ApiError, UpdateProfilePayload } from "@/types";
import ProfileForm from "./ProfileForm";
import { MAX_AVATAR_FILE_SIZE } from "@/constants/upload";

const ProfileFormContainer = () => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const { data, isFetching } = useGetUser();
  const user = data?.user;

  const { isPending, mutateAsync } = useMutation({ mutationFn: updateProfile });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      phoneNumber: "",
      name: "",
      email: "",
      biography: "",
      avatarUrl: null,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      reset({
        phoneNumber: user.phoneNumber ?? "",
        name: user.name ?? "",
        email: user.email ?? "",
        biography: user.biography ?? "",
        avatarUrl: user.avatarUrl ?? null,
      });
      setAvatarPreview(user.avatarUrl ?? null);
      setIsEditing(false);
    }
  }, [user, reset]);

  useEffect(() => {
    return () => {
      if (avatarPreview && avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (user) {
      reset({
        phoneNumber: user.phoneNumber ?? "",
        name: user.name ?? "",
        email: user.email ?? "",
        biography: user.biography ?? "",
        avatarUrl: user.avatarUrl ?? null,
      });

      setAvatarPreview(user.avatarUrl ?? null);
    }

    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setValue("avatarUrl", file, {
      shouldValidate: true,
    });

    if (file.size > MAX_AVATAR_FILE_SIZE) {
      setAvatarPreview(null);

      return;
    }

    setAvatarPreview((previousPreview) => {
      if (previousPreview && previousPreview.startsWith("blob:")) {
        URL.revokeObjectURL(previousPreview);
      }

      return URL.createObjectURL(file);
    });
  };

  const handleAvatarRemove = () => {
    setAvatarPreview((previousPreview) => {
      if (previousPreview && previousPreview.startsWith("blob:")) {
        URL.revokeObjectURL(previousPreview);
      }

      return null;
    });

    setValue("avatarUrl", null, {
      shouldValidate: true,
    });
  };

  const submitHandler: SubmitHandler<ProfileFormValues> = async (formData) => {
    try {
      const payload: UpdateProfilePayload = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        biography: formData.biography,
        avatarUrl: formData.avatarUrl,
      };
      const { data } = await mutateAsync(payload);
      toast.success(data.message);
      await queryClient.invalidateQueries({ queryKey: ["get-user"] });
      setIsEditing(false);
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <ProfileForm
      control={control}
      register={register}
      errors={errors}
      onSubmit={handleSubmit(submitHandler)}
      isEditing={isEditing}
      onEdit={handleEdit}
      onCancel={handleCancel}
      isLoading={isPending}
      isValid={isValid}
      isFetchingUser={isFetching}
      avatarPreview={avatarPreview}
      onAvatarChange={handleAvatarChange}
      onAvatarRemove={handleAvatarRemove}
    />
  );
};

export default ProfileFormContainer;
