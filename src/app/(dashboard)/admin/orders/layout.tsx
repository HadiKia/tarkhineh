import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "سفارشات",
};

export default function OrdersLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
