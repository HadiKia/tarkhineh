"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { ADMIN_BRANCHES_PATH } from "@/constants/branches";
import { branchQueryKeys, useCreateBranch } from "@/hooks/useBranches";
import type { ApiError } from "@/types";
import {
  branchSchema,
  toCreateBranchPayload,
  type BranchFormValues,
} from "@/validations/branch";
import BranchForm from "./BranchForm";

const BranchFormContainer = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const createMutation = useCreateBranch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<BranchFormValues>({
    resolver: yupResolver(branchSchema),
    defaultValues: {
      title: "",
      phoneNumber1: "",
      phoneNumber2: "",
      address: "",
      workingHours: "",
    },
    mode: "onChange",
  });

  const handleCancel = () => {
    reset();
    router.push(ADMIN_BRANCHES_PATH);
  };

  const submitHandler: SubmitHandler<BranchFormValues> = async (formData) => {
    try {
      const response = await createMutation.mutateAsync(
        toCreateBranchPayload(formData),
      );

      toast.success(response.message);
      await queryClient.invalidateQueries({ queryKey: branchQueryKeys.all });

      reset();
      router.push(ADMIN_BRANCHES_PATH);
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.response?.data?.message ?? "ایجاد شعبه انجام نشد");
    }
  };

  return (
    <BranchForm
      register={register}
      errors={errors}
      onSubmit={handleSubmit(submitHandler)}
      onCancel={handleCancel}
      isLoading={createMutation.isPending}
      isSubmitDisabled={!isValid}
    />
  );
};

export default BranchFormContainer;
