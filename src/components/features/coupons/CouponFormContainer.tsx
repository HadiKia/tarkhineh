"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { ADMIN_COUPONS_PATH } from "@/constants/coupons";
import { useCreateCoupon, couponQueryKeys } from "@/hooks/useCoupons";
import { useGetCategories } from "@/hooks/useCategories";
import type { ApiError, Category } from "@/types";
import { CategoryType, ProductCategoryType } from "@/types";
import { isPersistedCategory } from "@/utils/category";
import { couponSchema, type CouponFormValues } from "@/validations/coupon";
import CouponForm from "./CouponForm";

export default function CouponFormContainer() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const createMutation = useCreateCoupon();
  const { data: categoryData } = useGetCategories({ type: CategoryType.PRODUCT });

  const categories = (categoryData?.categories.filter(isPersistedCategory) ?? []).filter(
    (category): category is Category =>
      category.productType === ProductCategoryType.MEAL_COURSE ||
      category.productType === ProductCategoryType.FOOD_GROUP,
  );

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CouponFormValues>({
    resolver: yupResolver(couponSchema),
    defaultValues: {
      code: "",
      type: "percent",
      amount: 1,
      usageLimit: 1,
      categoryIds: [],
      expireDate: "",
    },
    mode: "onChange",
  });

  const handleCancel = () => {
    reset();
    router.push(ADMIN_COUPONS_PATH);
  };

  const submitHandler: SubmitHandler<CouponFormValues> = async (formData) => {
    try {
      const response = await createMutation.mutateAsync(formData);
      toast.success(response.message);
      await queryClient.invalidateQueries({ queryKey: couponQueryKeys.all });
      reset();
      router.push(ADMIN_COUPONS_PATH);
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.response?.data?.message ?? "ایجاد کد تخفیف انجام نشد");
    }
  };

  return (
    <CouponForm
      control={control}
      register={register}
      errors={errors}
      categories={categories}
      onSubmit={handleSubmit(submitHandler)}
      onCancel={handleCancel}
      isLoading={createMutation.isPending}
      isSubmitDisabled={!isValid}
    />
  );
}
