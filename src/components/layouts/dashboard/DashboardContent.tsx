"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

type DashboardContentProps = {
  children: ReactNode;
};

export default function DashboardContent({ children }: DashboardContentProps) {
  const pathname = usePathname();
  const isDashboardHome = pathname === "/panel";

  return (
    <div className="max-w-306 mx-auto px-5 xl:px-0 py-6 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside
          className={cn("lg:col-span-3", !isDashboardHome && "max-lg:hidden")}
        >
          <Sidebar />
        </aside>

        <section
          className={cn(
            "lg:col-span-9 lg:p-6 lg:border lg:border-gray-4 lg:rounded-lg",
            isDashboardHome && "max-lg:hidden",
          )}
        >
          {children}
        </section>
      </div>
    </div>
  );
}
