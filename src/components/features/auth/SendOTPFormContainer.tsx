"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { sendOTPSchema, SendOTPFormValues } from "@/validations/auth";
import { getOTP } from "@/services/authService";
import SendOTPForm from "./SendOTPForm";

type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export default function SendOTPFormContainer() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: getOTP,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendOTPFormValues>({
    resolver: yupResolver(sendOTPSchema),
    defaultValues: { phoneNumber: "" },
  });

  const sendOTPHandler: SubmitHandler<SendOTPFormValues> = async (formData) => {
    try {
      const data = await mutateAsync(formData);
      toast.success(data.message);
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <SendOTPForm
      register={register}
      errors={errors}
      onSubmit={handleSubmit(sendOTPHandler)}
      isLoading={isPending}
    />
  );
}
