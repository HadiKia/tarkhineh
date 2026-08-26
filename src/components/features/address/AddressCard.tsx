"use client";

import Link from "next/link";
import type { Address } from "@/types/address";
import { formatPhone } from "@/utils/numberFormatter";
import { Edit2, Trash } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";
import { EDIT_ADDRESS_PATH } from "@/constants/address";
import { cn } from "@/lib/utils";

type AddressCardProps = {
  address: Address;
  onEdit?: (address: Address) => void;
  onDelete?: (address: Address) => void;
  isSelected?: boolean;
  onSelect?: (address: Address) => void;
  editMode?: "route" | "modal";
};

const AddressCard = ({
  address,
  onEdit,
  onDelete,
  isSelected = false,
  onSelect,
  editMode = "route",
}: AddressCardProps) => {
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
  const isSelectable = Boolean(onSelect);

  return (
    <li
      className={cn(
        "flex flex-col justify-between gap-2 lg:gap-3 bg-gray-1 border border-gray-4 rounded-sm lg:rounded-lg p-4 duration-300 ease-linear",
        isSelected && "border-primary",
        isSelectable && "cursor-pointer",
      )}
      onClick={() => onSelect?.(address)}
    >
      <div className="flex items-start justify-between gap-2 text-gray-8">
        <p className="w-full text-xs lg:text-sm ">{fullAddress}</p>
        <div className="flex items-center gap-3">
          {editMode === "route" ? (
            <Button
              type="button"
              variant="ghost"
              asChild
              className="p-0 lg:hidden"
              onClick={(event) => event.stopPropagation()}
            >
              <Link href={`${EDIT_ADDRESS_PATH}/${_id}`}>
                <Edit2 className="size-4" />
              </Link>
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              className="p-0 lg:hidden"
              onClick={(event) => {
                event.stopPropagation();
                onEdit?.(address);
              }}
            >
                <Edit2 className="size-4" />
            </Button>
          )}

          <Button
            type="button"
            variant="ghost"
            onClick={(event) => {
              event.stopPropagation();
              onEdit?.(address);
            }}
            className="hidden lg:block p-0"
          >
            <Edit2 className="size-6" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={(event) => {
              event.stopPropagation();
              onDelete?.(address);
            }}
            className="p-0"
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
