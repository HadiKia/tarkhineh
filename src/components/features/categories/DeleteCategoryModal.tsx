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

import { categoryQueryKeys, useDeleteCategory } from "@/hooks/useCategories";
import type { ApiError } from "@/types";

type DeleteCategoryModalProps = {
  open: boolean;
  onClose: () => void;
  categoryId: string;
};

const DeleteCategoryModal = ({
  open,
  onClose,
  categoryId,
}: DeleteCategoryModalProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useDeleteCategory(categoryId);

  const handleDelete = async () => {
    try {
      const { message } = await mutateAsync();

      toast.success(message);

      await queryClient.invalidateQueries({
        queryKey: categoryQueryKeys.all,
      });

      onClose();
    } catch (error) {
      const err = error as ApiError;

      toast.error(err.response?.data?.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>حذف دسته‌بندی</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-y-8 px-6 py-4 md:px-17.25 md:pt-8 md:pb-6">
          <p className="text-center text-xs text-gray-8 md:text-base">
            آیا از حذف این دسته‌بندی مطمئن هستید؟
          </p>

          <div className="flex items-center justify-between gap-4 md:gap-5">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              بازگشت
            </Button>

            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              isLoading={isPending}
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

export default DeleteCategoryModal;
