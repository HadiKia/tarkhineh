"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddressFormContainer from "./AddressFormContainer";
import type { Address } from "@/types";

type AddressModalProps = {
  open: boolean;
  onClose: () => void;
  address?: Address;
};

const AddressModal = ({ open, onClose, address }: AddressModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="md:max-w-full md:md:w-150"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{address ? "ویرایش آدرس" : "ثبت آدرس"}</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <AddressFormContainer onClose={onClose} address={address} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
