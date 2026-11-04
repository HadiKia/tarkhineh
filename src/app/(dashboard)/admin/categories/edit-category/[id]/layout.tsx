import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ویرایش دسته‌بندی",
};

export default function EditCategoryLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
