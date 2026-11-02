import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ثبت آدرس",
};

export default function AddAddressLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
