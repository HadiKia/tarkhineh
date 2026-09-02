"use client";

import type { ComponentProps } from "react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { DateLib, type Locale as DayPickerLocale } from "react-day-picker";
import * as jalaliDateFns from "date-fns-jalali";
import { faIR as jalaliFaIR } from "date-fns-jalali/locale";

import TextField from "@/components/common/TextField";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { couponTypeLabels } from "@/constants/coupons";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";
import type { CouponFormValues } from "@/validations/coupon";
import { toPersianDigits } from "@/utils/numberFormatter";

const jalaliLocale = jalaliFaIR as unknown as DayPickerLocale;

const formatPersianDate = (value: string) =>
  new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));

const jalaliDateLib = new DateLib(
  { locale: jalaliLocale, weekStartsOn: 6 },
  jalaliDateFns as unknown as Partial<typeof DateLib.prototype>,
);

type CouponFormProps = {
  control: Control<CouponFormValues>;
  register: UseFormRegister<CouponFormValues>;
  errors: FieldErrors<CouponFormValues>;
  categories: Category[];
  onSubmit: ComponentProps<"form">["onSubmit"];
  onCancel: () => void;
  isLoading: boolean;
  isSubmitDisabled: boolean;
};

export default function CouponForm({
  control,
  register,
  errors,
  categories,
  onSubmit,
  onCancel,
  isLoading,
  isSubmitDisabled,
}: CouponFormProps) {
  const categoryComboboxAnchor = useComboboxAnchor();

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex max-w-179.5 flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:py-8"
    >
      <TextField
        id="code"
        label="کد تخفیف"
        placeholder=" "
        dir="ltr"
        error={errors.code?.message}
        {...register("code")}
      />

      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <Field data-invalid={Boolean(errors.type)}>
            <FieldLabel className="text-xs font-normal text-gray-7">
              نوع کد تخفیف
            </FieldLabel>
            <div className="flex items-center gap-4">
              {(
                Object.entries(couponTypeLabels) as [
                  CouponFormValues["type"],
                  string,
                ][]
              ).map(([value, label]) => {
                const isSelected = field.value === value;

                return (
                  <label
                    key={value}
                    className="flex cursor-pointer items-center gap-1 text-xs text-gray-8 lg:text-sm"
                  >
                    <input
                      type="radio"
                      value={value}
                      checked={isSelected}
                      onChange={() => field.onChange(value)}
                      className="sr-only"
                    />

                    {isSelected ? (
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                      >
                        <circle cx="8" cy="8" r="7.5" stroke="#cbcbcb" />
                        <circle cx="8" cy="8" r="6" fill="#00ba88" />
                      </svg>
                    ) : (
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                      >
                        <circle cx="8" cy="8" r="7.5" stroke="#cbcbcb" />
                      </svg>
                    )}

                    {label}
                  </label>
                );
              })}
            </div>
            {errors.type?.message && (
              <FieldDescription aria-invalid>
                {errors.type.message}
              </FieldDescription>
            )}
          </Field>
        )}
      />

      <TextField
        id="amount"
        label="مقدار تخفیف"
        placeholder=" "
        type="number"
        inputMode="numeric"
        dir="ltr"
        error={errors.amount?.message}
        {...register("amount", { valueAsNumber: true })}
      />

      <TextField
        id="usageLimit"
        label="ظرفیت کد تخفیف"
        placeholder=" "
        type="number"
        inputMode="numeric"
        dir="ltr"
        error={errors.usageLimit?.message}
        {...register("usageLimit", { valueAsNumber: true })}
      />

      <Controller
        control={control}
        name="expireDate"
        render={({ field }) => (
          <Field data-invalid={Boolean(errors.expireDate)}>
            <FieldLabel
              htmlFor="expireDate"
              className="text-xs font-normal text-gray-7"
            >
              تاریخ انقضا
            </FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="expireDate"
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-start rounded-sm px-4 py-1.75 text-xs font-normal text-gray-8 lg:rounded-lg lg:text-base",
                    !field.value && "text-gray-6",
                    errors.expireDate && "border-destructive",
                  )}
                  aria-invalid={Boolean(errors.expireDate)}
                >
                  {field.value
                    ? formatPersianDate(field.value)
                    : "تاریخ را انتخاب کنید"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) =>
                    field.onChange(date ? date.toISOString() : "")
                  }
                  disabled={{ before: new Date() }}
                  locale={jalaliLocale}
                  dateLib={jalaliDateLib}
                  numerals="arabext"
                  formatters={{
                    formatCaption: (date) =>
                      toPersianDigits(
                        jalaliDateFns.format(date, "MMMM yyyy", {
                          locale: jalaliFaIR,
                        }),
                      ),
                    formatDay: (date) =>
                      toPersianDigits(jalaliDateFns.format(date, "d")),
                    formatMonthDropdown: (date) =>
                      toPersianDigits(
                        jalaliDateFns.format(date, "MMMM yyyy", {
                          locale: jalaliFaIR,
                        }),
                      ),
                    formatYearDropdown: (date) =>
                      toPersianDigits(jalaliDateFns.format(date, "yyyy")),
                    formatWeekNumber: (weekNumber) =>
                      toPersianDigits(weekNumber),
                  }}
                  dir="rtl"
                />
              </PopoverContent>
            </Popover>
            {errors.expireDate?.message && (
              <FieldDescription aria-invalid>
                {errors.expireDate.message}
              </FieldDescription>
            )}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="categoryIds"
        render={({ field }) => {
          const selectedIds = field.value ?? [];

          return (
            <Field
              data-invalid={Boolean(errors.categoryIds)}
              className="lg:col-span-2"
            >
              <FieldLabel className="text-xs font-normal text-gray-7">
                دسته‌بندی‌های مشمول
              </FieldLabel>
              <Combobox<Category, true>
                multiple
                autoHighlight
                items={categories}
                value={categories.filter((category) =>
                  selectedIds.includes(category._id),
                )}
                onValueChange={(value) =>
                  field.onChange(value.map((category) => category._id))
                }
                itemToStringLabel={(category) => category.title}
                itemToStringValue={(category) => category._id}
              >
                <ComboboxChips
                  ref={categoryComboboxAnchor}
                  aria-invalid={Boolean(errors.categoryIds)}
                  className={cn(
                    "w-full",
                    errors.categoryIds && "border-destructive",
                  )}
                >
                  <ComboboxValue>
                    {(values: Category[]) => (
                      <>
                        {values.map((category) => (
                          <ComboboxChip key={category._id}>
                            {category.title}
                          </ComboboxChip>
                        ))}
                        <ComboboxChipsInput placeholder="انتخاب دسته‌بندی" />
                      </>
                    )}
                  </ComboboxValue>
                </ComboboxChips>
                <ComboboxContent anchor={categoryComboboxAnchor}>
                  <ComboboxEmpty>دسته‌بندی‌ای پیدا نشد</ComboboxEmpty>
                  <ComboboxList>
                    {categories.map((category) => (
                      <ComboboxItem key={category._id} value={category}>
                        {category.title}
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              {errors.categoryIds?.message && (
                <FieldDescription aria-invalid>
                  {errors.categoryIds.message}
                </FieldDescription>
              )}
            </Field>
          );
        }}
      />

      <div className="flex w-full items-center justify-between gap-4 lg:col-start-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          انصراف
        </Button>
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={isSubmitDisabled}
          className="flex-1"
        >
          ایجاد کد تخفیف
        </Button>
      </div>
    </form>
  );
}
