"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { sendOTPSchema, SendOTPFormValues } from "@/validations/auth";
import SendOTPForm from "./SendOTPForm";

export default function SendOTPFormContainer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendOTPFormValues>({
    resolver: yupResolver(sendOTPSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const sendOTPHandler: SubmitHandler<SendOTPFormValues> = (data) => {
    console.log(data.phoneNumber);
  };

  return (
    <SendOTPForm
      register={register}
      errors={errors}
      onSubmit={handleSubmit(sendOTPHandler)}
    />
  );
}