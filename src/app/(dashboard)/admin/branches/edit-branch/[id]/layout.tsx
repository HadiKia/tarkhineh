import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ویرایش شعبه",
};

export default function EditBranchLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
