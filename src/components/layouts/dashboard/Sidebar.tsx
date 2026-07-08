"use client";

import { cn } from "@/lib/utils";
import { sidebarConfig } from "./sidebar.config";
import Link from "next/link";
import { useGetUser } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogoutCurve } from "iconsax-reactjs";
import Image from "next/image";
import { formatPhone } from "@/utils/numberFormatter";
import SidebarSkeleton from "./SidebarSkeleton";
import { useState } from "react";
import LogoutModal from "@/components/features/auth/LogoutModal";

export default function Sidebar() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { data, isLoading } = useGetUser();

  const user = data?.user;

  const pathname = usePathname();

  if (isLoading) {
    return <SidebarSkeleton />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="lg:px-2 lg:py-4 lg:border lg:border-gray-4 lg:rounded-lg">
      <div className="pb-2 border-b border-gray-6 mb-2 flex items-center gap-x-2 xl:gap-x-6">
        <Image
          src={user.avatarUrl || "/images/dashboard/profile.png"}
          alt="profile"
          width={88}
          height={88}
          className="h-12 w-12 lg:h-22 lg:w-22 rounded-full object-cover border border-gray-4 shrink-0"
        />
        <div className="flex min-w-0 flex-col gap-y-1">
          <span className="text-sm lg:text-base text-gray-8 line-clamp-2 wrap-break-word">
            {user.name || "کاربر ترخینه"}
          </span>
          <span className="text-xs lg:text-sm text-gray-7">
            {formatPhone(user.phoneNumber)}
          </span>
        </div>
      </div>

      {sidebarConfig[user.role].map(({ id, children, path, Icon }) => {
        const isActive = pathname === path;

        return (
          <Link
            key={id}
            href={path}
            className={cn(
              "flex items-center gap-x-1 text-xs lg:text-sm px-1.5 border-2 border-transparent py-2.5 lg:py-1.25 lg:mb-1 ",
              isActive
                ? "text-primary font-medium border-r-primary text-sm lg:text-base"
                : "text-gray-8 lg:py-1.75 ",
            )}
          >
            <Icon
              variant={isActive ? "Bold" : "Outline"}
              className={cn(
                "w-4 h-4 ",
                isActive ? "text-primary lg:w-5 lg:h-5" : "text-gray-8",
              )}
            />

            {children}
          </Link>
        );
      })}

      <Button
        onClick={() => setIsLogoutModalOpen(true)}
        type="button"
        variant="link"
        className="text-error w-full justify-start gap-x-1! px-2 py-2.75 lg:py-2 text-xs lg:text-sm font-normal"
      >
        <LogoutCurve className="lg:w-4! lg:h-4!" />
        خروج
      </Button>

      <LogoutModal
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </div>
  );
}
