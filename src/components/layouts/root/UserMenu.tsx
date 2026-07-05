"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AuthModal from "@/components/features/auth/AuthModal";
import LogoutModal from "@/components/features/auth/LogoutModal";
import { useGetUser } from "@/hooks/useAuth";
import Link from "next/link";
import { sidebarConfig } from "../dashboard/sidebar.config";
import { ArrowDown2, LogoutCurve, User } from "iconsax-reactjs";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function UserMenu() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { data, isLoading } = useGetUser();
  const user = data?.user;

  const pathname = usePathname();
  const isDashboard =
    pathname.startsWith("/profile") || pathname.startsWith("/admin");

    if (isLoading) {
  return (
    <div className="w-10 h-6.5 lg:w-14.5 lg:h-10 rounded-sm lg:rounded-lg bg-gray-2 animate-pulse" />
  );
}

  if (!user) {
    return (
      <>
        <Button
          variant="secondary"
          aria-label="پروفایل کاربری"
          className="p-1 lg:p-1.75"
          onClick={() => setIsAuthModalOpen(true)}
        >
          <User className="w-4 h-4 lg:w-6 lg:h-6" />
        </Button>

        <AuthModal
          open={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </>
    );
  }

  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isDashboard ? "default" : "secondary"}
          aria-label="پروفایل کاربری"
          className="p-1 lg:p-1.75 gap-0.5! lg:items-end"
        >
          <User className="w-4 h-4 lg:w-6 lg:h-6" />
          <ArrowDown2 className="w-3! h-3! lg:w-4! lg:h-4!" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {sidebarConfig[user.role].map(({ id, children, path, Icon }) => {
          const isActive = pathname === path;
          return (
            <DropdownMenuItem
              key={id}
              asChild
              className={cn(
                isActive ? "text-primary! font-medium" : "text-gray-8",
                "group/item",
              )}
            >
              <Link href={path}>
                <Icon
                  variant={isActive ? "Bold" : "Outline"}
                  className={cn(
                    isActive
                      ? "text-primary group-focus/item:text-primary"
                      : "text-gray-8 group-focus/item:text-accent-foreground",
                  )}
                />
                {children}
              </Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuItem variant="destructive" onClick={() => setIsLogoutModalOpen(true)}>
          <LogoutCurve />
          خروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <LogoutModal
      open={isLogoutModalOpen}
      onClose={() => setIsLogoutModalOpen(false)}
    />
    </>
  );
}
