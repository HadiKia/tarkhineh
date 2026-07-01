"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

type DashboardContentProps = {
  children: ReactNode;
};

export default function DashboardContent({ children }: DashboardContentProps) {
  const pathname = usePathname();

  const isDashboardHome = pathname === "/panel";

  return (
    <div className="max-w-306 mx-auto px-5 xl:px-0 py-6 lg:py-12">
      {/* Desktop */}
      <div className="hidden lg:grid grid-cols-12 gap-6">
        <aside className="col-span-3">
          <Sidebar />
        </aside>

        <main className="col-span-9">{children}</main>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        {isDashboardHome ? <Sidebar /> : children}
      </div>
    </div>
  );
}
