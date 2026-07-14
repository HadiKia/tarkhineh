"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { ADMIN_PRODUCTS_PATH } from "@/constants/products";
import { MAX_PRODUCT_IMAGE_SIZE } from "@/constants/upload";
import {
  productQueryKeys,
  useCreateProduct,
  useUpdateProduct,
} from "@/hooks/useProducts";
import { useGetCategories } from "@/hooks/useCategories";
import type { ApiError, Product } from "@/types";
import { CategoryType, ProductCategoryType } from "@/types";
import { isPersistedCategory } from "@/utils/category";
import { productSchema, type ProductFormValues } from "@/validations/product";
import ProductForm from "./ProductForm";

type ProductFormContainerProps = {
  product?: Product;
};

const ProductFormContainer = ({ product }: ProductFormContainerProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEditing = Boolean(product);

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct(product?._id ?? "");

  const { isPending } = isEditing ? updateMutation : createMutation;

  const { data: mealCourseData } = useGetCategories({
    type: CategoryType.PRODUCT,
    productType: ProductCategoryType.MEAL_COURSE,
  });

  const mealCourseCategories =
    mealCourseData?.categories.filter(isPersistedCategory) ?? [];

  const { data: allFoodGroupData } = useGetCategories(
    isEditing
      ? { type: CategoryType.PRODUCT, productType: ProductCategoryType.FOOD_GROUP }
      : undefined
  );

  const allFoodGroupCategories =
    allFoodGroupData?.categories.filter(isPersistedCategory) ?? [];

  const productFoodGroup = useMemo(() => {
    if (!product) return null;
    return allFoodGroupCategories.find(
      (c) => c._id === (product.category as any)?._id
    );
  }, [product, allFoodGroupCategories]);

  const initialMealCourse = useMemo(() => {
    if (!productFoodGroup || !("parentId" in productFoodGroup) || !productFoodGroup.parentId) return "";
    const parentMeal = mealCourseCategories.find(
      (c) => c._id === productFoodGroup.parentId
    );
    return parentMeal?.englishTitle ?? "";
  }, [productFoodGroup, mealCourseCategories]);

  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>(
    () => product?.imageUrls?.map((url) => url) ?? [null]
  );

  const defaultValues = product
    ? {
        title: product.title,
        slug: product.slug,
        description: product.description,
        mealCourse: initialMealCourse,
        foodGroup: product.category?.englishTitle ?? "",
        slideCount: product.imageUrls?.length ?? 1,
        images: product.imageUrls ?? [],
        price: String(product.price ?? ""),
        offPrice: String(product.offPrice ?? ""),
        discount: String(product.discount ?? ""),
        countInStock: String(product.countInStock ?? ""),
      }
    : {
        title: "",
        slug: "",
        description: "",
        mealCourse: "",
        foodGroup: "",
        slideCount: 1,
        images: [],
        price: "",
        offPrice: "",
        discount: "",
        countInStock: "",
      };

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<ProductFormValues>({
    resolver: yupResolver(productSchema),
    values: defaultValues,
    mode: "onChange",
  });

  const slideCount = watch("slideCount");
  const price = watch("price");
  const discount = watch("discount");
  const mealCourse = watch("mealCourse");

  const selectedMealCourseId = mealCourseCategories.find(
    (c) => c.englishTitle === mealCourse
  )?._id;

  const { data: foodGroupData } = useGetCategories(
    selectedMealCourseId
      ? {
          type: CategoryType.PRODUCT,
          productType: ProductCategoryType.FOOD_GROUP,
          parent: selectedMealCourseId,
        }
      : undefined
  );

  const foodGroupCategories =
    foodGroupData?.categories.filter(isPersistedCategory) ?? [];

  useEffect(() => {
    const priceNum = Number(price) || 0;
    const discountNum = Number(discount) || 0;
    const computed = priceNum - (priceNum * discountNum) / 100;
    setValue("offPrice", String(Math.max(0, computed)));
  }, [price, discount, setValue]);

  useEffect(() => {
    setImagePreviews((prev) => {
      const productImages = product?.imageUrls?.map((url) => url) ?? [];
      if (productImages.length > 0 && prev.length === 1 && prev[0] === null) {
        return productImages;
      }
      return prev;
    });
  }, [product?.imageUrls]);

  useEffect(() => {
    setImagePreviews((prev) => {
      if (slideCount > prev.length) {
        return [
          ...prev,
          ...Array.from({ length: slideCount - prev.length }, () => null),
        ];
      }
      if (slideCount < prev.length) {
        return prev.slice(0, slideCount);
      }
      return prev;
    });

    if (isEditing) {
      const images = watch("images") || [];
      if (images.length > slideCount) {
        setValue("images", images.slice(0, slideCount), { shouldValidate: true });
      }
    }
  }, [slideCount, isEditing, watch, setValue]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => {
        if (preview && preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, []);

  const handleCancel = () => {
    reset();
    router.push(ADMIN_PRODUCTS_PATH);
  };

  const handleImageChange = useCallback(
    (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const images = watch("images") || [];
      const newImages = [...images];
      newImages[index] = file;
      setValue("images", newImages, { shouldValidate: true, shouldDirty: true });

      if (file.size > MAX_PRODUCT_IMAGE_SIZE) {
        setImagePreviews((prev) => {
          const next = [...prev];
          next[index] = null;
          return next;
        });
        return;
      }

      setImagePreviews((prev) => {
        const next = [...prev];
        if (prev[index] && prev[index]?.startsWith("blob:")) {
          URL.revokeObjectURL(prev[index]!);
        }
        next[index] = URL.createObjectURL(file);
        return next;
      });
    },
    [watch, setValue]
  );

  const handleImageRemove = useCallback(
    (index: number) => {
      setImagePreviews((prev) => {
        const next = [...prev];
        if (prev[index] && prev[index]?.startsWith("blob:")) {
          URL.revokeObjectURL(prev[index]!);
        }
        next[index] = null;
        return next;
      });

      const images = watch("images") || [];
      const newImages = [...images];
      newImages.splice(index, 1);
      setValue("images", newImages, { shouldValidate: true, shouldDirty: true });
    },
    [watch, setValue]
  );

  const submitHandler: SubmitHandler<ProductFormValues> = async (formData) => {
    try {
      const selectedCategory = foodGroupCategories.find(
        (c) => c.englishTitle === formData.foodGroup
      );

      const payload = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        category: selectedCategory?._id ?? "",
        price: Number(formData.price) || 0,
        offPrice: Number(formData.offPrice) || 0,
        discount: Number(formData.discount) || 0,
        countInStock: Number(formData.countInStock) || 0,
        images: formData.images,
      };

      const response = isEditing
        ? await updateMutation.mutateAsync(payload)
        : await createMutation.mutateAsync(payload);

      toast.success(response.message);

      await queryClient.invalidateQueries({
        queryKey: productQueryKeys.all,
      });

      reset();
      router.push(ADMIN_PRODUCTS_PATH);
    } catch (error) {
      const err = error as ApiError;
      toast.error(
        err.response?.data?.message ??
          (isEditing
            ? "ویرایش محصول انجام نشد"
            : "ایجاد محصول انجام نشد")
      );
    }
  };

  const priceNum = Number(price) || 0;
  const discountNum = Number(discount) || 0;
  const computedOffPrice = priceNum - (priceNum * discountNum) / 100;
  const isSubmitDisabled = isEditing ? !isDirty || !isValid : !isValid;

  return (
    <ProductForm
      control={control}
      register={register}
      errors={errors}
      onSubmit={handleSubmit(submitHandler)}
      onCancel={handleCancel}
      isLoading={isPending}
      isSubmitDisabled={isSubmitDisabled}
      isEditing={isEditing}
      imagePreviews={imagePreviews}
      onImageChange={handleImageChange}
      onImageRemove={handleImageRemove}
      computedOffPrice={computedOffPrice}
    />
  );
};

export default ProductFormContainer;
