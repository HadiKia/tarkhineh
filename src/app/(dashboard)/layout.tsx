import type { ReactNode } from "react";
import DashboardContent from "@/components/layouts/dashboard/DashboardContent";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <DashboardContent>
      {children}
    </DashboardContent>
  );
}