"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

import { checkOTPSchema } from "@/validations/auth";
import { CheckOTPFormValues } from "@/types";
import { checkOTP, getOTP } from "@/services/authService";
import { ApiError } from "@/types";
import CheckOTPForm from "./CheckOTPForm";
import { useRouter } from "next/navigation";

type CheckOTPFormContainerProps = {
  setStep: Dispatch<SetStateAction<number>>;
  phoneNumber: string;
  time: number;
  isTimerActive: boolean;
  onResend: () => void;
  onSuccess?: () => void;
};

export default function CheckOTPFormContainer({
  setStep,
  phoneNumber,
  time,
  isTimerActive,
  onResend,
  onSuccess,
}: CheckOTPFormContainerProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { isPending: isCheckPending, mutateAsync: checkOTPMutate } =
    useMutation({ mutationFn: checkOTP });

  const { isPending: isResendPending, mutateAsync: resendOTPMutate } =
    useMutation({ mutationFn: getOTP });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckOTPFormValues>({
    resolver: yupResolver(checkOTPSchema),
    defaultValues: { otp: "", phoneNumber },
  });

  const checkOTPHandler: SubmitHandler<CheckOTPFormValues> = async (
    formData,
  ) => {
    try {
      const { message, user } = await checkOTPMutate(formData);
      toast.success(message);
      await queryClient.invalidateQueries({ queryKey: ["get-user"] });
      onSuccess?.();
      if (user.isActive) {
        router.push("/");
      } else {
        router.push("/profile/complete-profile");
      }
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.response?.data?.message);
    }
  };

  const handleResend = async () => {
    try {
      const data = await resendOTPMutate({ phoneNumber });
      toast.success(data.message);
      reset({ otp: "", phoneNumber });
      onResend();
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <CheckOTPForm
      control={control}
      errors={errors}
      onSubmit={handleSubmit(checkOTPHandler)}
      isLoading={isCheckPending || isResendPending}
      onEditPhone={() => setStep(1)}
      time={time}
      isTimerActive={isTimerActive}
      onResend={handleResend}
    />
  );
}
