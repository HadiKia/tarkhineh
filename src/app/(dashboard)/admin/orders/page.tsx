"use client";

import EmptyState from "@/components/common/EmptyState";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import OrdersTable from "@/components/features/orders/admin/OrdersTable";
import OrdersTableSkeleton from "@/components/features/orders/admin/OrdersTableSkeleton";
import { useGetAdminPayments } from "@/hooks/usePayment";

export default function AdminOrdersPage() {
  const { data, isFetching } = useGetAdminPayments();
  const payments = data?.payments ?? [];

  return (
    <div className="relative">
      <DashboardHeader title="سفارشات" />

      {isFetching ? (
        <OrdersTableSkeleton />
      ) : payments.length > 0 ? (
        <OrdersTable payments={payments} />
      ) : (
        <EmptyState title="هنوز هیچ سفارشی ثبت نشده است." />
      )}
    </div>
  );
}
