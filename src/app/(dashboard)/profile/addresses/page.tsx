"use client";

import { useState } from "react";
import Link from "next/link";

import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import EmptyState from "@/components/common/EmptyState";
import AddressModal from "@/components/features/address/AddressModal";
import DeleteAddressModal from "@/components/features/address/DeleteAddressModal";
import { useGetAddresses } from "@/hooks/useAddress";
import { AddCircle } from "iconsax-reactjs";
import AddressList from "@/components/features/address/AddressList";
import AddressListSkeleton from "@/components/features/address/AddressListSkeleton";
import { Button } from "@/components/ui/button";
import type { Address } from "@/types";

const ADD_ADDRESS_HREF = "/profile/addresses/add-address";

const Addresses = () => {
  const { data, isFetching } = useGetAddresses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deletingAddress, setDeletingAddress] = useState<Address | null>(null);

  const addresses = data?.addresses ?? [];

  return (
    <>
      <div className="relative">
        <DashboardHeader title="آدرس‌ها" />

        {isFetching ? (
          <AddressListSkeleton />
        ) : addresses.length > 0 ? (
          <>
            <AddressList
              addresses={addresses}
              onEdit={(address) => setEditingAddress(address)}
              onDelete={(address) => setDeletingAddress(address)}
            />

            <Button
              type="button"
              variant="outline"
              asChild
              className="mt-6 mx-auto w-38 flex lg:hidden"
            >
              <Link href={ADD_ADDRESS_HREF}>افزودن آدرس جدید</Link>
            </Button>

            <Button
              type="button"
              variant="link"
              onClick={() => setIsModalOpen(true)}
              className="hidden lg:flex absolute inset-e-0 top-0 gap-0.5! text-xs!"
            >
              <AddCircle className="size-4" />
              افزودن آدرس جدید
            </Button>
          </>
        ) : (
          <EmptyState
            title="شما در حال حاضر هیچ آدرسی ثبت نکرده‌اید!"
            action={
              <>
                <Button variant="outline" asChild className="w-38 lg:hidden">
                  <Link href={ADD_ADDRESS_HREF}>افزودن آدرس</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(true)}
                  className="hidden lg:block w-72"
                >
                  افزودن آدرس
                </Button>
              </>
            }
          />
        )}
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
};

export default Addresses;
