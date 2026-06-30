"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavLinks from "./NavLinks";
import { HamburgerMenu } from "iconsax-reactjs";
import Image from "next/image";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button aria-label="باز کردن منو" className="p-2 text-primary! cursor-pointer">
          <HamburgerMenu size={24} className="-my-2" />
        </button>
      </SheetTrigger>

      <SheetContent side="right">
        <SheetHeader
          className="bg-[url('/images/menu/frame.png')] bg-cover bg-center bg-no-repeat text-white h-23.5 relative"
        >
          <SheetTitle className="absolute top-8">
            <Image src="/images/logo/logo-2.svg" width={67} height={30} alt="logo" />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto p-4">
          <NavLinks
            showIcons
            onLinkClick={() => setOpen(false)}
            className="flex flex-col gap-y-2.5 divide-y divide-gray-4"
            itemClassName="w-full"
          />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
