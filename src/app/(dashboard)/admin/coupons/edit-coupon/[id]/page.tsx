"use client";

import type { ReactNode } from "react";
import { useParams } from "next/navigation";

import EmptyState from "@/components/common/EmptyState";
import CouponFormContainer from "@/components/features/coupons/CouponFormContainer";
import CouponFormSkeleton from "@/components/features/coupons/CouponFormSkeleton";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { ADMIN_COUPONS_PATH } from "@/constants/coupons";
import { useGetCoupon } from "@/hooks/useCoupons";

export default function EditCouponPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = useGetCoupon(id);

  let content: ReactNode;

  if (isFetching) {
    content = <CouponFormSkeleton />;
  } else if (!data?.coupon) {
    content = <EmptyState title="کد تخفیف مورد نظر یافت نشد." />;
  } else {
    content = <CouponFormContainer coupon={data.coupon} />;
  }

  return (
    <>
      <DashboardHeader title="ویرایش کد تخفیف" backHref={ADMIN_COUPONS_PATH} />
      {content}
    </>
  );
}
