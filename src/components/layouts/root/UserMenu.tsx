"use client";

import { useState } from "react";
import { User } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AuthModal from "@/components/features/auth/AuthModal";
import { useGetUser } from "@/hooks/useAuth";
import Link from "next/link";

export default function UserMenu() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { data: user } = useGetUser();

  if (!user) {
    return (
      <>
        <Button
          variant="secondary"
          aria-label="پروفایل کاربری"
          className="p-1 lg:p-2"
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          aria-label="پروفایل کاربری"
          className="p-1 lg:p-2"
        >
          <User className="w-4 h-4 lg:w-6 lg:h-6" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/profile">پروفایل</Link>
        </DropdownMenuItem>

        {user.role === "ADMIN" && (
          <DropdownMenuItem asChild>
            <Link href="/admin">پنل مدیریت</Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-destructive">خروج</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
