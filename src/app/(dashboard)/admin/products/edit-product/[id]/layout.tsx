import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ویرایش محصول",
};

export default function EditProductLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
