"use client";

import { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { ADMIN_BRANCHES_PATH } from "@/constants/branches";
import { MAX_PRODUCT_IMAGE_SIZE } from "@/constants/upload";
import {
  branchQueryKeys,
  useCreateBranch,
  useUpdateBranch,
} from "@/hooks/useBranches";
import type { ApiError, Branch } from "@/types";
import {
  branchSchema,
  toCreateBranchPayload,
  type BranchFormValues,
} from "@/validations/branch";
import BranchForm from "./BranchForm";

type BranchFormContainerProps = {
  branch?: Branch;
};

const BranchFormContainer = ({ branch }: BranchFormContainerProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEditing = Boolean(branch);
  const createMutation = useCreateBranch();
  const updateMutation = useUpdateBranch(branch?._id ?? "");
  const { isPending } = isEditing ? updateMutation : createMutation;

  const serverImage = branch?.imageUrl ?? null;
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
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<BranchFormValues>({
    resolver: yupResolver(branchSchema),
    values: branch
      ? {
          title: branch.title,
          phoneNumber1: branch.phoneNumber1,
          phoneNumber2: branch.phoneNumber2 ?? "",
          address: branch.address,
          workingHours: branch.workingHours,
          image: branch.imageUrl,
        }
      : {
          title: "",
          phoneNumber1: "",
          phoneNumber2: "",
          address: "",
          workingHours: "",
          image: null,
        },
    mode: "onChange",
  });

  const handleCancel = () => {
    reset();
    router.push(ADMIN_BRANCHES_PATH);
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

  const submitHandler: SubmitHandler<BranchFormValues> = async (formData) => {
    try {
      const payload = toCreateBranchPayload(formData);
      const response = isEditing
        ? await updateMutation.mutateAsync(payload)
        : await createMutation.mutateAsync(payload);

      toast.success(response.message);
      await queryClient.invalidateQueries({ queryKey: branchQueryKeys.all });

      reset();
      router.push(ADMIN_BRANCHES_PATH);
    } catch (error) {
      const err = error as ApiError;
      toast.error(
        err.response?.data?.message ??
          (isEditing ? "ویرایش شعبه انجام نشد" : "ایجاد شعبه انجام نشد"),
      );
    }
  };

  const isSubmitDisabled = isEditing ? !isDirty || !isValid : !isValid;

  return (
    <BranchForm
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

export default BranchFormContainer;
