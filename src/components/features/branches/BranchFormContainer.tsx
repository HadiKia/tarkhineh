"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { ADMIN_BRANCHES_PATH } from "@/constants/branches";
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

  const {
    register,
    handleSubmit,
    reset,
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
        }
      : {
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
    />
  );
};

export default BranchFormContainer;
