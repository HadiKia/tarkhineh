import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "شعبه‌ها",
};

export default function BranchesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
