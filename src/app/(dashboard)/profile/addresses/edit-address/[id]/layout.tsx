import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ویرایش آدرس",
};

export default function EditAddressLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
