import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "تکمیل اطلاعات",
};

export default function CompletionOfInformationLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
