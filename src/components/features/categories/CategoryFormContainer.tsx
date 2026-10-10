"use client";

import { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { ADMIN_CATEGORIES_PATH } from "@/constants/categories";
import { MAX_PRODUCT_IMAGE_SIZE } from "@/constants/upload";
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

  const serverImage = category?.imageUrl ?? null;
  const [preview, setPreview] = useState<{
    url: string | null;
    base: string | null;
  }>({ url: serverImage, base: serverImage });

  if (preview.base !== serverImage) {
    setPreview({
      url:
        preview.url && preview.url.startsWith("blob:")
          ? preview.url
          : serverImage,
      base: serverImage,
    });
  }
  const imagePreview = preview.url;
  const createdBlobUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    const createdBlobUrls = createdBlobUrlsRef.current;
    return () => {
      createdBlobUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
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
          image: category.imageUrl,
        }
      : {
          title: "",
          englishTitle: "",
          productType: ProductCategoryType.MEAL_COURSE,
          parent: "",
          description: "",
          image: null,
        },
    mode: "onChange",
  });

  const handleCancel = () => {
    reset();

    router.push(ADMIN_CATEGORIES_PATH);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setValue("image", file, {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (file.size > MAX_PRODUCT_IMAGE_SIZE) {
      setPreview((previousPreview) => ({
        ...previousPreview,
        url: null,
      }));

      return;
    }

    const url = URL.createObjectURL(file);
    createdBlobUrlsRef.current.push(url);

    setPreview((previousPreview) => {
      if (previousPreview.url && previousPreview.url.startsWith("blob:")) {
        URL.revokeObjectURL(previousPreview.url);
      }

      return { ...previousPreview, url };
    });
  };

  const handleImageRemove = () => {
    setPreview((previousPreview) => {
      if (previousPreview.url && previousPreview.url.startsWith("blob:")) {
        URL.revokeObjectURL(previousPreview.url);
      }

      return { ...previousPreview, url: null };
    });

    setValue("image", null, {
      shouldValidate: true,
      shouldDirty: true,
    });
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
      imagePreview={imagePreview}
      onImageChange={handleImageChange}
      onImageRemove={handleImageRemove}
    />
  );
};

export default CategoryFormContainer;
