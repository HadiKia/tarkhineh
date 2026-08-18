"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Add, AddCircle } from "iconsax-reactjs";

import EmptyState from "@/components/common/EmptyState";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { ADD_BRANCH_PATH } from "@/constants/branches";
import { useGetBranches } from "@/hooks/useBranches";
import BranchesTable from "@/components/features/branches/BranchesTable";
import BranchesTableSkeleton from "@/components/features/branches/BranchesTableSkeleton";

const Branches = () => {
  const { data, isFetching } = useGetBranches();
  const branches = useMemo(() => data?.branches ?? [], [data?.branches]);

  return (
    <div className="relative">
      <DashboardHeader title="شعبه‌ها" />

      <Button
        type="button"
        variant="default"
        className="absolute inset-e-0 -top-1 lg:hidden"
        asChild
      >
        <Link href={ADD_BRANCH_PATH}>
          <Add />
        </Link>
      </Button>
      <Button
        type="button"
        variant="link"
        asChild
        className="absolute inset-e-0 top-0 hidden gap-0.5! text-xs! lg:flex"
      >
        <Link href={ADD_BRANCH_PATH}>
          <AddCircle className="size-4" />
          ایجاد شعبه
        </Link>
      </Button>

      {isFetching ? (
        <BranchesTableSkeleton />
      ) : branches.length > 0 ? (
        <BranchesTable branches={branches} />
      ) : (
        <EmptyState
          title="هنوز هیچ شعبه‌ای ثبت نشده است."
          action={
            <Button variant="outline" asChild className="w-44">
              <Link href={ADD_BRANCH_PATH}>ایجاد شعبه</Link>
            </Button>
          }
        />
      )}
    </div>
  );
};

export default Branches;
