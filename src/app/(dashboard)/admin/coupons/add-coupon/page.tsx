import type { Metadata } from "next";
import CouponFormContainer from "@/components/features/coupons/CouponFormContainer";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { ADMIN_COUPONS_PATH } from "@/constants/coupons";

export const metadata: Metadata = {
  title: "ایجاد کد تخفیف",
};

export default function AddCouponPage() {
  return (
    <>
      <DashboardHeader title="ایجاد کد تخفیف" backHref={ADMIN_COUPONS_PATH} />
      <CouponFormContainer />
    </>
  );
}
