import { type FieldErrors, type UseFormRegister } from "react-hook-form";

import TextField from "@/components/common/TextField";
import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";
import { SendOTPFormValues } from "@/types";
import Link from "next/link";

type SendOTPFormProps = {
  register: UseFormRegister<SendOTPFormValues>;
  errors: FieldErrors<SendOTPFormValues>;
  onSubmit: ComponentProps<"form">["onSubmit"];
  isLoading: boolean;
  isValid: boolean;
};

const SendOTPForm = ({
  register,
  errors,
  onSubmit,
  isLoading,
  isValid,
}: SendOTPFormProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="font-bold text-gray-8 text-base mb-6 md:mb-2 md:font-normal">
        ورود/ثبت نام
      </h3>
      <p className="text-sm md:text-xs text-gray-7 mb-6 text-center">
        <span className="md:hidden">شماره همراه خود را وارد کنید.</span>
        <span className="hidden md:block">
          با وارد کردن شماره موبایل کد تاییدی برای شما ارسال خواهد شد.
        </span>
      </p>

      <form onSubmit={onSubmit} className="w-full">
        <TextField
          id="phoneNumber"
          type="tel"
          label="شماره همراه"
          placeholder="۰۹۱۲ ..."
          error={errors.phoneNumber?.message}
          {...register("phoneNumber")}
        />

        <Button
          type="submit"
          isLoading={isLoading}
          disabled={!isValid}
          className="mt-4 w-full mb-2 md:mb-6"
        >
          <span className="md:hidden">ورود</span>
          <span className="hidden md:block">ادامه</span>
        </Button>

        <p className="text-xs text-gray-8 text-center">
          ورود و عضویت در ترخینه به منزله قبول{" "}
          <Link href="#" className="text-primary">
            {" "}
            قوانین و مقررات{" "}
          </Link>
          است.
        </p>
      </form>
    </div>
  );
};

export default SendOTPForm;
