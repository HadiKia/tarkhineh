"use client";

import { useEffect, useState } from "react";
import TextField from "@/components/common/TextField";
import { Button } from "@/components/ui/button";
import { useGetUser } from "@/hooks/useAuth";
import { useAddCouponToCart } from "@/hooks/useCart";
import { isAxiosError } from "axios";
import { DiscountShape, Trash } from "iconsax-reactjs";

export default function CartDiscountCode() {
  const { data } = useGetUser();
  const { mutate, isPending } = useAddCouponToCart();

  const appliedCode = data?.cart?.coupon?.code ?? "";

  const [couponCode, setCouponCode] = useState(appliedCode);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (appliedCode) {
      queueMicrotask(() => setCouponCode(appliedCode));
    }
  }, [appliedCode]);

  const isEmpty = couponCode.trim().length === 0;

  const handleSubmit = () => {
    const code = couponCode.trim();
    if (!code) return;

    setError(undefined);
    mutate(code, {
      onError: (err) => {
        let message = "خطا در اعمال کد تخفیف";
        if (isAxiosError(err)) {
          const data = err.response?.data as { message?: string } | undefined;
          if (data?.message) message = data.message;
        } else if (err instanceof Error && err.message) {
          message = err.message;
        }
        setError(message);
      },
      onSuccess: () => {
        setError(undefined);
      },
    });
  };

  return (
    <div className="rounded-lg border border-gray-4 p-4 lg:px-6 lg:py-8 flex flex-col gap-2 lg:flex-row lg:items-stretch lg:justify-center lg:gap-10">
      <h3 className="flex items-center gap-1 pb-2 border-b border-gray-4 mb-2 lg:border-none lg:pb-0 lg:mb-0 text-sm lg:text-base text-gray-8">
        <DiscountShape className="size-4 lg:size-6" />
        ثبت کد تخفیف
      </h3>

      <div className="flex items-start gap-4">
        <TextField
          id="coupon"
          label=""
          placeholder="کد تخفیف"
          className="lg:w-80"
          value={couponCode}
          onChange={(e) => {
            setCouponCode(e.target.value);
            if (error) setError(undefined);
          }}
          error={error}
        />
        <Button
          className="lg:w-25"
          disabled={isEmpty}
          isLoading={isPending}
          onClick={handleSubmit}
        >
          ثبت کد
        </Button>
      </div>
    </div>
  );
}
