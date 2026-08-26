"use client";

import { useState } from "react";

import EmptyState from "@/components/common/EmptyState";
import AddressModal from "@/components/features/address/AddressModal";
import DeleteAddressModal from "@/components/features/address/DeleteAddressModal";
import { useGetAddresses } from "@/hooks/useAddress";
import { AddCircle, Location } from "iconsax-reactjs";
import AddressList from "@/components/features/address/AddressList";
import AddressListSkeleton from "@/components/features/address/AddressListSkeleton";
import { Button } from "@/components/ui/button";
import type { Address } from "@/types";

export default function CourierDeliveryContent() {
  const { data, isFetching } = useGetAddresses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deletingAddress, setDeletingAddress] = useState<Address | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );

  const addresses = data?.addresses ?? [];

  return (
    <>
      <div className="relative rounded-lg border border-gray-4 p-4 lg:px-6 lg:py-4">
        <h3 className="flex items-center gap-1 pb-2 border-b border-gray-4 mb-4 lg:mb-3 text-sm lg:text-base text-gray-8">
          <Location className="size-4 lg:size-6" />
          آدرس‌ها
        </h3>
        {isFetching ? (
          <AddressListSkeleton />
        ) : addresses.length > 0 ? (
          <AddressList
            addresses={addresses}
            onEdit={(address) => setEditingAddress(address)}
            onDelete={(address) => setDeletingAddress(address)}
            selectedAddressId={selectedAddressId}
            onSelect={(address) => setSelectedAddressId(address._id)}
            editMode="modal"
          />
        ) : (
          <EmptyState
            title="شما در حال حاضر هیچ آدرسی ثبت نکرده‌اید!"
            className="border-none"
          />
        )}
        <Button
          type="button"
          variant="link"
          onClick={() => setIsModalOpen(true)}
          className="flex absolute inset-e-4 top-3 gap-0.5! text-xs!"
        >
          <>
            <AddCircle className="size-4" />
            افزودن آدرس
          </>
        </Button>
      </div>

      <AddressModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <AddressModal
        open={editingAddress !== null}
        onClose={() => setEditingAddress(null)}
        address={editingAddress ?? undefined}
      />

      <DeleteAddressModal
        open={deletingAddress !== null}
        onClose={() => setDeletingAddress(null)}
        addressId={deletingAddress?._id ?? ""}
      />
    </>
  );
}
