import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "دسته‌بندی‌ها",
};

export default function CategoriesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
