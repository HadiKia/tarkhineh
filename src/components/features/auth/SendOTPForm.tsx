import type { FieldErrors, UseFormRegister } from "react-hook-form";

import TextField from "@/components/common/TextField";
import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";
import { SendOTPFormValues } from "@/types";

type SendOTPFormProps = {
  register: UseFormRegister<SendOTPFormValues>;
  errors: FieldErrors<SendOTPFormValues>;
  onSubmit: ComponentProps<"form">["onSubmit"];
  isLoading: boolean;
};

const SendOTPForm = ({
  register,
  errors,
  onSubmit,
  isLoading,
}: SendOTPFormProps) => {
  return (
    <div className="pt-10">
      <form onSubmit={onSubmit}>
        <TextField
          id="phoneNumber"
          type="tel"
          label="شماره همراه"
          placeholder="0912..."
          error={errors.phoneNumber?.message}
          {...register("phoneNumber")}
        />

        <Button type="submit" isLoading={isLoading}>
          ورود
        </Button>
      </form>
    </div>
  );
};

export default SendOTPForm;
