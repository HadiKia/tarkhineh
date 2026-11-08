import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "پرداخت",
};

export default function PaymentLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
