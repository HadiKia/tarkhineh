"use client";

import CouponsTable from "@/components/features/coupons/CouponsTable";
import CouponsTableSkeleton from "@/components/features/coupons/CouponsTableSkeleton";
import EmptyState from "@/components/common/EmptyState";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { useGetCoupons } from "@/hooks/useCoupons";

export default function CouponsPage() {
  const { data, isFetching } = useGetCoupons();
  const coupons = data?.coupons ?? [];

  return (
    <div className="relative">
      <DashboardHeader title="کدهای تخفیف" />

      {isFetching ? (
        <CouponsTableSkeleton />
      ) : coupons.length > 0 ? (
        <CouponsTable coupons={coupons} />
      ) : (
        <EmptyState title="هنوز هیچ کد تخفیفی ثبت نشده است." />
      )}
    </div>
  );
}
