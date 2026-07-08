"use client";

import { useRouter } from "next/navigation";

import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import AddressFormContainer from "@/components/features/address/AddressFormContainer";

const AddAddress = () => {
  const router = useRouter();

  return (
    <>
      <DashboardHeader title="ثبت آدرس" backHref="/profile/addresses" />
      <AddressFormContainer onClose={() => router.push("/profile/addresses")} />
    </>
  );
};

export default AddAddress;
