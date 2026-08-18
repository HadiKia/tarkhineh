"use client";

import type { ReactNode } from "react";
import { useParams } from "next/navigation";

import EmptyState from "@/components/common/EmptyState";
import TextAreaSkeleton from "@/components/common/TextAreaSkeleton";
import TextFieldSkeleton from "@/components/common/TextFieldSkeleton";
import BranchFormContainer from "@/components/features/branches/BranchFormContainer";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { ADMIN_BRANCHES_PATH } from "@/constants/branches";
import { useGetBranch } from "@/hooks/useBranches";

const EditBranch = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = useGetBranch(id);

  let content: ReactNode;

  if (isFetching) {
    content = (
      <div className="mx-auto flex max-w-179.5 flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:py-8">
        <TextFieldSkeleton />
        <TextFieldSkeleton />
        <TextFieldSkeleton />
        <TextFieldSkeleton />
        <div className="lg:col-span-2">
          <TextAreaSkeleton />
        </div>
      </div>
    );
  } else if (!data?.branch) {
    content = <EmptyState title="شعبه مورد نظر یافت نشد." />;
  } else {
    content = <BranchFormContainer branch={data.branch} />;
  }

  return (
    <>
      <DashboardHeader title="ویرایش شعبه" backHref={ADMIN_BRANCHES_PATH} />
      {content}
    </>
  );
};

export default EditBranch;
