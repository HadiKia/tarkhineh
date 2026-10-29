"use client";

import { useBranchContext } from "@/contexts/BranchContext";

type FooterBranchesProps = {
  itemClassName: string;
};

export default function FooterBranches({
  itemClassName,
}: FooterBranchesProps) {
  const { branches, isLoading } = useBranchContext();

  if (isLoading) {
    return <li className={itemClassName}>در حال بارگذاری شعبه‌ها...</li>;
  }

  if (branches.length === 0) {
    return <li className={itemClassName}>شعبه‌ای ثبت نشده است.</li>;
  }

  return branches.map((branch) => (
    <li key={branch._id} className={itemClassName}>
      {branch.title}
    </li>
  ));
}
