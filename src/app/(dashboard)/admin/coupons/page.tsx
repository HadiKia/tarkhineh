"use client";

import CouponsTable from "@/components/features/coupons/CouponsTable";
import CouponsTableSkeleton from "@/components/features/coupons/CouponsTableSkeleton";
import EmptyState from "@/components/common/EmptyState";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { useGetCoupons } from "@/hooks/useCoupons";
import { ADD_COUPON_PATH } from "@/constants/coupons";
import { Add, AddCircle } from "iconsax-reactjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CouponsPage() {
  const { data, isFetching } = useGetCoupons();
  const coupons = data?.coupons ?? [];

  return (
    <div className="relative">
      <DashboardHeader title="کدهای تخفیف" />

      <Button
        type="button"
        variant="default"
        className="absolute inset-e-0 -top-1 lg:hidden"
        asChild
      >
        <Link href={ADD_COUPON_PATH}>
          <Add />
        </Link>
      </Button>
      <Button
        type="button"
        variant="link"
        asChild
        className="hidden lg:flex absolute inset-e-0 top-0 gap-0.5! text-xs!"
      >
        <Link href={ADD_COUPON_PATH}>
          <AddCircle className="size-4" />
          ایجاد کد تخفیف
        </Link>
      </Button>

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
