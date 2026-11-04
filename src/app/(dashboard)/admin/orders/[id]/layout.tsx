import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "جزئیات سفارش",
};

export default function AdminOrderDetailsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
