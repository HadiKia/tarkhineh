"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

import { sendOTPSchema, SendOTPFormValues } from "@/validations/auth";
import { getOTP } from "@/services/authService";
import { ApiError } from "@/types";
import SendOTPForm from "./SendOTPForm";

type SendOTPFormContainerProps = {
  setStep: Dispatch<SetStateAction<number>>;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  phoneNumber: string;
  onOTPSent: () => void;
};

export default function SendOTPFormContainer({
  setStep,
  setPhoneNumber,
  phoneNumber,
  onOTPSent
}: SendOTPFormContainerProps) {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: getOTP,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendOTPFormValues>({
    resolver: yupResolver(sendOTPSchema),
    defaultValues: { phoneNumber },
  });

  const sendOTPHandler: SubmitHandler<SendOTPFormValues> = async (formData) => {
    try {
      const data = await mutateAsync(formData);
      toast.success(data.message);
      setPhoneNumber(formData.phoneNumber);
      onOTPSent();
      setStep(2);
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
