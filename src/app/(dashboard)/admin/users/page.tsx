"use client";

import { useEffect } from "react";

import EmptyState from "@/components/common/EmptyState";
import UsersTable from "@/components/features/users/admin/UsersTable";
import UsersTableSkeleton from "@/components/features/users/admin/UsersTableSkeleton";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { useGetUsers } from "@/hooks/useUsers";

export default function AdminUsersPage() {
  const { data, isFetching } = useGetUsers();
  const users = data?.users ?? [];

  return (
    <div className="relative">
      <DashboardHeader title="کاربران" />

      {isFetching ? (
        <UsersTableSkeleton />
      ) : users.length > 0 ? (
        <UsersTable users={users} />
      ) : (
        <EmptyState title="هنوز هیچ کاربری ثبت نشده است." />
      )}
    </div>
  );
}
