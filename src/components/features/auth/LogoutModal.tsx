"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { logout } from "@/services/authService";
import Image from "next/image";

type LogoutModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function LogoutModal({ open, onClose }: LogoutModalProps) {
  const handleClose = () => {
    onClose();
  };

  const logoutHandler = async () => {
    await logout();
    // localStorage.removeItem("userInfo");
    // localStorage.removeItem("cartItems");
    // localStorage.removeItem("token");
    document.location.href = "/";
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>خروج</DialogTitle>
        </DialogHeader>
        <div className="px-6 md:px-17.25 py-4 md:pt-8 md:pb-6 flex flex-col gap-y-8">
          <p className="text-center text-xs text-gray-8 md:text-base">
            آیا مایل به خروج از حساب کاربری خود هستید؟
          </p>

          <div className="flex items-center justify-between gap-4 md:gap-5">
            <Button
              type="button"
              variant="default"
              onClick={() => onClose()}
              className="flex-1"
            >
              بازگشت
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={logoutHandler}
              className="flex-1"
            >
              خروج
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
