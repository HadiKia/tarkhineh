"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteAddress } from "@/services/addressService";
import { ApiError } from "@/types";

type DeleteAddressModalProps = {
  open: boolean;
  onClose: () => void;
  addressId: string;
};

const DeleteAddressModal = ({
  open,
  onClose,
  addressId,
}: DeleteAddressModalProps) => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: () => deleteAddress(addressId),
  });

  const handleDelete = async () => {
    try {
      const { data } = await mutateAsync();
      toast.success(data.message);
      await queryClient.invalidateQueries({ queryKey: ["get-addresses"] });
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
          <DialogTitle>حذف آدرس</DialogTitle>
        </DialogHeader>
        <div className="px-6 md:px-17.25 py-4 md:pt-8 md:pb-6 flex flex-col gap-y-8">
          <p className="text-center text-xs text-gray-8 md:text-base">
            آیا از حدف آدرس مطمئن هستید؟
          </p>

          <div className="flex items-center justify-between gap-4 md:gap-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => onClose()}
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

export default DeleteAddressModal;
