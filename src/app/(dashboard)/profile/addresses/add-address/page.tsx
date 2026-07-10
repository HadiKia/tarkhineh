"use client";

import { useRouter } from "next/navigation";

import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import AddressFormContainer from "@/components/features/address/AddressFormContainer";
import { PROFILE_ADDRESSES_PATH } from "@/constants/address";

const AddAddress = () => {
  const router = useRouter();

  return (
    <>
      <DashboardHeader title="ثبت آدرس" backHref={PROFILE_ADDRESSES_PATH} />
      <AddressFormContainer onClose={() => router.push(PROFILE_ADDRESSES_PATH)} />
    </>
  );
};

export default AddAddress;
