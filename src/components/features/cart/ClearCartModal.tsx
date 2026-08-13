"use client";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useClearCart } from "@/hooks/useProducts";

type Props = { open: boolean; onClose: () => void };

export default function ClearCartModal({ open, onClose }: Props) {
  const queryClient = useQueryClient();
  const mutation = useClearCart();

  const handleClear = async () => {
    try {
      const { message } = await mutation.mutateAsync();
      toast.success(message);
      await queryClient.invalidateQueries({ queryKey: ["get-user"] });
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "سبد خرید خالی نشد");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent>
        <DialogHeader><DialogTitle>خالی کردن سبد خرید</DialogTitle></DialogHeader>
        <div className="flex flex-col gap-y-8 px-6 py-4 md:px-17.25 md:pt-8 md:pb-6">
          <p className="text-center text-xs text-gray-8 md:text-base">آیا از خالی کردن سبد خرید مطمئن هستید؟</p>
          <div className="flex items-center justify-between gap-4 md:gap-5">
            <Button variant="outline" onClick={onClose} disabled={mutation.isPending} className="flex-1">انصراف</Button>
            <Button variant="destructive" onClick={handleClear} isLoading={mutation.isPending} className="flex-1">حذف</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
