"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { ADMIN_CATEGORIES_PATH } from "@/constants/categories";
import {
  categoryQueryKeys,
  useCreateCategory,
} from "@/hooks/useCategories";
import type { ApiError } from "@/types";
import { ProductCategoryType } from "@/types";
import {
  categorySchema,
  type CategoryFormValues,
  toCreateCategoryPayload,
} from "@/validations/category";
import CategoryForm from "./CategoryForm";

const CategoryFormContainer = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useCreateCategory();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CategoryFormValues>({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      title: "",
      englishTitle: "",
      productType: ProductCategoryType.MEAL_COURSE,
      parent: "",
      description: "",
    },
    mode: "onChange",
  });

  const handleCancel = () => {
    reset();
    router.push(ADMIN_CATEGORIES_PATH);
  };

  const submitHandler: SubmitHandler<CategoryFormValues> = async (formData) => {
    try {
      const { message } = await mutateAsync(toCreateCategoryPayload(formData));
      toast.success(message);
      await queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all });
      reset();
      router.push(ADMIN_CATEGORIES_PATH);
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.response?.data?.message ?? "ایجاد دسته‌بندی انجام نشد");
    }
  };

  return (
    <CategoryForm
      control={control}
      register={register}
      errors={errors}
      onSubmit={handleSubmit(submitHandler)}
      onCancel={handleCancel}
      isLoading={isPending}
      isSubmitDisabled={!isValid}
    />
  );
};

export default CategoryFormContainer;
