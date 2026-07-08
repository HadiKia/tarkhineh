"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddressFormContainer from "./AddressFormContainer";

type AddressModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddressModal = ({ open, onClose }: AddressModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="md:max-w-full md:md:w-150 ">
        <DialogHeader>
          <DialogTitle>ثبت آدرس</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <AddressFormContainer onClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
