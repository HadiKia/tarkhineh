"use client";

import { useRouter, useParams } from "next/navigation";

import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import AddressFormContainer from "@/components/features/address/AddressFormContainer";
import TextFieldSkeleton from "@/components/common/TextFieldSkeleton";
import TextAreaSkeleton from "@/components/common/TextAreaSkeleton";
import EmptyState from "@/components/common/EmptyState";
import { useGetAddresses } from "@/hooks/useAddress";

const EditAddress = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = useGetAddresses();

  const address = data?.addresses.find((a) => a._id === id);

  let content: React.ReactNode;

  if (isFetching) {
    content = (
      <div className="flex flex-col gap-3 md:gap-4">
        <TextFieldSkeleton />
        <TextFieldSkeleton />
        <TextFieldSkeleton />
        <TextAreaSkeleton />
      </div>
    );
  } else if (!address) {
    content = <EmptyState title="آدرس مورد نظر یافت نشد." />;
  } else {
    content = (
      <AddressFormContainer
        address={address}
        onClose={() => router.push("/profile/addresses")}
      />
    );
  }

  return (
    <>
      <DashboardHeader title="ویرایش آدرس" backHref="/profile/addresses" />
      {content}
    </>
  );
};

export default EditAddress;
