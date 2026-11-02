import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "آدرس‌ها",
};

export default function AddressesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
