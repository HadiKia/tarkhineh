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
  useUpdateCategory,
} from "@/hooks/useCategories";
import type { ApiError, Category } from "@/types";
import { ProductCategoryType } from "@/types";
import {
  categorySchema,
  type CategoryFormValues,
  toCreateCategoryPayload,
} from "@/validations/category";
import CategoryForm from "./CategoryForm";

type CategoryFormContainerProps = {
  category?: Category;
};

const CategoryFormContainer = ({ category }: CategoryFormContainerProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const isEditing = Boolean(category);

  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory(category?._id ?? "");

  const { isPending } = isEditing ? updateMutation : createMutation;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<CategoryFormValues>({
    resolver: yupResolver(categorySchema),
    values: category
      ? {
          title: category.title,
          englishTitle: category.englishTitle,
          productType: category.productType as ProductCategoryType,
          parent: category.parentId ?? "",
          description: category.description,
        }
      : {
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
      const payload = toCreateCategoryPayload(formData);

      const response = isEditing
        ? await updateMutation.mutateAsync(payload)
        : await createMutation.mutateAsync(payload);

      toast.success(response.message);

      await queryClient.invalidateQueries({
        queryKey: categoryQueryKeys.all,
      });

      reset();

      router.push(ADMIN_CATEGORIES_PATH);
    } catch (error) {
      const err = error as ApiError;

      toast.error(
        err.response?.data?.message ??
          (isEditing
            ? "ویرایش دسته‌بندی انجام نشد"
            : "ایجاد دسته‌بندی انجام نشد"),
      );
    }
  };

  const isSubmitDisabled = isEditing ? !isDirty || !isValid : !isValid;

  return (
    <CategoryForm
      control={control}
      register={register}
      errors={errors}
      onSubmit={handleSubmit(submitHandler)}
      onCancel={handleCancel}
      isLoading={isPending}
      isSubmitDisabled={isSubmitDisabled}
      isEditing={isEditing}
    />
  );
};

export default CategoryFormContainer;
