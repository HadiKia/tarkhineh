"use client";

import type { ReactNode } from "react";
import { useParams } from "next/navigation";

import EmptyState from "@/components/common/EmptyState";
import AdminOrderDetails from "@/components/features/orders/admin/AdminOrderDetails";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { ADMIN_ORDERS_PATH } from "@/constants/orders";
import { useGetAdminPayment } from "@/hooks/usePayment";
import AdminOrderDetailsSkeleton from "@/components/features/orders/admin/AdminOrderDetailsSkeleton";

export default function AdminOrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = useGetAdminPayment(id);

  let content: ReactNode;

  if (isFetching) {
    content = <AdminOrderDetailsSkeleton />;
  } else if (!data?.payment) {
    content = <EmptyState title="سفارش مورد نظر یافت نشد." />;
  } else {
    content = <AdminOrderDetails payment={data.payment} />;
  }

  return (
    <>
      <DashboardHeader title="جزئیات سفارش" backHref={ADMIN_ORDERS_PATH} />
      {content}
    </>
  );
}
