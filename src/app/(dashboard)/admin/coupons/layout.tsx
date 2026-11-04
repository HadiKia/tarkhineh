import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "کدهای تخفیف",
};

export default function CouponsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
