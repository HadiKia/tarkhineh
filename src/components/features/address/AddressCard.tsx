"use client";

import Link from "next/link";
import type { Address } from "@/types/address";
import { formatPhone } from "@/utils/numberFormatter";
import { Edit2, Trash } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";

const EDIT_ADDRESS_BASE = "/profile/addresses/edit-address";

type AddressCardProps = {
  address: Address;
  onEdit?: (address: Address) => void;
  onDelete?: (address: Address) => void;
};

const AddressCard = ({ address, onEdit, onDelete }: AddressCardProps) => {
  const {
    _id,
    title,
    address: fullAddress,
    phoneNumber,
    isSelfReceiver,
    receiverName,
    receiverPhoneNumber,
  } = address;

  const phone = isSelfReceiver ? phoneNumber! : receiverPhoneNumber!;

  return (
    <li className="flex flex-col justify-between gap-2 lg:gap-3 bg-gray-1 border border-gray-4 rounded-sm lg:rounded-lg p-4">
      <div className="flex items-start justify-between gap-2 text-gray-8">
        <p className="w-full text-xs lg:text-sm ">{fullAddress}</p>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            asChild
            className="p-0 hover:bg-transparent lg:hidden"
          >
            <Link href={`${EDIT_ADDRESS_BASE}/${_id}`}>
              <Edit2 className="size-4" />
            </Link>
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => onEdit?.(address)}
            className="hidden lg:block p-0 hover:bg-transparent"
          >
            <Edit2 className="size-6" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => onDelete?.(address)}
            className="p-0 hover:bg-transparent"
          >
            <Trash className="size-4 lg:size-6" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between text-gray-7 text-xs lg:text-sm">
        <span>{title}</span>
        <span>{receiverName}</span>
        <span className="text-xs">{formatPhone(phone)}</span>
      </div>
    </li>
  );
};

export default AddressCard;
