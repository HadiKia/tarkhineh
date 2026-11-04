import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ویرایش کد تخفیف",
};

export default function EditCouponLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
