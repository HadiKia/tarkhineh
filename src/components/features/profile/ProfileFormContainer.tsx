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

const ProfileFormContainer = () => {
  const queryClient = useQueryClient();
  const { data, isFetching } = useGetUser();
  const user = data?.user;

  const { isPending, mutateAsync } = useMutation({ mutationFn: updateProfile });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const {
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
    }
  }, [user, reset]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue("avatarUrl", file, { shouldValidate: true });
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleAvatarRemove = () => {
    setValue("avatarUrl", null, { shouldValidate: true });
    setAvatarPreview(null);
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
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <ProfileForm
      register={register}
      errors={errors}
      onSubmit={handleSubmit(submitHandler)}
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
