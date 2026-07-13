import type { ComponentProps } from "react";
import type { Control, FieldErrors } from "react-hook-form";
import { Controller, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { CheckOTPFormValues } from "@/types";
import { ArrowRight, ArrowRight2, Clock } from "iconsax-reactjs";
import { formatTime } from "@/utils/timeFormatter";
import { toPersianDigits } from "@/utils/numberFormatter";

type CheckOTPFormProps = {
  control: Control<CheckOTPFormValues>;
  errors: FieldErrors<CheckOTPFormValues>;
  onSubmit: ComponentProps<"form">["onSubmit"];
  isLoading: boolean;
  isValid: boolean;
  onEditPhone: () => void;
  time: number;
  isTimerActive: boolean;
  onResend: () => void;
};

const CheckOTPForm = ({
  control,
  errors,
  onSubmit,
  isLoading,
  isValid,
  onEditPhone,
  time,
  isTimerActive,
  onResend,
}: CheckOTPFormProps) => {
  const phoneNumber = useWatch({ control, name: "phoneNumber" });
  const otpValue = useWatch({ control, name: "otp" });

  const hasOtpError = otpValue?.length === 6 && !!errors.otp;

  return (
    <div className="flex flex-col items-center w-full">
      <Button
        onClick={onEditPhone}
        variant="ghost"
        className="absolute top-4 inset-s-6 md:top-6 -mr-2 -mt-2 md:-mt-1.5 text-gray-7"
      >
        <ArrowRight2 className="w-5! h-5! md:w-6! md:h-6!" />
        <span className="sr-only">Close</span>
      </Button>
      <h3 className="font-bold text-gray-8 text-base mb-6 md:mb-2 md:font-normal">
        کد تائید
      </h3>
      <p className="text-sm md:text-xs text-gray-7 mb-6 text-center">
        کد تایید پنج‌رقمی به شماره {toPersianDigits(phoneNumber)} ارسال شد.
      </p>
      <form onSubmit={onSubmit} className="w-full">
        <Field dir="ltr" className="w-full font-sans!">
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <InputOTP
                id="otp"
                maxLength={6}
                value={field.value}
                onChange={field.onChange}
              >
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      aria-invalid={hasOtpError}
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          />
        </Field>

        <div className="flex items-center justify-between">
          {isTimerActive ? (
            <div className="flex items-center gap-0.5 text-xs lg:text-sm text-gray-7">
              <Clock size={16} />
              {formatTime(time)}
              <span>تا دریافت مجدد کد</span>
            </div>
          ) : (
            <Button
              type="button"
              variant="link"
              className="text-xs lg:text-sm"
              onClick={onResend}
            >
              دریافت مجدد کد
            </Button>
          )}

          <Button
            type="button"
            variant="link"
            onClick={onEditPhone}
            className="text-xs lg:text-sm"
          >
            ویرایش شماره
          </Button>
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          disabled={!isValid}
          className="mt-4 w-full"
        >
          <span className="md:hidden">تائید</span>
          <span className="hidden md:block">ثبت کد</span>
        </Button>
      </form>
    </div>
  );
};

export default CheckOTPForm;
