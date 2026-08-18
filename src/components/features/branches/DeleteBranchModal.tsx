"use client";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { branchQueryKeys, useDeleteBranch } from "@/hooks/useBranches";
import type { ApiError } from "@/types";

type DeleteBranchModalProps = {
  open: boolean;
  onClose: () => void;
  branchId: string;
};

const DeleteBranchModal = ({
  open,
  onClose,
  branchId,
}: DeleteBranchModalProps) => {
  const queryClient = useQueryClient();
  const deleteMutation = useDeleteBranch(branchId);

  const handleDelete = async () => {
    try {
      const response = await deleteMutation.mutateAsync();

      toast.success(response.message);
      await queryClient.invalidateQueries({ queryKey: branchQueryKeys.all });
      onClose();
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.response?.data?.message ?? "حذف شعبه انجام نشد");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>حذف شعبه</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-y-8 px-6 py-4 md:px-17.25 md:pt-8 md:pb-6">
          <p className="text-center text-xs text-gray-8 md:text-base">
            آیا از حذف این شعبه مطمئن هستید؟
          </p>

          <div className="flex items-center justify-between gap-4 md:gap-5">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={deleteMutation.isPending}
              className="flex-1"
            >
              انصراف
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              isLoading={deleteMutation.isPending}
              className="flex-1"
            >
              حذف
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBranchModal;
