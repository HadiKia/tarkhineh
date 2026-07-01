"use client";

import { cn } from "@/lib/utils";
import { sidebarConfig } from "./sidebar.config";
import Link from "next/link";
import { useGetUser } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { data, isLoading } = useGetUser();

  const user = data?.user;

  const pathname = usePathname();

  if (isLoading || !user) {
    return null;
  }

  return (
    <div className="space-y-4">
      {sidebarConfig[user.role].map(({ id, children, path, Icon }) => {
        const isActive = pathname === path;

        return (
          <Link
            key={id}
            href={path}
            className={cn(
              isActive ? "text-primary! font-medium" : "text-gray-8",
              "flex items-center",
            )}
          >
            <Icon
              variant={isActive ? "Bold" : "Outline"}
              className={cn(isActive ? "text-primary" : "text-gray-8")}
            />

            {children}
          </Link>
        );
      })}
    </div>
  );
}
