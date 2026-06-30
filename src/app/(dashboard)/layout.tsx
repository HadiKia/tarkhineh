import Sidebar from "@/components/layouts/dashboard/Sidebar";
import type { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <aside>
        <Sidebar />
      </aside>
      <main>{children}</main>
    </div>
  );
}
