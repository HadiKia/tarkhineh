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
import { Clock } from "iconsax-reactjs";
import { formatTime } from "@/utils/timeFormatter";

type CheckOTPFormProps = {
  control: Control<CheckOTPFormValues>;
  errors: FieldErrors<CheckOTPFormValues>;
  onSubmit: ComponentProps<"form">["onSubmit"];
  isLoading: boolean;
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
  onEditPhone,
  time,
  isTimerActive,
  onResend,
}: CheckOTPFormProps) => {
  const otpValue = useWatch({ control, name: "otp" });
  const isOtpComplete = otpValue?.length === 6;
  const hasOtpError = !!errors.otp && !!otpValue;
  const phoneNumber = useWatch({ control, name: "phoneNumber" });

  return (
    <div className="p-4 grid place-items-center max-w-lg mx-auto">
      <p>کد ارسال شده به {phoneNumber} را وارد کنید</p>
      <form onSubmit={onSubmit}>
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
          disabled={!isOtpComplete}
          className="w-full"
        >
          ثبت کد
        </Button>
      </form>
    </div>
  );
};

export default CheckOTPForm;
